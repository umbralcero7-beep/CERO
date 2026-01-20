'use client';
import { libraryItems } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, FileWarning, Timer, Bookmark, Save, Info, Crown, Sparkles } from 'lucide-react';
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
import { useUserProfile } from '@/hooks/useUserProfile';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// New imports
import { useFirestore } from '@/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ReflectionDialog } from '@/components/library/reflection-dialog';


const FIVE_MINUTES_IN_SECONDS = 300;

export default function BookPage() {
  const params = useParams();
  const { id } = params;
  const { toast } = useToast();
  const { isPro, isLoading: isUserLoading, user } = useUserProfile();
  const firestore = useFirestore();

  const [duration, setDuration] = useState(FIVE_MINUTES_IN_SECONDS);
  const [time, setTime] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [bookmarkedPage, setBookmarkedPage] = useState<number | null>(null);
  const [pageInput, setPageInput] = useState('');
  const [showExitAlert, setShowExitAlert] = useState(false);

  // New state for reflection dialog
  const [isReflectionDialogOpen, setIsReflectionDialogOpen] = useState(false);
  const [completedSessionDuration, setCompletedSessionDuration] = useState(0);
  const [isSavingReflection, setIsSavingReflection] = useState(false);

  const item = libraryItems.find((i) => i.id === id);
  const image = PlaceHolderImages.find((img) => img.id === item?.imageId);
  const isPremium = item?.isPremium ?? false;

  // Helper to add current book to the "in progress" list in localStorage
  const addCurrentBookToInProgress = () => {
    if (!item) return;
    try {
        const existingIds: string[] = JSON.parse(localStorage.getItem('in-progress-books') || '[]');
        const idSet = new Set(existingIds);
        if (!idSet.has(item.id)) {
            idSet.add(item.id);
            localStorage.setItem('in-progress-books', JSON.stringify(Array.from(idSet)));
        }
    } catch (error) {
        console.error('Failed to update in-progress books list:', error);
    }
  };

  // Reset time when duration changes
  useEffect(() => {
    setTime(duration);
    setIsRunning(false);
  }, [duration]);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0 && isRunning) {
      setIsRunning(false);
      toast({
        title: "¡Sesión de lectura completada!",
        description: `Has completado una sesión de ${duration / 60} minutos. ¡Buen trabajo!`,
      });
      
      setCompletedSessionDuration(duration);
      setIsReflectionDialogOpen(true);

      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, time, toast, duration]);

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
      if (savedPage !== null) { // Use !== null to handle page "0" correctly
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
      addCurrentBookToInProgress(); // Mark as in progress
      toast({
        title: 'Página guardada',
        description: `Has guardado la página ${pageNum} para este libro.`,
      });
    }
  };
  
  const handleToggleTimer = () => {
    if (isRunning) { // Pausing
        setIsRunning(false);
    } else { // Starting or Resuming
        addCurrentBookToInProgress(); // Mark as in progress
        setIsRunning(true);
        if (time === duration) { // Starting a new session
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
    }
  };

  const handleResetTimer = () => {
      setIsRunning(false);
      setTime(duration);
      toast({
        title: "Temporizador Reiniciado",
        description: "La sesión ha sido reiniciada.",
      });
  };

  const handleConfirmStopAndExit = () => {
      setIsRunning(false);
      setTime(duration);
      setShowExitAlert(false);
      toast({
        variant: "destructive",
        title: "Sesión interrumpida",
        description: "Tu sesión de enfoque ha sido cancelada.",
      });
  }

  const handleSaveReflection = async (reflectionText: string) => {
    if (!user || !item || !reflectionText.trim()) {
        if (!reflectionText.trim()) {
             toast({
                variant: 'destructive',
                title: 'La reflexión está vacía',
                description: 'Por favor, escribe algo antes de guardar.',
            });
        }
        setIsReflectionDialogOpen(false);
        return;
    }
    
    addCurrentBookToInProgress(); // Mark as in progress
    setIsSavingReflection(true);
    try {
        const reflectionsRef = collection(firestore, 'users', user.uid, 'readingReflections');
        await addDoc(reflectionsRef, {
            userId: user.uid,
            bookId: item.id,
            bookTitle: item.title,
            reflection: reflectionText,
            duration: completedSessionDuration,
            timestamp: serverTimestamp(),
        });
        toast({
            title: 'Reflexión Guardada',
            description: 'Tus pensamientos han sido guardados. ¡Sigue así!',
        });
        setIsReflectionDialogOpen(false);
    } catch (error) {
        console.error("Error saving reflection:", error);
        toast({
            variant: 'destructive',
            title: 'Error al Guardar',
            description: 'No se pudo guardar tu reflexión. Por favor, inténtalo de nuevo.',
        });
    } finally {
        setIsSavingReflection(false);
    }
  };


  if (!item || !image) {
    notFound();
  }
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  const canViewContent = !isPremium || (isPremium && isPro);

  const progressValue = duration > 0 ? ((duration - time) / duration) * 100 : 0;

  return (
    <>
      <ReflectionDialog
        open={isReflectionDialogOpen}
        onOpenChange={setIsReflectionDialogOpen}
        onSave={handleSaveReflection}
        bookTitle={item.title}
        loading={isSavingReflection}
      />
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
                  <Button variant="destructive" onClick={handleConfirmStopAndExit}>
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
                    <div className='space-y-3'>
                      <h3 className="font-semibold flex items-center gap-2"><Timer className="w-5 h-5"/> Temporizador de Lectura</h3>
                      <p className="text-sm text-muted-foreground flex items-start gap-2"><Info className="w-4 h-4 mt-0.5 shrink-0"/>Inicia el temporizador para entrar en modo de lectura profunda. El tiempo correrá de forma continua durante tu sesión.</p>
                      <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">Duración:</p>
                          <Select
                              value={String(duration)}
                              onValueChange={(value) => setDuration(Number(value))}
                              disabled={isRunning}
                          >
                              <SelectTrigger className="w-[120px]">
                                  <SelectValue placeholder="Duración" />
                              </SelectTrigger>
                              <SelectContent>
                                  <SelectItem value="300">5 min</SelectItem>
                                  <SelectItem value="900">15 min</SelectItem>
                                  <SelectItem value="1500">25 min</SelectItem>
                                  <SelectItem value="2700">45 min</SelectItem>
                              </SelectContent>
                          </Select>
                      </div>
                      <div className="flex items-center gap-2 justify-between">
                          <p className="text-4xl font-mono font-bold text-primary">{formatTime(time)}</p>
                          <div className="flex gap-2">
                            <Button onClick={handleToggleTimer} size="sm" disabled={time === 0}>
                                  {isRunning ? 'Pausar' : time === duration ? 'Iniciar' : 'Continuar'}
                              </Button>
                              <Button onClick={handleResetTimer} variant="outline" size="sm">
                                  Reiniciar
                              </Button> 
                          </div>
                      </div>
                      <Progress value={progressValue} className="w-full h-2" />
                    </div>
                    <div className='space-y-2'>
                      <h3 className="font-semibold flex items-center gap-2"><Bookmark className="w-5 h-5"/> Marcador de página</h3>
                      {bookmarkedPage !== null && (
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
            {isUserLoading ? (
              <Skeleton className="w-full h-full min-h-[90vh] rounded-lg" />
            ) : canViewContent ? (
              item.pdfUrl ? (
                <iframe
                  src={item.pdfUrl}
                  className={cn("w-full h-full min-h-[90vh] rounded-lg border")}
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
              )
            ) : (
              <Card className="flex flex-col items-center justify-center h-full min-h-[50vh] text-center bg-card rounded-lg p-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 justify-center text-accent">
                    <Crown className="w-8 h-8"/> Contenido Pro
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-lg text-foreground max-w-md">
                    Este libro es parte de nuestra colección Pro.
                  </p>
                  <p className="text-muted-foreground max-w-md">
                    Actualiza tu plan para desbloquear este y cientos de otros recursos para potenciar tu bienestar.
                  </p>
                  <Button size="lg" asChild className="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Link href="/pro">
                      <Sparkles className="mr-2 h-5 w-5"/> Actualizar a Pro
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
