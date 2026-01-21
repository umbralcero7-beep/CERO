
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { suggestHabits, type SuggestedHabit } from '@/ai/flows/suggest-habits';
import { useUser, useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Wand2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/components/providers/language-provider';

const onboardingSchema = z.object({
  goal: z.string({ required_error: 'Por favor, selecciona un objetivo.' }),
  challenge: z.string().min(10, { message: 'Por favor, describe tu desafío con un poco más de detalle (mín. 10 caracteres).' }),
});

type OnboardingFormValues = z.infer<typeof onboardingSchema>;

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [suggestedHabits, setSuggestedHabits] = useState<SuggestedHabit[]>([]);
  const [selectedHabits, setSelectedHabits] = useState<Set<string>>(new Set());

  const goals = [
    { id: 'stress', label: t('onboarding.goal.stress') },
    { id: 'focus', label: t('onboarding.goal.focus') },
    { id: 'self-esteem', label: t('onboarding.goal.selfEsteem') },
    { id: 'relationships', label: t('onboarding.goal.relationships') },
    { id: 'emotions', label: t('onboarding.goal.emotions') },
  ];

  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      challenge: '',
    },
  });

  async function onSubmit(data: OnboardingFormValues) {
    setLoading(true);
    try {
      const habits = await suggestHabits(data);
      setSuggestedHabits(habits);
      setSelectedHabits(new Set(habits.map(h => h.name)));
      setStep(2);
    } catch (error) {
      console.error('Error suggesting habits:', error);
      toast({
        variant: 'destructive',
        title: t('onboarding.aiError.title'),
        description: t('onboarding.aiError.description'),
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleFinishOnboarding() {
    if (!user) {
      toast({ variant: 'destructive', title: 'Error', description: 'No se encontró el usuario.' });
      return router.push('/login');
    }
    setLoading(true);
    try {
      const habitsToAdd = suggestedHabits.filter(h => selectedHabits.has(h.name));
      const habitsRef = collection(firestore, 'users', user.uid, 'habits');

      for (const habit of habitsToAdd) {
        await addDoc(habitsRef, {
          userId: user.uid,
          name: habit.name,
          description: habit.description,
          frequency: 'Daily',
          active: true,
          createdAt: serverTimestamp(),
        });
      }
      toast({
        title: t('onboarding.finish.toast.title'),
        description: t('onboarding.finish.toast.description', { count: habitsToAdd.length }),
      });
      router.push('/');
    } catch (error) {
      console.error('Error saving habits:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudieron guardar tus hábitos. Por favor, inténtalo de nuevo.',
      });
    } finally {
      setLoading(false);
    }
  }

  const handleHabitSelection = (habitName: string, checked: boolean) => {
    setSelectedHabits(prev => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(habitName);
      } else {
        newSet.delete(habitName);
      }
      return newSet;
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl">
        {step === 1 && (
          <>
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center gap-2"><Wand2 /> {t('onboarding.welcome')}</CardTitle>
              <CardDescription>{t('onboarding.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="goal"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-base font-semibold">{t('onboarding.goal.label')}</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-2"
                          >
                            {goals.map(goal => (
                              <FormItem key={goal.id} className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value={goal.label} />
                                </FormControl>
                                <FormLabel className="font-normal">{goal.label}</FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="challenge"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">{t('onboarding.challenge.label')}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t('onboarding.challenge.placeholder')}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {t('onboarding.submitButton')}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </>
        )}
        {step === 2 && (
          <>
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center gap-2"><Sparkles /> {t('onboarding.step2.title')}</CardTitle>
              <CardDescription>{t('onboarding.step2.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {suggestedHabits.map((habit) => (
                  <div key={habit.name} className="flex items-start space-x-3 rounded-md border p-4">
                    <Checkbox
                      id={habit.name}
                      checked={selectedHabits.has(habit.name)}
                      onCheckedChange={(checked) => handleHabitSelection(habit.name, !!checked)}
                      className="mt-1"
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label htmlFor={habit.name} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {habit.name}
                      </label>
                      <p className="text-sm text-muted-foreground">
                        {habit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button onClick={handleFinishOnboarding} className="w-full" disabled={loading || selectedHabits.size === 0}>
                {loading ? t('onboarding.finishButton.loading') : t('onboarding.finishButton', { count: selectedHabits.size })}
              </Button>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}
