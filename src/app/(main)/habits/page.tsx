import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { HabitList } from "@/components/habits/habit-list";
import { AddHabitDialog } from "@/components/habits/add-habit-dialog";
import { KeyHabits } from "@/components/habits/key-habits";

export default function HabitsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl font-headline">
            Gestión de Hábitos
          </h2>
          <p className="mt-2 text-muted-foreground">
            Construye y personaliza tus rutinas para una vida más consciente.
          </p>
        </div>
        <AddHabitDialog />
      </div>

      <KeyHabits />

      <Card>
        <CardHeader>
          <CardTitle>Mis Hábitos</CardTitle>
          <CardDescription>Marca los hábitos completados y gestiona tu lista personal.</CardDescription>
        </CardHeader>
        <CardContent>
          <HabitList />
        </CardContent>
      </Card>
    </div>
  );
}
