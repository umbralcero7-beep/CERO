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
import { Plus } from "lucide-react";
import { useState } from "react";
import { useFirestore, useUser } from "@/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "../providers/language-provider";

export function AddHabitDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const handleAddHabit = async () => {
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
      const habitsRef = collection(firestore, 'users', user.uid, 'habits');
      await addDoc(habitsRef, {
        userId: user.uid,
        name: title,
        description: description,
        frequency: 'Daily', // Default value
        active: true,
        createdAt: serverTimestamp(),
      });

      toast({
        title: t('addHabitDialog.toast.added.title'),
        description: t('addHabitDialog.toast.added.description', { title }),
      });
      
      setTitle("");
      setDescription("");
      setOpen(false);
    } catch (error) {
      console.error("Error adding habit:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: t('addHabitDialog.toast.error.add'),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> {t('habits.addHabit')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('addHabitDialog.title')}</DialogTitle>
          <DialogDescription>
            {t('addHabitDialog.description')}
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
          <Button type="submit" onClick={handleAddHabit} disabled={loading}>
            {loading ? t('addHabitDialog.saving') : t('addHabitDialog.save')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
