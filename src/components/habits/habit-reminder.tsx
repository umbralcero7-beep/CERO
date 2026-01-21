'use client';

import { useEffect, useState } from 'react';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { format, subDays, parseISO, isSameDay } from 'date-fns';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { useTranslation } from '../providers/language-provider';

export function HabitReminder() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();
  const { t } = useTranslation();
  const todayStr = format(new Date(), 'yyyy-MM-dd');
  // State to hold the permission status
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');

  // Effect to check and request notification permission on mount
  useEffect(() => {
    // Check if Notifications are supported
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
      
      // If permission is not yet granted or denied, ask the user
      if (Notification.permission === 'default') {
        
        // We use a toast to ask for permission non-intrusively
        const { dismiss } = toast({
          title: t('habitReminder.permission.title'),
          description: t('habitReminder.permission.description'),
          duration: Infinity, // Keep toast open until user interacts
          action: (
            <Button variant="secondary" size="sm" onClick={handleRequestPermission}>
                {t('habitReminder.permission.activate')}
            </Button>
          ),
        });

        // Function to handle the permission request flow
        function handleRequestPermission() {
          Notification.requestPermission().then(permission => {
            setNotificationPermission(permission);
            dismiss(); // Close the permission request toast
            if (permission === 'granted') {
              toast({
                title: t('habitReminder.permission.granted.title'),
                description: t('habitReminder.permission.granted.description'),
              });
            } else {
               toast({
                variant: 'destructive',
                title: t('habitReminder.permission.denied.title'),
                description: t('habitReminder.permission.denied.description'),
              });
            }
          });
        }
      }
    }
  }, [t, toast]); // The empty dependency array ensures this runs only once on mount

  const habitsQuery = useMemoFirebase(
    () => user ? query(collection(firestore, 'users', user.uid, 'habits'), where('active', '==', true)) : null,
    [firestore, user]
  );
  
  const { data: activeHabits, isLoading } = useCollection(habitsQuery);

  // This effect checks for pending habits and decides how to notify the user
  useEffect(() => {
    if (isLoading || !activeHabits || activeHabits.length === 0) {
      return;
    }

    const checkPendingHabits = async () => {
      let pendingHabits: any[] = [];
      let longestStreak = 0;

      for (const habit of activeHabits) {
        const habitLogsRef = collection(firestore, 'users', user!.uid, 'habits', habit.id, 'habitLogs');
        const todayLogQuery = query(habitLogsRef, where('date', '==', todayStr), where('completed', '==', true));
        const todayLogSnapshot = await getDocs(todayLogQuery);

        if (todayLogSnapshot.empty) {
          // Habit is pending for today
          pendingHabits.push(habit);
          
          // Calculate streak for this pending habit
          const streakQuery = query(habitLogsRef, where('completed', '==', true));
          const streakLogSnapshot = await getDocs(streakQuery);
          
          let currentStreak = 0;
          if (!streakLogSnapshot.empty) {
              const completedDates = [...new Set(streakLogSnapshot.docs.map(doc => doc.data().date as string))].sort().reverse();
              
              let dateToCheck = subDays(new Date(), 1); // Start checking from yesterday for a pending habit

              for (const dateStr of completedDates) {
                  if (dateStr === format(dateToCheck, 'yyyy-MM-dd')) {
                      currentStreak++;
                      dateToCheck = subDays(dateToCheck, 1);
                  } else {
                      break; // Gap found
                  }
              }
          }
          
          if (currentStreak > longestStreak) {
            longestStreak = currentStreak;
          }
        }
      }

      const pendingHabitCount = pendingHabits.length;

      if (pendingHabitCount > 0) {
        let title = t('habitReminder.toast.title');
        let description = pendingHabitCount === 1 
            ? t('habitReminder.toast.description.one')
            : t('habitReminder.toast.description.many', { count: pendingHabitCount });

        // "Intelligent" message based on streak
        if (longestStreak === 6) {
            title = t('habitReminder.toast.almostStreak');
            description = t('habitReminder.toast.almostStreak.description');
        } else if (longestStreak >= 2) {
            title = t('habitReminder.toast.keepStreak');
            description = t('habitReminder.toast.keepStreak.description', { streak: longestStreak });
        }

        // If permission is granted, use a native browser notification
        if (notificationPermission === 'granted') {
            const notification = new Notification(title, {
                body: description,
                icon: '/icon-192x192.png', // Uses the PWA icon
                tag: 'habit-reminder', // Tag to prevent multiple notifications from stacking
            });
            // When notification is clicked, go to habits page and focus the window
            notification.onclick = () => {
                router.push('/habits');
                window.focus();
            };
        } else {
            // Fallback to the original toast notification if permission is not granted
            toast({
              title: title,
              description: description,
              duration: 10000, 
              action: (
                <Button variant="secondary" size="sm" onClick={() => router.push('/habits')}>
                    {t('habitReminder.toast.action')}
                </Button>
              ),
            });
        }
      }
    };

    // We add a small delay to avoid showing the reminder immediately on page load
    const timeoutId = setTimeout(checkPendingHabits, 5000);
    
    return () => clearTimeout(timeoutId);

  }, [activeHabits, firestore, user, todayStr, toast, router, isLoading, notificationPermission, t]); // Re-run if permission changes

  return null; // This component does not render anything visible
}
