"use client";

import { useState } from "react";
import { getPersonalizedRecommendations, type PersonalizedRecommendationsOutput } from "@/ai/flows/personalized-recommendations";
import { CeroBot } from "@/components/dashboard/cero-bot";
import { MoodSelector } from "@/components/dashboard/mood-selector";
import { RecommendationCard } from "@/components/dashboard/recommendation-card";
import { useToast } from "@/hooks/use-toast";
import { JournalDialog } from "@/components/journal/journal-dialog";
import { useUser, useFirestore } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { HabitReminder } from "@/components/habits/habit-reminder";
import { useTranslation } from "@/components/providers/language-provider";

export default function DashboardPage() {
  const [mood, setMood] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<PersonalizedRecommendationsOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();
  const firestore = useFirestore();
  const { t } = useTranslation();

  const handleMoodSelect = async (selectedMood: string) => {
    if (loading) return;
    setMood(selectedMood);
    setRecommendations(null);
    setIsJournalOpen(true); // Open journal dialog
  };

  const handleJournalSave = async (notes: string) => {
    if (!mood || !user) return;

    setLoading(true);
    setRecommendations(null);
    setIsJournalOpen(false);

    try {
      // Save mood log with notes to Firestore
      const moodLogRef = collection(firestore, 'users', user.uid, 'moodLogs');
      await addDoc(moodLogRef, {
        userId: user.uid,
        mood: mood,
        notes: notes,
        timestamp: serverTimestamp()
      });

      toast({
        title: t('dashboard.journalSave.toast.title'),
        description: t('dashboard.journalSave.toast.description'),
      });

      // Fetch personalized recommendations
      const result = await getPersonalizedRecommendations({ mood, journalText: notes });
      setRecommendations(result);

    } catch (error) {
      console.error("Error al obtener las recomendaciones:", error);
      toast({
        variant: "destructive",
        title: t('dashboard.recommendationError.toast.title'),
        description: t('dashboard.recommendationError.toast.description'),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <HabitReminder />
      <CeroBot />
      <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl font-headline">{t('dashboard.title')}</h2>
          <p className="text-muted-foreground">{t('dashboard.description')}</p>
      </div>
      <MoodSelector
        onMoodSelect={handleMoodSelect}
        selectedMood={mood}
        disabled={loading}
      />

      {mood && (
        <JournalDialog
          open={isJournalOpen}
          onOpenChange={setIsJournalOpen}
          onSave={handleJournalSave}
          mood={mood}
          loading={loading}
        />
      )}
      
      {(loading || recommendations) && (
          <div className="w-full flex justify-center pt-8">
              <RecommendationCard 
                loading={loading} 
                recommendations={recommendations} 
                mood={mood} 
              />
          </div>
      )}

    </div>
  );
}
