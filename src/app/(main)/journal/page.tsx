'use client';

import { useState, useMemo } from 'react';
import { useCollection, useUser } from '@/firebase';
import { orderBy } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { es, enUS } from 'date-fns/locale';
import { BookText, Wand2, Sparkles } from 'lucide-react';
import { useTranslation } from '@/components/providers/language-provider';
import { analyzeJournalEntry, JournalAnalysisOutput } from '@/ai/flows/analyze-journal-entry';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

// A map to get emoji from mood label, since it's not stored in Firestore
const moodToEmoji: { [key: string]: string } = {
  "Feliz": "😊",
  "Calmado": "😌",
  "Pensativo": "🤔",
  "Cansado": "😩",
  "Estresado": "😤",
  "Triste": "😢",
  "Happy": "😊",
  "Calm": "😌",
  "Thoughtful": "🤔",
  "Tired": "😩",
  "Stressed": "😤",
  "Sad": "😢",
};


export default function JournalPage() {
    const { user } = useUser();
    const { t, locale } = useTranslation();
    const { toast } = useToast();
    const dateLocale = locale === 'es' ? es : enUS;

    const [analyses, setAnalyses] = useState<Record<string, JournalAnalysisOutput | null>>({});
    const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

    const collectionPath = user ? `users/${user.uid}/moodLogs` : null;
    const constraints = useMemo(() => [
        orderBy('timestamp', 'desc')
    ], []);

    const { data: moodLogs, isLoading } = useCollection(collectionPath, constraints);

    const handleAnalyze = async (logId: string, text: string) => {
        setLoadingStates(prev => ({ ...prev, [logId]: true }));
        try {
            const result = await analyzeJournalEntry({ journalText: text });
            setAnalyses(prev => ({ ...prev, [logId]: result }));
        } catch (error) {
            console.error("Error analyzing journal entry:", error);
            toast({
                variant: 'destructive',
                title: t('journal.analysis.error.title'),
                description: t('journal.analysis.error.description'),
            });
        } finally {
            setLoadingStates(prev => ({ ...prev, [logId]: false }));
        }
    };


    if (isLoading) {
        return (
             <div className="space-y-8">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl font-headline flex items-center gap-2">
                        <BookText className="h-8 w-8" /> {t('journal.title')}
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                        {t('journal.description')}
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
                    <BookText className="h-8 w-8" /> {t('journal.title')}
                </h2>
                <p className="mt-2 text-muted-foreground">
                    {t('journal.description')}
                </p>
            </div>

            {(!logsWithNotes || logsWithNotes.length === 0) ? (
                 <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-8 border rounded-xl border-dashed min-h-[40vh]">
                    <p className="text-lg">{t('journal.empty')}</p>
                    <p className="text-sm mt-2">
                        {t('journal.empty.description')}
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {logsWithNotes.map(log => {
                        const analysis = analyses[log.id];
                        const isLoadingAnalysis = loadingStates[log.id];

                        return (
                            <Card key={log.id}>
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-xl">
                                                {/* @ts-ignore */}
                                                {format(new Date(log.timestamp.seconds * 1000), "d 'de' MMMM 'de' yyyy", { locale: dateLocale })}
                                            </CardTitle>
                                            <CardDescription>
                                                {t('journal.moodLabel')} {log.mood}
                                            </CardDescription>
                                        </div>
                                        <span className="text-4xl">{moodToEmoji[log.mood] || '😐'}</span>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground whitespace-pre-wrap">{log.notes}</p>
                                    <div className="mt-4 pt-4 border-t">
                                        {isLoadingAnalysis ? (
                                            <div className="flex items-center gap-2 text-muted-foreground">
                                                <Sparkles className="w-4 h-4 animate-pulse" />
                                                <span>{t('journal.analysis.loading')}</span>
                                            </div>
                                        ) : analysis ? (
                                            <div className="space-y-3 text-sm">
                                                <h4 className="font-semibold text-base flex items-center gap-2"><Sparkles className="w-4 h-4 text-accent" /> {t('journal.analysis.title')}</h4>
                                                <p className="text-muted-foreground italic">"{analysis.summary}"</p>
                                                {analysis.keyEmotions.length > 0 && (
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <span className="font-medium">{t('journal.analysis.emotions')}:</span>
                                                        {analysis.keyEmotions.map((emotion, i) => (
                                                            <Badge key={i} variant="secondary">{emotion}</Badge>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <Button size="sm" variant="outline" onClick={() => handleAnalyze(log.id, log.notes)}>
                                                <Wand2 className="mr-2 h-4 w-4" />
                                                {t('journal.analyzeButton')}
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    )
}
