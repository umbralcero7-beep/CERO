'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useAuth, useFirestore } from '@/firebase';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { UserCircle, Loader2 } from 'lucide-react';
import { useTranslation } from '../providers/language-provider';
import { cn } from '@/lib/utils';

export function EditProfileDialog() {
  const { user } = useUserProfile();
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedAvatarUrl, setSelectedAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const avatarSeeds = ['digital', 'galaxy', 'nature', 'abstract', 'painting', 'minimal', 'vibrant', 'geometry'];
  const preloadedAvatars = avatarSeeds.map(seed => ({
    id: seed,
    url: `https://picsum.photos/seed/${seed}/96/96`
  }));

  const getInitials = (email?: string | null) => {
    if (!email) return 'U';
    return email.substring(0, 2).toUpperCase();
  };

  const handleSave = async () => {
    if (!user || !selectedAvatarUrl) return;

    setLoading(true);
    try {
      const photoURL = selectedAvatarUrl;

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { photoURL });
      }

      const userDocRef = doc(firestore, 'users', user.uid);
      await updateDoc(userDocRef, { photoURL });

      toast({
        title: t('profile.edit.toast.success.title'),
        description: t('profile.edit.toast.success.description'),
      });
      
      setOpen(false);
    } catch (error) {
      console.error('Error updating profile picture:', error);
      toast({
        variant: 'destructive',
        title: t('profile.edit.toast.error.title'),
        description: t('profile.edit.toast.error.description'),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) {
        setPreviewUrl(null);
        setSelectedAvatarUrl(null);
      }
    }}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <UserCircle className="mr-2 h-4 w-4" />
          <span>{t('header.profile')}</span>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('profile.edit.title')}</DialogTitle>
          <DialogDescription>{t('profile.edit.description')}</DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="flex justify-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src={previewUrl ?? user?.photoURL ?? `https://picsum.photos/seed/${user?.uid}/96/96`} alt={user?.email ?? ''} />
              <AvatarFallback className="text-3xl">{getInitials(user?.email)}</AvatarFallback>
            </Avatar>
          </div>
          
          <div className="grid grid-cols-4 gap-4 px-4">
            {preloadedAvatars.map((avatar) => (
              <Avatar
                key={avatar.id}
                className={cn(
                  "h-16 w-16 cursor-pointer ring-2 ring-transparent transition-all hover:ring-primary",
                  selectedAvatarUrl === avatar.url && 'ring-primary'
                )}
                onClick={() => {
                  setPreviewUrl(avatar.url);
                  setSelectedAvatarUrl(avatar.url);
                }}
              >
                <AvatarImage src={avatar.url} />
                <AvatarFallback>{avatar.id.substring(0,2)}</AvatarFallback>
              </Avatar>
            ))}
          </div>

        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
            {t('journalDialog.cancel')}
          </Button>
          <Button onClick={handleSave} disabled={!selectedAvatarUrl || loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {loading ? t('journalDialog.saving') : t('journalDialog.save')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
