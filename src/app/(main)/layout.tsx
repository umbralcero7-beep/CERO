'use client';
import type { ReactNode } from "react";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Header } from "@/components/layout/header";
import { useUser } from '@/firebase';
import { Skeleton } from "@/components/ui/skeleton";
import { BottomNav } from "@/components/layout/bottom-nav";

export default function MainLayout({ children }: { children: ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
        <div className="flex h-screen w-screen">
            <div className="hidden md:flex flex-col gap-4 p-4 border-r">
                <Skeleton className="h-12 w-48" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
            </div>
            <div className="flex-1 flex flex-col">
                <header className="flex h-16 items-center justify-between border-b px-4 sm:px-6 lg:px-8">
                    <Skeleton className="h-8 w-40" />
                    <Skeleton className="h-10 w-10 rounded-full" />
                </header>
                <main className="p-4 sm:p-6 lg:p-8">
                    <Skeleton className="h-64 w-full" />
                </main>
            </div>
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-4 sm:p-6 lg:p-8 pb-24">{children}</main>
      <BottomNav />
    </div>
  );
}
