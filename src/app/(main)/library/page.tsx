'use client';
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ContentGrid } from "@/components/library/content-grid";
import { Button } from "@/components/ui/button";
import { libraryItems } from "@/lib/data";
import type { LibraryItem } from "@/lib/data";

export default function LibraryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredItems = libraryItems.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !activeCategory || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(libraryItems.map(item => item.category))];

  const handleCategoryClick = (category: string) => {
    if (activeCategory === category) {
      setActiveCategory(null); // Deselect if already active
    } else {
      setActiveCategory(category);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl font-headline">
          Librería Emocional
        </h2>
        <p className="mt-2 text-muted-foreground">
          Un refugio digital con contenido curado para nutrir cada estado emocional.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Buscar por título o autor..." 
            className="pl-10" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
            {categories.map(category => (
                 <Button 
                    key={category} 
                    variant={activeCategory === category ? 'default' : 'outline'}
                    onClick={() => handleCategoryClick(category)}
                >
                    {category}
                </Button>
            ))}
        </div>
      </div>
      <ContentGrid items={filteredItems} />
    </div>
  );
}
