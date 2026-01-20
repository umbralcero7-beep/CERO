'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Crown, Sparkles } from "lucide-react";

const proFeatures = [
    "Acceso ilimitado a toda la Librería Emocional.",
    "Análisis más profundos de tus entradas de diario.",
    "Estadísticas y logros exclusivos.",
    "Nuevas funciones de personalización.",
    "Soporte prioritario."
]

export default function ProPage() {
    return (
        <div className="flex flex-col items-center justify-center text-center space-y-8">
            <Card className="w-full max-w-2xl">
                <CardHeader className="items-center">
                    <div className="p-4 bg-accent/20 rounded-full mb-4">
                        <Crown className="w-10 h-10 text-accent" />
                    </div>
                    <CardTitle className="text-3xl font-bold font-headline flex items-center gap-2">
                        Desbloquea Umbral Pro
                    </CardTitle>
                    <CardDescription className="max-w-md pt-2">
                        Lleva tu viaje de bienestar al siguiente nivel con acceso a todas las herramientas y contenido exclusivo.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 text-left">
                    <ul className="space-y-3">
                        {proFeatures.map((feature, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                                <span className="text-muted-foreground">{feature}</span>
                            </li>
                        ))}
                    </ul>
                    <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg" disabled>
                        <Sparkles className="mr-2 h-5 w-5" /> Próximamente
                    </Button>
                    <p className="text-xs text-center text-muted-foreground pt-2">
                        La compra de la suscripción se gestionará a través de la Play Store una vez que la aplicación esté publicada.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
