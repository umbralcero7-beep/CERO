import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb } from "lucide-react"

const keyHabits = [
  {
    emoji: "💧",
    title: "Hidratarse al despertar",
    why: "Durante la noche el cuerpo pierde líquidos; beber agua ayuda a reactivar el metabolismo y mejorar la concentración.",
    action: "Tomar un vaso grande de agua antes del café o desayuno.",
    benefit: "Mayor energía y mejor digestión.",
  },
  {
    emoji: "🏃‍♂️",
    title: "Movimiento físico (ejercicio ligero o estiramientos)",
    why: "El cuerpo necesita activarse después de horas de reposo. El movimiento mejora la circulación y oxigena el cerebro.",
    action: "Estiramientos de 5–10 minutos, yoga suave o una caminata corta.",
    benefit: "Reducción de la rigidez muscular y aumento de la vitalidad.",
  },
  {
    emoji: "🧘‍♀️",
    title: "Calma mental (meditación o respiración consciente)",
    why: "La mente suele estar dispersa al despertar; la meditación ayuda a centrar pensamientos y reducir el estrés.",
    action: "Dedicar 5 minutos a respirar profundamente o practicar mindfulness.",
    benefit: "Mayor claridad mental y mejor disposición emocional para el día.",
  },
]

export function KeyHabits() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
            <Lightbulb className="text-accent" />
            Sugerencias: Hábitos Clave para Iniciar el Día
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {keyHabits.map((habit, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>
                <span className="flex items-center gap-3 text-left">
                  <span className="text-2xl">{habit.emoji}</span>
                  {habit.title}
                </span>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 pl-12">
                <div>
                  <h4 className="font-semibold">Por qué es importante:</h4>
                  <p className="text-muted-foreground">{habit.why}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Acción práctica:</h4>
                  <p className="text-muted-foreground">{habit.action}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Beneficio inmediato:</h4>
                  <p className="text-muted-foreground">{habit.benefit}</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}
