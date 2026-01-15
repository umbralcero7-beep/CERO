
'use client';
import { libraryItems } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, FileWarning, Timer, Bookmark, Save, Info } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { cn } from '@/lib/utils';

const FIVE_MINUTES_IN_SECONDS = 300;

export default function BookPage() {
  const params = useParams();
  const { id } = params;
  const { toast } = useToast();

  const [time, setTime] = useState(FIVE_MINUTES_IN_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const [bookmarkedPage, setBookmarkedPage] = useState<number | null>(null);
  const [pageInput, setPageInput] = useState('');
  const [showExitAlert, setShowExitAlert] = useState(false);

  const item = libraryItems.find((i) => i.id === id);
  const image = PlaceHolderImages.find((img) => img.id === item?.imageId);

  // Forest-like timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0 && isRunning) {
      setIsRunning(false);
      toast({
        title: "¡Sesión de enfoque completada!",
        description: "Has completado tu sesión de lectura. ¡Buen trabajo!",
      });
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, time, toast]);

  // Handle page exit attempt while timer is running
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isRunning) {
        e.preventDefault();
        e.returnValue = '';
        setShowExitAlert(true);
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isRunning]);

  // Bookmark logic
  useEffect(() => {
    if (item) {
      const savedPage = localStorage.getItem(`bookmark-${item.id}`);
      if (savedPage) {
        setBookmarkedPage(Number(savedPage));
        setPageInput(savedPage);
      }
    }
  }, [item]);

  const handleSaveBookmark = () => {
    if (item && pageInput) {
      const pageNum = Number(pageInput);
      localStorage.setItem(`bookmark-${item.id}`, String(pageNum));
      setBookmarkedPage(pageNum);
      toast({
        title: 'Página guardada',
        description: `Has guardado la página ${pageNum} para este libro.`,
      });
    }
  };
  
  const handleStartFocus = () => {
    if (isRunning) { // Pausing
        setIsRunning(false);
    } else { // Starting
        setIsRunning(true);
        if (bookmarkedPage) {
            toast({
                title: "Sugerencia de Lectura",
                description: `La última vez te quedaste en la página ${bookmarkedPage}. ¿Por qué no continúas desde ahí?`,
            });
        } else {
             toast({
                title: "¡A leer!",
                description: "Que tengas una excelente sesión de lectura.",
            });
        }
    }
  };

  const handleStopFocus = () => {
      setIsRunning(false);
      setTime(FIVE_MINUTES_IN_SECONDS);
      setShowExitAlert(false);
      toast({
        variant: "destructive",
        title: "Sesión interrumpida",
        description: "Tu sesión de enfoque ha sido cancelada.",
      });
  }

  if (!item || !image) {
    notFound();
  }
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8 h-full flex flex-col">
       <AlertDialog open={showExitAlert} onOpenChange={setShowExitAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Interrumpir sesión de enfoque?</AlertDialogTitle>
            <AlertDialogDescription>
              Si sales ahora, tu progreso en la sesión de enfoque se perderá. ¿Estás seguro de que quieres rendirte?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setShowExitAlert(false)}>
              Continuar Enfocado
            </Button>
            <AlertDialogAction asChild>
                <Button variant="destructive" onClick={handleStopFocus}>
                    Sí, interrumpir
                </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Button asChild variant="ghost" className="pl-0 self-start">
        <Link href="/library">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a la librería
        </Link>
      </Button>

      <div className="grid md:grid-cols-5 gap-8 flex-grow">
        <div className="md:col-span-2">
          <div className="sticky top-24 space-y-6">
            <Card className="overflow-hidden group">
              <CardContent className="p-0">
                <div className="relative aspect-[2/3] w-full">
                  <Image
                    src={image.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover"
                    data-ai-hint={image.imageHint}
                  />
                </div>
              </CardContent>
            </Card>
            <div className="mt-4">
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl font-headline mb-1">
                {item.title}
              </h1>
              <p className="text-lg text-muted-foreground">{item.author}</p>
            </div>
             <Card>
                <CardContent className="p-4 space-y-4">
                   {/* Forest-like Timer */}
                  <div className='space-y-2'>
                    <h3 className="font-semibold flex items-center gap-2"><Timer className="w-5 h-5"/> Sesión de Enfoque</h3>
                     <p className="text-sm text-muted-foreground flex items-start gap-2"><Info className="w-4 h-4 mt-0.5 shrink-0"/>Inicia el temporizador para entrar en modo de lectura profunda sin distracciones.</p>
                    <div className="flex items-center gap-2 justify-between">
                        <p className="text-3xl font-mono font-bold text-primary">{formatTime(time)}</p>
                        <div className="flex gap-2">
                           <Button onClick={handleStartFocus} size="sm" disabled={time === 0}>
                            {isRunning ? 'Pausar' : 'Iniciar'}
                            </Button>
                            <Button onClick={handleStopFocus} variant="outline" size="sm">
                                Detener
                            </Button> 
                        </div>
                    </div>
                    {isRunning && <Progress value={(time / FIVE_MINUTES_IN_SECONDS) * 100} className="w-full h-2" />}
                  </div>
                   {/* Bookmark */}
                  <div className='space-y-2'>
                     <h3 className="font-semibold flex items-center gap-2"><Bookmark className="w-5 h-5"/> Marcador de página</h3>
                     {bookmarkedPage && (
                        <p className="text-sm text-muted-foreground">
                            Última página guardada: <span className="font-bold text-primary">{bookmarkedPage}</span>
                        </p>
                     )}
                     <div className="flex items-center gap-2">
                        <Input 
                            type="number" 
                            placeholder="Página" 
                            className="max-w-[100px]"
                            value={pageInput}
                            onChange={(e) => setPageInput(e.target.value)}
                            disabled={isRunning}
                        />
                        <Button onClick={handleSaveBookmark} size="icon" aria-label="Guardar página" disabled={isRunning}>
                            <Save className="h-4 w-4"/>
                        </Button>
                     </div>
                  </div>
                </CardContent>
            </Card>
          </div>
        </div>

        <div className="md:col-span-3 h-full">
          {item.pdfUrl ? (
            <iframe
              src={item.pdfUrl}
              className={cn("w-full h-full min-h-[90vh] rounded-lg border", isRunning && "pointer-events-none")}
              title={`Visor de PDF para ${item.title}`}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[50vh] text-center bg-card rounded-lg p-8">
                <FileWarning className="w-16 h-16 text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold text-foreground">Contenido no disponible</h2>
                <p className="text-muted-foreground mt-2 max-w-md">
                    Este libro todavía no tiene un archivo PDF asociado. Vuelve a intentarlo más tarde.
                </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
