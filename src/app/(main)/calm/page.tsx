'use client';
import { useState, useEffect } from 'react';
import { BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';

const breathingCycle = [
  { name: 'Inhala', duration: 4000, instruction: 'Inhala lentamente por la nariz...' },
  { name: 'Sostén', duration: 4000, instruction: 'Sostén la respiración...' },
  { name: 'Exhala', duration: 6000, instruction: 'Exhala suavemente por la boca...' },
];

export default function CalmPage() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase((prevPhase) => (prevPhase + 1) % breathingCycle.length);
    }, breathingCycle[phase].duration);

    return () => clearTimeout(timer);
  }, [phase]);

  const currentPhase = breathingCycle[phase];

  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
       <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl font-headline flex items-center gap-2 justify-center">
          <BrainCircuit className="h-8 w-8" /> Rincón de Calma
        </h2>
        <p className="mt-2 text-muted-foreground max-w-lg mx-auto">
          Sigue la guía visual para encontrar un ritmo de respiración relajante.
        </p>
      </div>

      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Outer pulsating circles for effect */}
        <div className={cn(
          "absolute w-full h-full rounded-full bg-primary/10 transition-transform ease-in-out",
          currentPhase.name === 'Inhala' || currentPhase.name === 'Exhala' ? 'animate-pulse' : ''
        )} style={{ transitionDuration: '2000ms' }}></div>
        
        {/* Main breathing circle */}
        <div
          className={cn(
            'absolute w-32 h-32 rounded-full bg-primary shadow-2xl shadow-primary/30 transition-transform ease-in-out',
          )}
           style={{
             transitionDuration: `${currentPhase.duration}ms`,
             transform: currentPhase.name === 'Inhala' ? 'scale(1.5)' : 'scale(1.0)',
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
