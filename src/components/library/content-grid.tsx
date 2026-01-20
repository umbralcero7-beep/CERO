import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";
import { Mic, FileText, Crown } from "lucide-react";
import type { LibraryItem } from "@/lib/data";

interface ContentGridProps {
  items: LibraryItem[];
}

export function ContentGrid({ items }: ContentGridProps) {
  const getImage = (imageId: string) => {
    return PlaceHolderImages.find(img => img.id === imageId);
  }
  
  if (items.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <p>No se encontraron libros que coincidan con tu búsqueda.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map((item) => {
        const image = getImage(item.imageId);
        return (
          <Link href={`/library/${item.id}`} key={item.id} className="group">
            <Card className="overflow-hidden h-full transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl relative">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-3 right-3 flex gap-2">
                    {item.isPremium && (
                      <Badge className="bg-accent text-accent-foreground border-accent">
                          <Crown className="h-3 w-3 mr-1" />
                          Pro
                      </Badge>
                    )}
                    <Badge variant="secondary">
                      {item.type === 'Audio' ? <Mic className="h-3 w-3 mr-1" /> : <FileText className="h-3 w-3 mr-1" />}
                      {item.type === 'Texto' ? 'Leer' : item.type}
                    </Badge>
                  </div>
                </div>
                <div className="p-4 space-y-1 flex-grow">
                  <h3 className="font-semibold text-lg leading-tight truncate group-hover:text-primary">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.author}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
