'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { libraryItems, type LibraryItem } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from '../providers/language-provider';

export function InProgressSection() {
  const [inProgressItems, setInProgressItems] = useState<LibraryItem[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    try {
      const storedIds = JSON.parse(localStorage.getItem('in-progress-books') || '[]');
      const idSet = new Set<string>(storedIds);
      const items = libraryItems.filter(item => idSet.has(item.id));
      setInProgressItems(items);
    } catch (e) {
      console.error("Failed to load in-progress books:", e);
      setInProgressItems([]);
    }
  }, []);

  if (inProgressItems.length === 0) {
    return null; // Don't render anything if there are no in-progress books
  }
  
  const getImage = (imageId: string) => {
    return PlaceHolderImages.find(img => img.id === imageId);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl font-headline">
          {t('library.inProgress')}
        </h3>
        <Link href="#all-books" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
          {t('library.viewAll')} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <Carousel opts={{ align: "start", loop: false }}>
        <CarouselContent className="-ml-4">
          {inProgressItems.map(item => {
            const image = getImage(item.imageId);
            return (
              <CarouselItem key={item.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 pl-4">
                <Link href={`/library/${item.id}`} className="group">
                  <Card className="overflow-hidden h-full transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <CardContent className="p-0 flex flex-col h-full">
                      <div className="relative aspect-[2/3] w-full">
                        {image && (
                          <Image
                            src={image.imageUrl}
                            alt={item.title}
                            fill
                            className="object-cover"
                            data-ai-hint={image.imageHint}
                          />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                   <p className="text-sm font-medium mt-2 truncate group-hover:text-primary">{item.title}</p>
                   <p className="text-xs text-muted-foreground truncate">{item.author}</p>
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
}
