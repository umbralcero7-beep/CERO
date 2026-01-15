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

interface JournalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (notes: string) => void;
  mood: string | null;
  loading: boolean;
}

export function JournalDialog({ open, onOpenChange, onSave, mood, loading }: JournalDialogProps) {
  const [notes, setNotes] = useState("");

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
          <DialogTitle>Diario Emocional: {mood}</DialogTitle>
          <DialogDescription>
            Añade una nota para explorar más a fondo cómo te sientes. ¿Qué ha pasado? ¿Qué pensamientos tienes?
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Textarea
            placeholder="Escribe tus pensamientos aquí..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={6}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={loading}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Guardando..." : "Guardar y Continuar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
