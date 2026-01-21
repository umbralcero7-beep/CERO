'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { HabitList } from "@/components/habits/habit-list";
import { AddHabitDialog } from "@/components/habits/add-habit-dialog";
import { KeyHabits } from "@/components/habits/key-habits";
import { useTranslation } from "@/components/providers/language-provider";

export default function HabitsPage() {
  const { t } = useTranslation();
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl font-headline">
            {t('habits.title')}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {t('habits.description')}
          </p>
        </div>
        <AddHabitDialog />
      </div>

      <KeyHabits />

      <Card>
        <CardHeader>
          <CardTitle>{t('habits.myHabits.title')}</CardTitle>
          <CardDescription>{t('habits.myHabits.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <HabitList />
        </CardContent>
      </Card>
    </div>
  );
}
