'use client';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MoodChart } from "@/components/progress/mood-chart";
import { HabitChart } from "@/components/progress/habit-chart";
import { Achievements } from "@/components/progress/achievements";
import { HabitCalendar } from "@/components/progress/habit-calendar";
import { useTranslation } from "@/components/providers/language-provider";

export default function ProgressPage() {
  const { t } = useTranslation();
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl font-headline">
          {t('progress.title')}
        </h2>
        <p className="mt-2 text-muted-foreground">
          {t('progress.description')}
        </p>
      </div>
      
      <Achievements />

      <Card>
        <CardHeader>
          <CardTitle>{t('progress.streak.title')}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 flex justify-center">
          <HabitCalendar />
        </CardContent>
      </Card>
      

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('progress.moodMap.title')}</CardTitle>
          </CardHeader>
          <CardContent className="pl-0">
            <MoodChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t('progress.habitPerformance.title')}</CardTitle>
          </CardHeader>
          <CardContent className="pl-0">
            <HabitChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
