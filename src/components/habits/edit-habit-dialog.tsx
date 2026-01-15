
"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import { useState, useEffect } from "react";
import { useFirestore, useUser } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

export function EditHabitDialog({ habit }: { habit: { id: string, name: string, description: string } }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(habit.name);
  const [description, setDescription] = useState(habit.description);
  const [loading, setLoading] = useState(false);

  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      setTitle(habit.name);
      setDescription(habit.description);
    }
  }, [open, habit]);

  const handleEditHabit = async () => {
    if (!user || !title) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "El título del hábito es obligatorio.",
      });
      return;
    }

    setLoading(true);
    try {
      const habitRef = doc(firestore, 'users', user.uid, 'habits', habit.id);
      await updateDoc(habitRef, {
        name: title,
        description: description,
      });

      toast({
        title: "Hábito actualizado",
        description: `"${title}" se ha actualizado.`,
      });
      
      setOpen(false);
    } catch (error) {
      console.error("Error updating habit:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo actualizar el hábito. Inténtalo de nuevo.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Editar hábito">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar hábito</DialogTitle>
          <DialogDescription>
            Modifica los detalles de tu hábito.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Título
            </Label>
            <Input 
              id="title" 
              placeholder="Ej: Meditar 10 minutos" 
              className="col-span-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Descripción
            </Label>
            <Input 
              id="description" 
              placeholder="Ej: Usar la app de Headspace" 
              className="col-span-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleEditHabit} disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
