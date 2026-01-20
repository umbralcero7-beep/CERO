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

interface ReflectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (reflectionText: string) => void;
  bookTitle: string;
  loading: boolean;
}

export function ReflectionDialog({ open, onOpenChange, onSave, bookTitle, loading }: ReflectionDialogProps) {
  const [reflection, setReflection] = useState("");

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
          <DialogTitle>Reflexión sobre "{bookTitle}"</DialogTitle>
          <DialogDescription>
            ¡Sesión completada! Tómate un momento para anotar tus pensamientos sobre lo que acabas de leer.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Textarea
            placeholder="¿Qué ideas resonaron contigo? ¿Qué aprendiste? ¿Cómo te sientes?"
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            rows={6}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            Omitir
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Guardando..." : "Guardar Reflexión"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
