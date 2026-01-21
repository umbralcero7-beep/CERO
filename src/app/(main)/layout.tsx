'use client';
import type { ReactNode } from "react";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '@/firebase';
import { Skeleton } from "@/components/ui/skeleton";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { Header } from "@/components/layout/header";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Capacitor } from "@capacitor/core";
import { SplashScreen } from "@capacitor/splash-screen";
import { CapacitorInit } from "@/components/capacitor/capacitor-init";

export default function MainLayout({ children }: { children: ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  // Effect for user authentication and splash screen
  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
    
    // Hide the splash screen once the main layout is ready
    if (Capacitor.isNativePlatform()) {
      SplashScreen.hide();
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return (
        <div className="flex h-screen w-screen">
            {/* Desktop Skeleton */}
            <div className="hidden md:flex flex-col border-r w-64 p-4 gap-4">
                <Skeleton className="h-8 w-32" />
                <div className="flex-1 space-y-2 mt-4">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                </div>
            </div>
            {/* Mobile/Main Skeleton */}
            <div className="flex-1 flex flex-col">
                <header className="flex h-16 items-center justify-between border-b px-4 sm:px-6">
                    <div className="md:hidden">
                        <Skeleton className="h-8 w-24" />
                    </div>
                    <div className="flex-1" />
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
    <div className="flex min-h-screen w-full bg-background">
      <CapacitorInit />
      {/* Desktop Sidebar */}
      <SidebarNav />
      
      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-grow p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
            {children}
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <BottomNav />
    </div>
  );
}
