'use client';
import { libraryItems } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, FileWarning, Timer, Bookmark, Save, Info, Crown, Sparkles, MessageCircle, NotebookPen, PlusCircle } from 'lucide-react';
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

// Firebase and component imports
import { useFirestore } from '@/firebase';
import { addDoc, collection, serverTimestamp, updateDoc } from 'firebase/firestore';
import { ReflectionDialog } from '@/components/library/reflection-dialog';
import { useTranslation } from '@/components/providers/language-provider';
import { ChatWithBookDialog } from '@/components/library/chat-with-book-dialog';

const FIVE_MINUTES_IN_SECONDS = 300;

export default function BookPage() {
  const params = useParams();
  const { id } = params;
  const { toast } = useToast();
  const { isPro, isLoading: isUserLoading, user } = useUserProfile();
  const firestore = useFirestore();
  const { t } = useTranslation();

  const [duration, setDuration] = useState(FIVE_MINUTES_IN_SECONDS);
  const [time, setTime] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [bookmarkedPage, setBookmarkedPage] = useState<number | null>(null);
  const [pageInput, setPageInput] = useState('');
  const [showExitAlert, setShowExitAlert] = useState(false);

  // State for reflection dialog
  const [isReflectionDialogOpen, setIsReflectionDialogOpen] = useState(false);
  const [completedSessionDuration, setCompletedSessionDuration] = useState(0);
  const [isSavingReflection, setIsSavingReflection] = useState(false);

  // State for chat dialog
  const [isChatOpen, setIsChatOpen] = useState(false);

  const item = libraryItems.find((i) => i.id === id);
  const image = PlaceHolderImages.find((img) => img.id === item?.imageId);
  const isPremium = item?.isPremium ?? false;

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

  useEffect(() => {
    setTime(duration);
    setIsRunning(false);
  }, [duration]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0 && isRunning) {
      setIsRunning(false);
      toast({
        title: t('book.sessionComplete.toast.title'),
        description: t('book.sessionComplete.toast.description', { duration: duration / 60 }),
      });
      
      setCompletedSessionDuration(duration);
      setIsReflectionDialogOpen(true); // Open the unified reflection dialog

      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, time, toast, duration, t]);

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

  useEffect(() => {
    if (item) {
      const savedPage = localStorage.getItem(`bookmark-${item.id}`);
      if (savedPage !== null) {
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
      addCurrentBookToInProgress();
      toast({
        title: t('book.bookmark.toast.saved.title'),
        description: t('book.bookmark.toast.saved.description', { page: pageNum }),
      });
    }
  };
  
  const handleToggleTimer = () => {
    if (isRunning) {
        setIsRunning(false);
    } else {
        addCurrentBookToInProgress();
        setIsRunning(true);
        // Omitted toast notifications for brevity
    }
  };

  const handleResetTimer = () => {
      setIsRunning(false);
      setTime(duration);
      toast({
        title: t('book.timer.toast.reset.title'),
        description: t('book.timer.toast.reset.description'),
      });
  };

  const handleConfirmStopAndExit = () => {
      setIsRunning(false);
      setTime(duration);
      setShowExitAlert(false);
      toast({
        variant: "destructive",
        title: t('book.exitAlert.toast.stopped.title'),
        description: t('book.exitAlert.toast.stopped.description'),
      });
  }

  const handleSaveReflection = async (highlightedText: string, reflectionText: string) => {
    if (!user || !item) return;

    if (!reflectionText.trim() && !highlightedText.trim()) {
        toast({
            variant: 'destructive',
            title: t('reflectionDialog.toast.empty.title'),
            description: t('reflectionDialog.toast.empty.description'),
        });
        return;
    }
    
    addCurrentBookToInProgress();
    setIsSavingReflection(true);
    try {
        const reflectionsRef = collection(firestore, 'users', user.uid, 'readingReflections');
        const docRef = await addDoc(reflectionsRef, {
            userId: user.uid,
            bookId: item.id,
            bookTitle: item.title,
            highlightedText: highlightedText,
            reflectionText: reflectionText,
            createdAt: serverTimestamp(),
            duration: completedSessionDuration, // Will be 0 if not from a timer session
        });

        await updateDoc(docRef, { id: docRef.id });

        toast({
            title: t('reflectionDialog.toast.saved.title'),
            description: t('reflectionDialog.toast.saved.description'),
        });
        setIsReflectionDialogOpen(false);
        setCompletedSessionDuration(0); // Reset after saving
    } catch (error) {
        console.error("Error saving reflection:", error);
        toast({
            variant: 'destructive',
            title: t('reflectionDialog.toast.error.title'),
            description: t('reflectionDialog.toast.error.description'),
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
      <ChatWithBookDialog
        open={isChatOpen}
        onOpenChange={setIsChatOpen}
        bookTitle={item.title}
      />
      <div className="space-y-8 h-full flex flex-col">
        <AlertDialog open={showExitAlert} onOpenChange={setShowExitAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t('book.exitAlert.title')}</AlertDialogTitle>
              <AlertDialogDescription>{t('book.exitAlert.description')}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button variant="outline" onClick={() => setShowExitAlert(false)}>{t('book.exitAlert.cancel')}</Button>
              <AlertDialogAction asChild>
                  <Button variant="destructive" onClick={handleConfirmStopAndExit}>{t('book.exitAlert.confirm')}</Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button asChild variant="ghost" className="pl-0 self-start">
          <Link href="/library">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('book.back')}
          </Link>
        </Button>

        <div className="grid md:grid-cols-5 gap-8 flex-grow">
          <div className="md:col-span-2">
            <div className="sticky top-24 space-y-6">
              <Card className="overflow-hidden group">
                <CardContent className="p-0">
                  <div className="relative aspect-[2/3] w-full">
                    <Image src={image.imageUrl} alt={item.title} fill className="object-cover" />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4">
                <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl font-headline mb-1">{item.title}</h1>
                <p className="text-lg text-muted-foreground">{item.author}</p>
              </div>
              
              <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2"><NotebookPen className="text-accent" /> {t('book.reflection.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{t('book.reflection.description')}</p>
                    <Button className="w-full" onClick={() => setIsReflectionDialogOpen(true)}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        {t('book.reflection.button')}
                    </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2"><Sparkles className="text-accent" /> {t('book.chat.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{t('book.chat.description')}</p>
                    <Button className="w-full" onClick={() => setIsChatOpen(true)}>
                        <MessageCircle className="mr-2 h-4 w-4" />
                        {t('book.chat.button')}
                    </Button>
                </CardContent>
              </Card>

              <Card>
                  <CardContent className="p-4 space-y-4">
                    <div className='space-y-3'>
                      <h3 className="font-semibold flex items-center gap-2"><Timer className="w-5 h-5"/> {t('book.timer.title')}</h3>
                      <p className="text-sm text-muted-foreground flex items-start gap-2"><Info className="w-4 h-4 mt-0.5 shrink-0"/>{t('book.timer.description')}</p>
                      <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">{t('book.timer.duration')}</p>
                          <Select value={String(duration)} onValueChange={(value) => setDuration(Number(value))} disabled={isRunning}>
                              <SelectTrigger className="w-[120px]"><SelectValue placeholder="Duración" /></SelectTrigger>
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
                            <Button onClick={handleToggleTimer} size="sm" disabled={time === 0}>{isRunning ? t('book.timer.pause') : time === duration ? t('book.timer.start') : t('book.timer.resume')}</Button>
                            <Button onClick={handleResetTimer} variant="outline" size="sm">{t('book.timer.reset')}</Button> 
                          </div>
                      </div>
                      <Progress value={progressValue} className="w-full h-2" />
                    </div>
                    <div className='space-y-2'>
                      <h3 className="font-semibold flex items-center gap-2"><Bookmark className="w-5 h-5"/> {t('book.bookmark.title')}</h3>
                      {bookmarkedPage !== null && (<p className="text-sm text-muted-foreground">{t('book.bookmark.lastPage')} <span className="font-bold text-primary">{bookmarkedPage}</span></p>)}
                      <div className="flex items-center gap-2">
                          <Input type="number" placeholder={t('book.bookmark.placeholder')} className="max-w-[100px]" value={pageInput} onChange={(e) => setPageInput(e.target.value)} disabled={isRunning} />
                          <Button onClick={handleSaveBookmark} size="icon" aria-label={t('book.bookmark.save')} disabled={isRunning}><Save className="h-4 w-4"/></Button>
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
                <iframe src={item.pdfUrl} className={cn("w-full h-full min-h-[90vh] rounded-lg border")} title={`Visor de PDF para ${item.title}`} />
              ) : (
                <div className="flex flex-col items-center justify-center h-full min-h-[50vh] text-center bg-card rounded-lg p-8">
                    <FileWarning className="w-16 h-16 text-muted-foreground mb-4" />
                    <h2 className="text-xl font-semibold text-foreground">{t('book.pdfError.title')}</h2>
                    <p className="text-muted-foreground mt-2 max-w-md">{t('book.pdfError.description')}</p>
                </div>
              )
            ) : (
              <Card className="flex flex-col items-center justify-center h-full min-h-[50vh] text-center bg-card rounded-lg p-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 justify-center text-accent"><Crown className="w-8 h-8"/> {t('book.pro.title')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-lg text-foreground max-w-md">{t('book.pro.description')}</p>
                  <p className="text-muted-foreground max-w-md">{t('book.pro.cta')}</p>
                  <Button size="lg" asChild className="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Link href="/pro"><Sparkles className="mr-2 h-5 w-5"/> {t('book.pro.button')}</Link>
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
