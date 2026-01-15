"use client";
import { Button } from "@/components/ui/button";

const moods = [
  { emoji: "😊", label: "Feliz" },
  { emoji: "😌", label: "Calmado" },
  { emoji: "🤔", label: "Pensativo" },
  { emoji: "😩", label: "Cansado" },
  { emoji: "😤", label: "Estresado" },
  { emoji: "😢", label: "Triste" },
];

type MoodSelectorProps = {
  onMoodSelect: (mood: string) => void;
  selectedMood: string | null;
  disabled: boolean;
};

export function MoodSelector({ onMoodSelect, selectedMood, disabled }: MoodSelectorProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
      {moods.map(({ emoji, label }) => (
        <Button
          key={label}
          variant={selectedMood === label ? "default" : "outline"}
          size="lg"
          className="flex flex-col items-center justify-center h-24 w-24 rounded-2xl gap-2 text-3xl transition-all duration-300 transform hover:scale-105 active:scale-95"
          onClick={() => onMoodSelect(label)}
          disabled={disabled}
          aria-pressed={selectedMood === label}
        >
          <span role="img" aria-label={label}>{emoji}</span>
          <span className="text-xs font-medium">{label}</span>
        </Button>
      ))}
    </div>
  );
}
