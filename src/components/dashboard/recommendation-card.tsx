import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Repeat, BookOpen, Quote, Sparkles } from "lucide-react";
import type { PersonalizedRecommendationsOutput } from "@/ai/flows/personalized-recommendations";
import { useTranslation } from "../providers/language-provider";

type RecommendationCardProps = {
  loading: boolean;
  recommendations: PersonalizedRecommendationsOutput | null;
  mood: string | null;
};

export function RecommendationCard({ loading, recommendations, mood }: RecommendationCardProps) {
  const { t } = useTranslation();
  
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
           <div className="flex items-start gap-4">
            <Skeleton className="w-8 h-8 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!recommendations) {
    return null;
  }

  return (
    <Card className="w-full max-w-2xl animate-in fade-in-50 duration-500">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2"><Sparkles className="text-accent"/>{t('recommendationCard.title')}</CardTitle>
        <CardDescription>{t('recommendationCard.description', { mood: mood?.toLowerCase() })}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {recommendations.inspirationalPhrase && (
             <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <Quote className="w-5 h-5 text-secondary-foreground" />
                </div>
                <div>
                    <h3 className="font-semibold text-foreground">{t('recommendationCard.phrase')}</h3>
                    <p className="text-muted-foreground italic">"{recommendations.inspirationalPhrase}"</p>
                </div>
            </div>
        )}

        <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
            <Repeat className="w-5 h-5 text-secondary-foreground" />
        </div>
        <div>
            <h3 className="font-semibold text-foreground">{t('recommendationCard.habit')}</h3>
            <p className="text-muted-foreground">{recommendations.habitRecommendation}</p>
        </div>
        </div>
        <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-secondary-foreground" />
        </div>
        <div>
            <h3 className="font-semibold text-foreground">{t('recommendationCard.reading')}</h3>
            <p className="text-muted-foreground">{recommendations.readingRecommendation}</p>
        </div>
        </div>
      </CardContent>
    </Card>
  );
}
