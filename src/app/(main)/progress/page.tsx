import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MoodChart } from "@/components/progress/mood-chart";
import { HabitChart } from "@/components/progress/habit-chart";
import { Achievements } from "@/components/progress/achievements";
import { HabitCalendar } from "@/components/progress/habit-calendar";

export default function ProgressPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl font-headline">
          Estadísticas y Progreso
        </h2>
        <p className="mt-2 text-muted-foreground">
          Visualiza tu evolución y celebra tus logros en el camino.
        </p>
      </div>
      
      <Achievements />

      <Card>
        <CardHeader>
          <CardTitle>Racha de Hábitos</CardTitle>
        </CardHeader>
        <CardContent className="p-4 flex justify-center">
          <HabitCalendar />
        </CardContent>
      </Card>
      

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Mapa Emocional</CardTitle>
          </CardHeader>
          <CardContent className="pl-0">
            <MoodChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Rendimiento de Hábitos</CardTitle>
          </CardHeader>
          <CardContent className="pl-0">
            <HabitChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
