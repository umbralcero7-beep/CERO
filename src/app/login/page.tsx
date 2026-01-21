'use client';
import { AuthForm } from "@/components/auth/auth-form";
import { Bot } from "lucide-react";
import { useTranslation } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const { t, setLocale, locale } = useTranslation();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 relative">
        <div className="absolute top-4 right-4 flex gap-2">
            <Button variant={locale === 'es' ? 'default' : 'outline'} size="sm" onClick={() => setLocale('es')}>Español</Button>
            <Button variant={locale === 'en' ? 'default' : 'outline'} size="sm" onClick={() => setLocale('en')}>English</Button>
        </div>
        <div className="w-full max-w-md">
            <div className="flex flex-col items-center justify-center text-center mb-8">
                <Bot className="w-12 h-12 text-primary mb-4" />
                <h1 className="text-3xl font-bold font-headline text-foreground">
                    {t('login.welcome')}
                </h1>
                <p className="text-muted-foreground mt-2">
                    {t('login.subtitle')}
                </p>
            </div>
            <AuthForm />
        </div>
    </div>
  );
}
