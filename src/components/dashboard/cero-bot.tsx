import { Bot } from "lucide-react";

export function CeroBot() {
  return (
    <div className="relative flex items-center justify-center w-24 h-24">
      <div className="absolute w-full h-full rounded-full bg-primary/10 animate-pulse"></div>
      <div className="absolute w-2/3 h-2/3 rounded-full bg-primary/20 animate-pulse [animation-delay:-0.5s]"></div>
      <Bot className="relative w-12 h-12 text-primary" />
    </div>
  );
}
