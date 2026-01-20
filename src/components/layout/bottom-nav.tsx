'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ListTodo, BookHeart, BarChart3, Menu, X, BrainCircuit, BookText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/journal', label: 'Diario', icon: BookText },
  { href: '/habits', label: 'Hábitos', icon: ListTodo },
  { href: '/library', label: 'Librería', icon: BookHeart },
  { href: '/progress', label: 'Progreso', icon: BarChart3 },
  { href: '/calm', label: 'Calma', icon: BrainCircuit },
];

export function BottomNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="relative flex flex-col items-center gap-2">
        {/* Navigation buttons that appear when open */}
        {isOpen && (
          <nav className="flex flex-col gap-2 animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'flex h-12 w-12 items-center justify-center rounded-full transition-all',
                  'text-foreground bg-background/80 border shadow-lg backdrop-blur-sm',
                  'hover:bg-primary/90 hover:text-primary-foreground',
                  {
                    'bg-primary text-primary-foreground': pathname === item.href,
                  }
                )}
              >
                <item.icon className="h-6 w-6" />
                <span className="sr-only">{item.label}</span>
              </Link>
            ))}
          </nav>
        )}

        {/* Main toggle button */}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full shadow-xl"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          <span className="sr-only">{isOpen ? 'Cerrar menú' : 'Abrir menú'}</span>
        </Button>
      </div>
    </div>
  );
}
