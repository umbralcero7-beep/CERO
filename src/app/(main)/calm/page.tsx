'use client';
import { useState, useEffect } from 'react';
import { BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/components/providers/language-provider';

export default function CalmPage() {
  const { t } = useTranslation();
  
  const breathingCycle = [
    { name: t('calm.phase.inhale'), duration: 4000, instruction: t('calm.instruction.inhale') },
    { name: t('calm.phase.hold'), duration: 4000, instruction: t('calm.instruction.hold') },
    { name: t('calm.phase.exhale'), duration: 6000, instruction: t('calm.instruction.exhale') },
  ];

  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase((prevPhase) => (prevPhase + 1) % breathingCycle.length);
    }, breathingCycle[phase].duration);

    return () => clearTimeout(timer);
  }, [phase, breathingCycle]);

  const currentPhase = breathingCycle[phase];

  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
       <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl font-headline flex items-center gap-2 justify-center">
          <BrainCircuit className="h-8 w-8" /> {t('calm.title')}
        </h2>
        <p className="mt-2 text-muted-foreground max-w-lg mx-auto">
          {t('calm.description')}
        </p>
      </div>

      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Outer pulsating circles for effect */}
        <div className={cn(
          "absolute w-full h-full rounded-full bg-primary/10 transition-transform ease-in-out",
          currentPhase.name === t('calm.phase.inhale') || currentPhase.name === t('calm.phase.exhale') ? 'animate-pulse' : ''
        )} style={{ transitionDuration: '2000ms' }}></div>
        
        {/* Main breathing circle */}
        <div
          className={cn(
            'absolute w-32 h-32 rounded-full bg-primary shadow-2xl shadow-primary/30 transition-transform ease-in-out',
          )}
           style={{
             transitionDuration: `${currentPhase.duration}ms`,
             transform: currentPhase.name === t('calm.phase.inhale') ? 'scale(1.5)' : 'scale(1.0)',
           }}
        ></div>

        {/* Text instruction */}
        <div className="z-10 text-primary-foreground text-center">
            <p className="text-2xl font-bold">{currentPhase.name}</p>
        </div>
      </div>
      <p className="text-muted-foreground text-lg h-8">{currentPhase.instruction}</p>
    </div>
  );
}
