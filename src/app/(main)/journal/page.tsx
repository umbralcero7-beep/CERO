'use client';

import { useCollection, useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { BookText } from 'lucide-react';

// A map to get emoji from mood label, since it's not stored in Firestore
const moodToEmoji: { [key: string]: string } = {
  "Feliz": "😊",
  "Calmado": "😌",
  "Pensativo": "🤔",
  "Cansado": "😩",
  "Estresado": "😤",
  "Triste": "😢",
};


export default function JournalPage() {
    const { user } = useUser();
    const firestore = useFirestore();

    const moodLogsQuery = useMemoFirebase(
        () => user ? query(collection(firestore, 'users', user.uid, 'moodLogs'), orderBy('timestamp', 'desc')) : null,
        [firestore, user]
    );

    const { data: moodLogs, isLoading } = useCollection(moodLogsQuery);

    if (isLoading) {
        return (
             <div className="space-y-8">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl font-headline flex items-center gap-2">
                        <BookText className="h-8 w-8" /> Historial del Diario
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                        Un archivo de tus pensamientos y emociones a lo largo del tiempo.
                    </p>
                </div>
                <div className="space-y-4">
                    <Skeleton className="h-28 w-full" />
                    <Skeleton className="h-28 w-full" />
                    <Skeleton className="h-28 w-full" />
                </div>
            </div>
        )
    }

    const logsWithNotes = moodLogs?.filter(log => log.notes && log.notes.trim() !== '');

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl font-headline flex items-center gap-2">
                    <BookText className="h-8 w-8" /> Historial del Diario
                </h2>
                <p className="mt-2 text-muted-foreground">
                    Un archivo de tus pensamientos y emociones a lo largo del tiempo.
                </p>
            </div>

            {(!logsWithNotes || logsWithNotes.length === 0) ? (
                 <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-8 border rounded-xl border-dashed min-h-[40vh]">
                    <p className="text-lg">Tu diario está vacío.</p>
                    <p className="text-sm mt-2">
                        Cuando registres tu estado de ánimo en el Dashboard y añadas una nota, aparecerá aquí.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {logsWithNotes.map(log => (
                        <Card key={log.id}>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-xl">
                                             {format(new Date(log.timestamp.seconds * 1000), "d 'de' MMMM 'de' yyyy", { locale: es })}
                                        </CardTitle>
                                        <CardDescription>
                                            Estado de ánimo: {log.mood}
                                        </CardDescription>
                                    </div>
                                    <span className="text-4xl">{moodToEmoji[log.mood] || '😐'}</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground whitespace-pre-wrap">{log.notes}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
