
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
import { useTranslation } from "../providers/language-provider";

export function EditHabitDialog({ habit }: { habit: { id: string, name: string, description: string } }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(habit.name);
  const [description, setDescription] = useState(habit.description);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

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
        description: t('addHabitDialog.toast.error.title'),
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
        title: t('editHabitDialog.toast.updated.title'),
        description: t('editHabitDialog.toast.updated.description', { title }),
      });
      
      setOpen(false);
    } catch (error) {
      console.error("Error updating habit:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: t('editHabitDialog.toast.error.update'),
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
          <DialogTitle>{t('editHabitDialog.title')}</DialogTitle>
          <DialogDescription>
            {t('editHabitDialog.description')}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              {t('addHabitDialog.label.title')}
            </Label>
            <Input 
              id="title" 
              placeholder={t('addHabitDialog.placeholder.title')}
              className="col-span-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              {t('addHabitDialog.label.description')}
            </Label>
            <Input 
              id="description" 
              placeholder={t('addHabitDialog.placeholder.description')}
              className="col-span-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleEditHabit} disabled={loading}>
            {loading ? t('addHabitDialog.saving') : t('editHabitDialog.save')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
