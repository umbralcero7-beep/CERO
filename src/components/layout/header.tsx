"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { useAuth, useUser } from "@/firebase";
import { signOut } from "firebase/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Bot, Sparkles, Cog, UserCircle } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "../providers/language-provider";
import { useUserProfile } from "@/hooks/useUserProfile";
import { EditProfileDialog } from "../profile/edit-profile-dialog";

export function Header() {
  const { user } = useUser();
  const { isPro } = useUserProfile();
  const auth = useAuth();
  const { t } = useTranslation();

  const handleLogout = async () => {
    await signOut(auth);
  };
  
  const getInitials = (email?: string | null) => {
    if (!email) return "U";
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center border-b bg-background/90 px-4 backdrop-blur-sm sm:px-6">
      <div className="md:hidden">
        <Link href="/" className="flex items-center gap-2">
            <Bot className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold font-headline text-foreground">Umbral</span>
        </Link>
      </div>
      
      <div className="flex flex-1 items-center justify-end">
       <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar>
                <AvatarImage src={user?.photoURL ?? `https://picsum.photos/seed/${user?.uid}/40/40`} data-ai-hint="user avatar" alt={user?.email ?? ""} />
                <AvatarFallback>{getInitials(user?.email)}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user?.displayName ?? user?.email?.split('@')[0] ?? t('header.user')}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
           <EditProfileDialog />
           <DropdownMenuItem asChild>
              <Link href="/settings">
                <Cog className="mr-2 h-4 w-4" />
                <span>{t('header.settings')}</span>
              </Link>
            </DropdownMenuItem>
            {!isPro && (
                <DropdownMenuItem asChild>
                <Link href="/pro">
                    <Sparkles className="mr-2 h-4 w-4" />
                    <span>{t('header.pro')}</span>
                </Link>
                </DropdownMenuItem>
            )}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>{t('header.logout')}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      </div>
    </header>
  );
}
