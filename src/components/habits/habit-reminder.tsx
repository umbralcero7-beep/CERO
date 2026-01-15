'use client';

import { useEffect } from 'react';
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

  const habitsQuery = useMemoFirebase(
    () => user ? query(collection(firestore, 'users', user.uid, 'habits'), where('active', '==', true)) : null,
    [firestore, user]
  );
  
  const { data: activeHabits, isLoading } = useCollection(habitsQuery);

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

        toast({
          title: 'Recordatorio de Hábitos',
          description: description,
          duration: 10000, // Show for 10 seconds
          action: (
            <Button variant="secondary" size="sm" onClick={() => router.push('/habits')}>
                Ver Hábitos
            </Button>
          ),
        });
      }
    };

    // We add a small delay to avoid showing the toast immediately on page load
    const timeoutId = setTimeout(checkPendingHabits, 2000);
    
    return () => clearTimeout(timeoutId);

  }, [activeHabits, firestore, user, todayStr, toast, router, isLoading]);

  return null; // This component does not render anything
}
