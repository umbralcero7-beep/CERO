import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Repeat, BookOpen, Search, Sparkles } from "lucide-react";
import type { PersonalizedRecommendationsOutput } from "@/ai/flows/personalized-recommendations";
import type { JournalAnalysisOutput } from "@/ai/flows/analyze-journal-entry";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

type RecommendationCardProps = {
  loading: boolean;
  recommendations: PersonalizedRecommendationsOutput | null;
  journalAnalysis: JournalAnalysisOutput | null;
  mood: string | null;
};

export function RecommendationCard({ loading, recommendations, journalAnalysis, mood }: RecommendationCardProps) {
  if (loading) {
    return (
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2 mt-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-4">
            <Skeleton className="w-8 h-8 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Skeleton className="w-8 h-8 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
           <Separator />
           <div className="flex items-start gap-4">
            <Skeleton className="w-8 h-8 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!recommendations && !journalAnalysis) {
    return null;
  }

  return (
    <Card className="w-full max-w-2xl animate-in fade-in-50 duration-500">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2"><Sparkles className="text-accent"/>Sugerencias de Cero</CardTitle>
        <CardDescription>Para tu día {mood ? `de ${mood.toLowerCase()}` : "..."}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {journalAnalysis && (
            <>
                <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <Search className="w-5 h-5 text-secondary-foreground" />
                </div>
                <div>
                    <h3 className="font-semibold text-foreground">Análisis de tu Diario</h3>
                    <p className="text-muted-foreground italic">"{journalAnalysis.summary}"</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {journalAnalysis.keyEmotions.map(emotion => (
                            <Badge key={emotion} variant="secondary">{emotion}</Badge>
                        ))}
                    </div>
                </div>
                </div>
                <Separator />
            </>
        )}

        {recommendations && (
            <>
                <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <Repeat className="w-5 h-5 text-secondary-foreground" />
                </div>
                <div>
                    <h3 className="font-semibold text-foreground">Hábito Sugerido</h3>
                    <p className="text-muted-foreground">{recommendations.habitRecommendation}</p>
                </div>
                </div>
                <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-secondary-foreground" />
                </div>
                <div>
                    <h3 className="font-semibold text-foreground">Lectura Sugerida</h3>
                    <p className="text-muted-foreground">{recommendations.readingRecommendation}</p>
                </div>
                </div>
            </>
        )}
      </CardContent>
    </Card>
  );
}
