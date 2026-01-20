'use client';

import { useEffect, useState } from 'react';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

export function HabitReminder() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();
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
          title: 'Activar Recordatorios',
          description: '¿Quieres recibir notificaciones para tus hábitos diarios?',
          duration: Infinity, // Keep toast open until user interacts
          action: (
            <Button variant="secondary" size="sm" onClick={handleRequestPermission}>
                Activar
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
                title: '¡Notificaciones Activadas!',
                description: 'Recibirás recordatorios nativos de tus hábitos pendientes.',
              });
            } else {
               toast({
                variant: 'destructive',
                title: 'Notificaciones Bloqueadas',
                description: 'Puedes activarlas más tarde desde la configuración de tu navegador.',
              });
            }
          });
        }
      }
    }
  }, []); // The empty dependency array ensures this runs only once on mount

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
      let pendingHabitCount = 0;
      for (const habit of activeHabits) {
        const habitLogsRef = collection(firestore, 'users', user!.uid, 'habits', habit.id, 'habitLogs');
        const q = query(habitLogsRef, where('date', '==', todayStr), where('completed', '==', true));
        const logSnapshot = await getDocs(q);
        if (logSnapshot.empty) {
          pendingHabitCount++;
        }
      }

      if (pendingHabitCount > 0) {
        const description = pendingHabitCount === 1 
            ? "Tienes 1 hábito pendiente para hoy." 
            : `Tienes ${pendingHabitCount} hábitos pendientes para hoy.`;

        // If permission is granted, use a native browser notification
        if (notificationPermission === 'granted') {
            const notification = new Notification('Recordatorio de Hábitos', {
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
              title: 'Recordatorio de Hábitos',
              description: description,
              duration: 10000, 
              action: (
                <Button variant="secondary" size="sm" onClick={() => router.push('/habits')}>
                    Ver Hábitos
                </Button>
              ),
            });
        }
      }
    };

    // We add a small delay to avoid showing the reminder immediately on page load
    const timeoutId = setTimeout(checkPendingHabits, 2000);
    
    return () => clearTimeout(timeoutId);

  }, [activeHabits, firestore, user, todayStr, toast, router, isLoading, notificationPermission]); // Re-run if permission changes

  return null; // This component does not render anything visible
}
