'use client';
import { useState, useEffect } from 'react';
import { useCollection, useUser, useMemoFirebase, useFirestore } from '@/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Calendar } from '@/components/ui/calendar';
import { Skeleton } from '../ui/skeleton';
import { es, enUS } from 'date-fns/locale';
import { useTranslation } from '../providers/language-provider';

export function HabitCalendar() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { locale } = useTranslation();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [completedDays, setCompletedDays] = useState<Date[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const habitsQuery = useMemoFirebase(
    () => (user ? query(collection(firestore, 'users', user.uid, 'habits')) : null),
    [firestore, user]
  );
  const { data: habits, isLoading: habitsLoading } = useCollection(habitsQuery);

  useEffect(() => {
    if (!user || habitsLoading) {
        if (!habitsLoading) setIsLoading(false);
        return;
    };
    
    setIsLoading(true);
    const fetchCompletedLogs = async () => {
      const uniqueDates = new Set<string>();
      if (habits) {
        for (const habit of habits) {
          const habitLogsRef = collection(firestore, 'users', user.uid, 'habits', habit.id, 'habitLogs');
          const q = query(habitLogsRef, where('completed', '==', true));
          try {
            const logSnapshot = await getDocs(q);
            logSnapshot.forEach(doc => {
              uniqueDates.add(doc.data().date);
            });
          } catch (e) {
             console.error(`Error fetching logs for habit ${habit.id}:`, e);
          }
        }
      }
      
      const dates = Array.from(uniqueDates).map(dateStr => new Date(`${dateStr}T00:00:00`));
      setCompletedDays(dates);
      setIsLoading(false);
    };

    fetchCompletedLogs();
  }, [user, firestore, habits, habitsLoading]);
  
  if (isLoading) {
    return <Skeleton className="h-[280px] w-full" />;
  }

  return (
    <div className="flex justify-center">
        <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border p-0"
            locale={locale === 'es' ? es : enUS}
            modifiers={{
                completed: completedDays,
            }}
            modifiersStyles={{
                completed: {
                    backgroundColor: 'hsl(var(--primary))',
                    color: 'hsl(var(--primary-foreground))',
                    opacity: 0.8,
                },
            }}
        />
    </div>
  );
}
