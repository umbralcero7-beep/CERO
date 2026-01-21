'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/providers/theme-provider';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { useTranslation } from '@/components/providers/language-provider';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  const themes = [
    { name: t('settings.theme.light'), value: 'light', icon: Sun },
    { name: t('settings.theme.dark'), value: 'dark', icon: Moon },
    { name: t('settings.theme.cosmos'), value: 'cosmos', icon: Sparkles },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl font-headline">
          {t('settings.title')}
        </h2>
        <p className="mt-2 text-muted-foreground">
          {t('settings.description')}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('settings.theme.title')}</CardTitle>
          <CardDescription>{t('settings.theme.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {themes.map((t) => (
              <Button
                key={t.value}
                variant={theme === t.value ? 'default' : 'outline'}
                onClick={() => setTheme(t.value as any)}
                className="h-auto py-4 flex flex-col gap-2"
              >
                <t.icon className="w-6 h-6" />
                <span>{t.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
