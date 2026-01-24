
import { libraryItems } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { notFound } from 'next/navigation';
import BookPageClient from './book-page-client';

export async function generateStaticParams() {
  return libraryItems.map((item) => ({ 
    id: item.id, 
  }));
}

export default function BookPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const item = libraryItems.find((i) => i.id === id);
  const image = PlaceHolderImages.find((img) => img.id === item?.imageId);

  if (!item || !image) {
    notFound();
  }

  return <BookPageClient item={item} image={image} />;
}
