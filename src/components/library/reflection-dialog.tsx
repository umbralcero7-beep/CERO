"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "../providers/language-provider";

interface ReflectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (reflectionText: string) => void;
  bookTitle: string;
  loading: boolean;
}

export function ReflectionDialog({ open, onOpenChange, onSave, bookTitle, loading }: ReflectionDialogProps) {
  const [reflection, setReflection] = useState("");
  const { t } = useTranslation();

  const handleSave = () => {
    onSave(reflection);
  };
  
  const handleClose = () => {
    onOpenChange(false);
    setReflection(""); // Also reset on close
  }

  // Reset text when a new dialog is opened for a different session
  useEffect(() => {
    if (open) {
      setReflection("");
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('reflectionDialog.title', { title: bookTitle })}</DialogTitle>
          <DialogDescription>
            {t('reflectionDialog.description')}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Textarea
            placeholder={t('reflectionDialog.placeholder')}
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            rows={6}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            {t('reflectionDialog.skip')}
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? t('reflectionDialog.saving') : t('reflectionDialog.save')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
