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
import { Label } from '../ui/label';

interface ReflectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // The save function now receives both the quote and the reflection
  onSave: (highlightedText: string, reflectionText: string) => void;
  bookTitle: string;
  loading: boolean;
}

export function ReflectionDialog({ open, onOpenChange, onSave, bookTitle, loading }: ReflectionDialogProps) {
  const [highlightedText, setHighlightedText] = useState('');
  const [reflection, setReflection] = useState('');
  const { t } = useTranslation();

  const handleSave = () => {
    onSave(highlightedText, reflection);
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  // Reset state when the dialog is closed
  useEffect(() => {
    if (!open) {
      setHighlightedText('');
      setReflection('');
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('reflectionDialog.manual.title')}</DialogTitle>
          <DialogDescription>
            {t('reflectionDialog.manual.description', { title: bookTitle })}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-6">
          <div className="grid w-full gap-2">
            <Label htmlFor="highlighted-text">{t('reflectionDialog.manual.highlightLabel')}</Label>
            <Textarea
              id="highlighted-text"
              placeholder={t('reflectionDialog.manual.highlightPlaceholder')}
              value={highlightedText}
              onChange={(e) => setHighlightedText(e.target.value)}
              rows={4}
            />
          </div>
          <div className="grid w-full gap-2">
            <Label htmlFor="reflection-text">{t('reflectionDialog.manual.reflectionLabel')}</Label>
            <Textarea
              id="reflection-text"
              placeholder={t('reflectionDialog.manual.reflectionPlaceholder')}
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              rows={6}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            {t('common.cancel')}
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? t('reflectionDialog.saving') : t('reflectionDialog.save')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
