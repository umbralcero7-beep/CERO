'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useCollection, useUser, useMemoFirebase } from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useFirestore } from "@/firebase/provider";
import { Flame, BookMarked, BrainCircuit, Smile, Award } from "lucide-react";
import { useMemo, useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { useTranslation } from "../providers/language-provider";

const iconMap: { [key: string]: React.ElementType } = {
  Flame,
  BookMarked,
  BrainCircuit,
  Smile,
  Award,
};

export function Achievements() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { t } = useTranslation();
  const [habitLogCount, setHabitLogCount] = useState(0);
  const [habitLogsLoading, setHabitLogsLoading] = useState(true);

  const allAchievements = useMemo(() => [
    { id: 'mood_1', title: t('achievements.mood_1.title'), description: t('achievements.mood_1.description'), icon: 'Smile', type: 'moods', requirement: 1 },
    { id: 'mood_10', title: t('achievements.mood_10.title'), description: t('achievements.mood_10.description'), icon: 'Smile', requirement: 10, type: 'moods' },
    { id: 'habit_1', title: t('achievements.habit_1.title'), description: t('achievements.habit_1.description'), icon: 'Flame', type: 'habits_created', requirement: 1 },
    { id: 'habit_log_1', title: t('achievements.habit_log_1.title'), description: t('achievements.habit_log_1.description'), icon: 'Award', type: 'habit_logs', requirement: 1 },
    { id: 'habit_log_10', title: t('achievements.habit_log_10.title'), description: t('achievements.habit_log_10.description'), icon: 'Award', type: 'habit_logs', requirement: 10 },
  ], [t]);

  const moodLogsQuery = useMemoFirebase(() => user ? query(collection(firestore, 'users', user.uid, 'moodLogs')) : null, [firestore, user]);
  const habitsQuery = useMemoFirebase(() => user ? query(collection(firestore, 'users', user.uid, 'habits')) : null, [firestore, user]);
  
  const { data: moodLogs, isLoading: moodLogsLoading } = useCollection(moodLogsQuery);
  const { data: habits, isLoading: habitsLoading } = useCollection(habitsQuery);

  useEffect(() => {
    if (!user || habitsLoading) return;
    
    const fetchHabitLogs = async () => {
      setHabitLogsLoading(true);
      let totalLogs = 0;
      if (habits) {
        for (const habit of habits) {
          const habitLogsRef = collection(firestore, 'users', user.uid, 'habits', habit.id, 'habitLogs');
          const q = query(habitLogsRef, where('completed', '==', true));
          const logSnapshot = await getDocs(q);
          totalLogs += logSnapshot.size;
        }
      }
      setHabitLogCount(totalLogs);
      setHabitLogsLoading(false);
    };

    fetchHabitLogs();
  }, [user, firestore, habits, habitsLoading]);


  const unlockedAchievements = useMemo(() => {
    const unlocked: typeof allAchievements = [];
    const moodCount = moodLogs?.length ?? 0;
    const habitCount = habits?.length ?? 0;
    
    allAchievements.forEach(ach => {
        if (ach.type === 'moods' && moodCount >= ach.requirement) {
            unlocked.push(ach);
        } else if (ach.type === 'habits_created' && habitCount >= ach.requirement) {
            unlocked.push(ach);
        } else if (ach.type === 'habit_logs' && habitLogCount >= ach.requirement) {
            unlocked.push(ach);
        }
    });

    return unlocked;

  }, [moodLogs, habits, habitLogCount, allAchievements]);

  const isLoading = moodLogsLoading || habitsLoading || habitLogsLoading;


  if (isLoading) {
      return (
         <Card className="md:col-span-2">
            <CardHeader>
                <CardTitle>{t('achievements.title')}</CardTitle>
                <CardDescription>{t('achievements.description')}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
            </CardContent>
        </Card>
    )
  }

  if (unlockedAchievements.length === 0) {
    return (
         <Card className="md:col-span-2">
            <CardHeader>
                <CardTitle>{t('achievements.title')}</CardTitle>
                <CardDescription>{t('achievements.description')}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center h-24 text-muted-foreground">
                    <p>{t('achievements.empty')}</p>
                </div>
            </CardContent>
        </Card>
    )
  }


  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>{t('achievements.title')}</CardTitle>
        <CardDescription>{t('achievements.description')}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {unlockedAchievements.map((ach) => {
          const Icon = iconMap[ach.icon];
          return (
            <div key={ach.id} className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
              <div className="p-3 rounded-full bg-secondary">
                {Icon && <Icon className="w-6 h-6 text-secondary-foreground" />}
              </div>
              <div>
                <h4 className="font-semibold">{ach.title}</h4>
                <p className="text-sm text-muted-foreground">{ach.description}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
