'use client';
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip } from 'recharts';
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { useCollection, useUser, useMemoFirebase } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import { Skeleton } from '../ui/skeleton';
import { useMemo } from 'react';
import { useTranslation } from '../providers/language-provider';

const chartConfig = {
  'Meditación': { label: 'Meditación', color: 'hsl(var(--chart-1))' },
  'Lectura': { label: 'Lectura', color: 'hsl(var(--chart-2))' },
  'Escribir Diario': { label: 'Escribir', color: 'hsl(var(--chart-4))' },
  'Caminata': { label: 'Caminata', color: 'hsl(var(--chart-5))' },
  'Agua': { label: 'Agua', color: 'hsl(var(--chart-3))' },
};

export function HabitChart() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { t } = useTranslation();

  const habitsQuery = useMemoFirebase(
    () =>
      user ? query(collection(firestore, 'users', user.uid, 'habits')) : null,
    [firestore, user]
  );
  
  const { data: habits, isLoading: habitsLoading } = useCollection(habitsQuery);
  
  // A simplified placeholder for habit progress. In a real app, you'd fetch and aggregate HabitLog data.
  const habitProgress = useMemo(() => {
    if (!habits) return [];
    
    // This is mock data generation based on active habits.
    // A real implementation would require fetching HabitLogs and processing them.
    const activeHabitNames = habits.filter(h => h.active).map(h => h.name);
    
    const progressData = [
        { name: 'Semana 1' },
        { name: 'Semana 2' },
        { name: 'Semana 3' },
        { name: 'Semana 4' },
    ];

    return progressData.map(week => {
        const weekData: {name: string, [key:string]: any} = { ...week };
        activeHabitNames.forEach(habitName => {
            // Find a key in chartConfig that is a substring of habitName
            const key = Object.keys(chartConfig).find(k => habitName.toLowerCase().includes(k.toLowerCase()));
            if (key) {
                weekData[key] = Math.floor(Math.random() * 40) + 60; // Random percentage between 60-100
            }
        });
        return weekData;
    })
  }, [habits]);


  const activeChartKeys = useMemo(() => {
    if (!habitProgress || habitProgress.length === 0) return [];
    return Object.keys(habitProgress[0]).filter(key => key !== 'name');
  }, [habitProgress]);


  if (habitsLoading) {
    return <Skeleton className="h-[300px] w-full" />;
  }

  if (!habits || habits.length === 0 || activeChartKeys.length === 0) {
    return (
        <div className="flex h-[300px] w-full items-center justify-center text-center text-muted-foreground" dangerouslySetInnerHTML={{ __html: t('habitChart.empty') }}>
        </div>
    );
  }

  return (
    <div className="w-full h-[300px]">
      <ChartContainer config={chartConfig as any} className="w-full h-full">
        <BarChart data={habitProgress} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="name"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <Tooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <ChartLegend content={<ChartLegendContent />} />
          {activeChartKeys.map((key) => (
             <Bar key={key} dataKey={key} fill={`var(--color-${key})`} radius={4} />
          ))}
        </BarChart>
      </ChartContainer>
    </div>
  );
}
