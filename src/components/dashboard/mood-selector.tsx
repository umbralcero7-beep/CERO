"use client";
import { Button } from "@/components/ui/button";
import { useTranslation } from "../providers/language-provider";

type MoodSelectorProps = {
  onMoodSelect: (mood: string) => void;
  selectedMood: string | null;
  disabled: boolean;
};

export function MoodSelector({ onMoodSelect, selectedMood, disabled }: MoodSelectorProps) {
  const { t } = useTranslation();

  const moods = [
    { emoji: "😊", label: t("dashboard.mood.feliz") },
    { emoji: "😌", label: t("dashboard.mood.calmado") },
    { emoji: "🤔", label: t("dashboard.mood.pensativo") },
    { emoji: "😩", label: t("dashboard.mood.cansado") },
    { emoji: "😤", label: t("dashboard.mood.estresado") },
    { emoji: "😢", label: t("dashboard.mood.triste") },
  ];
  
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
