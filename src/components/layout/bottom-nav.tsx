'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ListTodo, BookHeart, BrainCircuit, BookText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from '../providers/language-provider';

export function BottomNav() {
  const pathname = usePathname();
  const { t } = useTranslation();

  const navItems = [
    { href: '/', label: t('nav.dashboard'), icon: Home },
    { href: '/habits', label: t('nav.habits'), icon: ListTodo },
    { href: '/calm', label: t('nav.calm'), icon: BrainCircuit },
    { href: '/library', label: t('nav.library'), icon: BookHeart },
    { href: '/journal', label: t('nav.journal'), icon: BookText },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-sm md:hidden">
      <div className="flex h-16 items-center justify-around">
        {navItems.map((item) => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
            <Link
                key={item.href}
                href={item.href}
                className={cn(
                'flex flex-col items-center justify-center gap-1 p-2 rounded-md transition-colors text-muted-foreground hover:text-primary w-16 text-center',
                {
                    'text-primary': isActive,
                }
                )}
            >
                <item.icon className="h-6 w-6" />
                <span className="text-xs font-medium truncate">{item.label}</span>
            </Link>
            )
        })}
      </div>
    </nav>
  );
}
