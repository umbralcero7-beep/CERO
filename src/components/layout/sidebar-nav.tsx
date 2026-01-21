"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ListTodo, BookHeart, BarChart3, Bot, BookText, BrainCircuit } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "../providers/language-provider";

export function SidebarNav() {
  const pathname = usePathname();
  const { t } = useTranslation();

  const navItems = [
    { href: '/', label: t('nav.dashboard'), icon: Home },
    { href: '/habits', label: t('nav.habits'), icon: ListTodo },
    { href: '/calm', label: t('nav.calm'), icon: BrainCircuit },
    { href: '/library', label: t('nav.library'), icon: BookHeart },
    { href: '/journal', label: t('nav.journal'), icon: BookText },
    { href: '/progress', label: t('nav.progress'), icon: BarChart3 },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 border-r">
      <div className="flex items-center gap-3 border-b h-16 px-4">
        <Link href="/" className="flex items-center gap-3 font-headline">
            <Bot className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold text-foreground">Umbral</span>
        </Link>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
                <li key={item.href}>
                <Link
                    href={item.href}
                    className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted hover:text-primary',
                    {
                        'bg-muted text-primary font-semibold': isActive,
                    }
                    )}
                >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                </Link>
                </li>
            )
        })}
        </ul>
      </nav>
    </aside>
  );
}
