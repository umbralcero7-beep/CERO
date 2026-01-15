'use client';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Card } from '../ui/card';
import { useCollection, useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, doc, updateDoc, deleteDoc, orderBy, addDoc, getDocs, where, limit } from 'firebase/firestore';
import { Skeleton } from '../ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Checkbox } from '../ui/checkbox';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { EditHabitDialog } from './edit-habit-dialog';

export function HabitList() {
    const { user } = useUser();
    const firestore = useFirestore();
    const { toast } = useToast();
    const todayStr = format(new Date(), 'yyyy-MM-dd');

    const [completedHabits, setCompletedHabits] = useState<Set<string>>(new Set());
    const [isCompletionLoading, setIsCompletionLoading] = useState(true);

    const habitsQuery = useMemoFirebase(
        () => user ? query(collection(firestore, 'users', user.uid, 'habits'), orderBy('createdAt', 'desc')) : null,
        [firestore, user]
    );
    const { data: habits, isLoading: habitsLoading } = useCollection(habitsQuery);
    
    // Fetch today's completed habit logs
    useEffect(() => {
        if (!user || !habits || habits.length === 0) {
            setIsCompletionLoading(false);
            return;
        };
        setIsCompletionLoading(true);
        const fetchCompletedStatus = async () => {
            const newCompletedHabits = new Set<string>();
            try {
                for (const habit of habits) {
                    const habitLogsRef = collection(firestore, 'users', user.uid, 'habits', habit.id, 'habitLogs');
                    const q = query(habitLogsRef, where('date', '==', todayStr), where('completed', '==', true), limit(1));
                    const logSnapshot = await getDocs(q);
                    if (!logSnapshot.empty) {
                        newCompletedHabits.add(habit.id);
                    }
                }
                setCompletedHabits(newCompletedHabits);
            } catch(e) {
                console.error("Error fetching habit completion status:", e)
            } finally {
                setIsCompletionLoading(false);
            }
        };
        fetchCompletedStatus();
    }, [user, firestore, habits, todayStr]);


    const toggleHabitActive = async (id: string, currentStatus: boolean) => {
        if (!user) return;
        const habitRef = doc(firestore, 'users', user.uid, 'habits', id);
        try {
            await updateDoc(habitRef, { active: !currentStatus });
        } catch (error) {
            console.error("Error updating habit:", error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'No se pudo actualizar el hábito.',
            });
        }
    };

    const toggleHabitCompletion = async (habitId: string, isCompleted: boolean) => {
        if (!user) return;
        
        setCompletedHabits(prev => {
            const newSet = new Set(prev);
            if (isCompleted) newSet.add(habitId);
            else newSet.delete(habitId);
            return newSet;
        });

        const habitLogsRef = collection(firestore, 'users', user.uid, 'habits', habitId, 'habitLogs');
        const logQuery = query(habitLogsRef, where('date', '==', todayStr), limit(1));

        try {
            const logSnapshot = await getDocs(logQuery);
            if (logSnapshot.empty) {
                // No log for today, create one
                await addDoc(habitLogsRef, {
                    habitId: habitId,
                    userId: user.uid, // Add userId for collectionGroup queries
                    date: todayStr,
                    completed: isCompleted
                });
            } else {
                // Log exists, update it
                const logDocRef = logSnapshot.docs[0].ref;
                await updateDoc(logDocRef, { completed: isCompleted });
            }
        } catch (error) {
             console.error("Error updating habit completion:", error);
             toast({
                variant: 'destructive',
                title: 'Error',
                description: 'No se pudo actualizar el estado del hábito.',
            });
             // Revert optimistic update
            setCompletedHabits(prev => {
                const newSet = new Set(prev);
                if (isCompleted) newSet.delete(habitId);
                else newSet.add(habitId);
                return newSet;
            });
        }
    };

    const deleteHabit = async (id: string) => {
        if (!user) return;
        const habitRef = doc(firestore, 'users', user.uid, 'habits', id);
        try {
            await deleteDoc(habitRef);
            toast({
                title: 'Hábito eliminado',
                description: 'El hábito ha sido eliminado correctamente.',
            });
        } catch (error) {
            console.error("Error deleting habit:", error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'No se pudo eliminar el hábito.',
            });
        }
    };
    
    if (habitsLoading || isCompletionLoading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
            </div>
        );
    }
    
    if (!habits || habits.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-8 border rounded-xl border-dashed">
                <p>Aún no has añadido ningún hábito.</p>
                <p className="text-sm">¡Usa el botón "Añadir Hábito" para empezar a construir tu rutina!</p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {habits.map(habit => (
                <Card key={habit.id} className="flex items-center justify-between p-4 hover:bg-accent/50 transition-colors">
                    <div className="flex items-center space-x-4">
                        <Checkbox
                           id={`complete-${habit.id}`}
                           checked={completedHabits.has(habit.id)}
                           onCheckedChange={(checked) => toggleHabitCompletion(habit.id, !!checked)}
                           aria-label={`Marcar ${habit.name} como completado`}
                           disabled={!habit.active}
                        />
                        <div className="grid gap-1">
                            <Label htmlFor={`complete-${habit.id}`} className="font-semibold text-base cursor-pointer break-words">{habit.name}</Label>
                            <p className="text-sm text-muted-foreground break-words">{habit.description}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                         <Switch
                            id={`active-${habit.id}`}
                            checked={habit.active}
                            onCheckedChange={() => toggleHabitActive(habit.id, habit.active)}
                            aria-label={`Activar ${habit.name}`}
                        />
                        <EditHabitDialog habit={habit} />
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                 <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" aria-label="Eliminar hábito">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Esta acción no se puede deshacer. Esto eliminará permanentemente tu hábito y todos sus datos asociados.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deleteHabit(habit.id)}>Eliminar</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </Card>
            ))}
        </div>
    );
}
