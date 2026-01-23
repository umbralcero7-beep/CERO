'use client';
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useTranslation } from '../providers/language-provider';

interface JournalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: { notes: string }) => void;
  mood: string | null;
  loading: boolean;
}

export function JournalDialog({ open, onOpenChange, onSave, mood, loading }: JournalDialogProps) {
  const [notes, setNotes] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    if (!open) {
      setNotes('');
    }
  }, [open]);

  const handleSave = () => {
    onSave({ notes });
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('journalDialog.title', { mood: mood })}</DialogTitle>
          <DialogDescription>
            {t('journalDialog.description')}
          </DialogDescription>
        </DialogHeader>
        <div className='py-4'>
          <Textarea
            placeholder={t('journalDialog.placeholder')}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={6}
            disabled={loading}
          />
        </div>
        <DialogFooter>
          <div className='flex gap-2 w-full justify-end'>
            <Button variant='outline' onClick={handleClose} disabled={loading}>
              {t('journalDialog.cancel')}
            </Button>
            <Button onClick={handleSave} disabled={loading || !notes}>
              {loading ? t('journalDialog.saving') : t('journalDialog.save')}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
