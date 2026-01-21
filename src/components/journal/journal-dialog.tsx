"use client";
import { useState } from "react";
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

interface JournalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (notes: string) => void;
  mood: string | null;
  loading: boolean;
}

export function JournalDialog({ open, onOpenChange, onSave, mood, loading }: JournalDialogProps) {
  const [notes, setNotes] = useState("");
  const { t } = useTranslation();

  const handleSave = () => {
    onSave(notes);
    setNotes(""); // Reset notes after saving
  };
  
  const handleClose = () => {
    onOpenChange(false);
    setNotes("");
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('journalDialog.title', { mood: mood })}</DialogTitle>
          <DialogDescription>
            {t('journalDialog.description')}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Textarea
            placeholder={t('journalDialog.placeholder')}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={6}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            {t('journalDialog.cancel')}
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? t('journalDialog.saving') : t('journalDialog.save')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
