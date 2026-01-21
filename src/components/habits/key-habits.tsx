import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb } from "lucide-react"
import { useTranslation } from "../providers/language-provider"

export function KeyHabits() {
  const { t } = useTranslation();

  const keyHabits = [
    {
      emoji: "💧",
      title: t('keyHabits.hydrate.title'),
      why: t('keyHabits.hydrate.why'),
      action: t('keyHabits.hydrate.action'),
      benefit: t('keyHabits.hydrate.benefit'),
    },
    {
      emoji: "🏃‍♂️",
      title: t('keyHabits.move.title'),
      why: t('keyHabits.move.why'),
      action: t('keyHabits.move.action'),
      benefit: t('keyHabits.move.benefit'),
    },
    {
      emoji: "🧘‍♀️",
      title: t('keyHabits.calm.title'),
      why: t('keyHabits.calm.why'),
      action: t('keyHabits.calm.action'),
      benefit: t('keyHabits.calm.benefit'),
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
            <Lightbulb className="text-accent" />
            {t('keyHabits.title')}
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
                  <h4 className="font-semibold">{t('keyHabits.whyLabel')}</h4>
                  <p className="text-muted-foreground">{habit.why}</p>
                </div>
                <div>
                  <h4 className="font-semibold">{t('keyHabits.actionLabel')}</h4>
                  <p className="text-muted-foreground">{habit.action}</p>
                </div>
                <div>
                  <h4 className="font-semibold">{t('keyHabits.benefitLabel')}</h4>
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
