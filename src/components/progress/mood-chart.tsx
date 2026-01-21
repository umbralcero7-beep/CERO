'use client';
import { Line, LineChart, CartesianGrid, XAxis, Tooltip } from 'recharts';
import {
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useCollection, useUser, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import { Skeleton } from '../ui/skeleton';
import { useMemo } from 'react';
import { useTranslation } from '../providers/language-provider';

const chartConfig = {
  value: {
    label: 'Nivel de Ánimo',
    color: 'hsl(var(--primary))',
  },
};

const moodToValue: { [key: string]: number } = {
  Feliz: 5,
  Calmado: 4,
  Pensativo: 3,
  Cansado: 2,
  Estresado: 1,
  Triste: 1,
  Happy: 5,
  Calm: 4,
  Thoughtful: 3,
  Tired: 2,
  Stressed: 1,
  Sad: 1,
};

export function MoodChart() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { t } = useTranslation();

  const moodLogsQuery = useMemoFirebase(
    () =>
      user
        ? query(
            collection(firestore, 'users', user.uid, 'moodLogs'),
            orderBy('timestamp', 'asc')
          )
        : null,
    [firestore, user]
  );

  const { data: moodLogs, isLoading } = useCollection(moodLogsQuery);

  const moodHistory = useMemo(() => {
    if (!moodLogs) return [];
    return moodLogs.map((log: any) => ({
      date: new Date(log.timestamp.seconds * 1000).toISOString().split('T')[0],
      mood: log.mood,
      value: moodToValue[log.mood] || 0,
    }));
  }, [moodLogs]);

  if (isLoading) {
    return <Skeleton className="h-[300px] w-full" />;
  }

  if (!moodHistory || moodHistory.length === 0) {
    return (
        <div className="flex h-[300px] w-full items-center justify-center text-center text-muted-foreground" dangerouslySetInnerHTML={{ __html: t('moodChart.empty') }}>
        </div>
    );
  }

  return (
    <div className="w-full h-[300px]">
      <ChartContainer config={chartConfig} className="w-full h-full">
        <LineChart
          data={moodHistory}
          margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) =>
              new Date(value).toLocaleDateString('es-ES', {
                month: 'short',
                day: 'numeric',
              })
            }
          />
          <Tooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Line
            dataKey="value"
            type="monotone"
            stroke="var(--color-value)"
            strokeWidth={3}
            dot={{
              r: 5,
              fill: 'var(--color-value)',
              stroke: 'hsl(var(--background))',
              strokeWidth: 2,
            }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
