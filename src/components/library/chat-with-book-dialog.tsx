"use client";
import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslation } from "../providers/language-provider";
import { Bot, User as UserIcon, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { chatWithBook } from "@/ai/flows/chat-with-book";
import { Avatar, AvatarFallback } from "../ui/avatar";

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

interface ChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookTitle: string;
}

export function ChatWithBookDialog({ open, onOpenChange, bookTitle }: ChatDialogProps) {
  const { t, locale } = useTranslation();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);
  
  useEffect(() => {
    // Reset chat when dialog is opened
    if (open) {
      setMessages([]);
      setInput("");
      setLoading(false);
    }
  }, [open]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await chatWithBook({
        bookTitle: bookTitle,
        chatHistory: messages,
        userQuestion: input,
        userLocale: locale
      });

      const modelMessage: ChatMessage = { role: 'model', content: response };
      setMessages(prev => [...prev, modelMessage]);

    } catch (error) {
      console.error("Error chatting with book:", error);
      const errorMessage: ChatMessage = {
        role: 'model',
        content: locale === 'es' ? "Lo siento, ocurrió un error al procesar tu solicitud." : "I'm sorry, an error occurred while processing your request."
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>{t('chatWithBookDialog.title', { title: bookTitle })}</DialogTitle>
          <DialogDescription>
            {t('chatWithBookDialog.description')}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-grow pr-4 -mr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-3",
                  message.role === 'user' ? "justify-end" : ""
                )}
              >
                {message.role === 'model' && (
                  <Avatar className="w-8 h-8 bg-primary text-primary-foreground">
                    <AvatarFallback><Bot className="w-5 h-5"/></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "rounded-2xl p-3 max-w-lg",
                    message.role === 'user'
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-muted rounded-bl-none"
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                 {message.role === 'user' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback><UserIcon className="w-5 h-5"/></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {loading && (
                 <div className="flex items-start gap-3">
                    <Avatar className="w-8 h-8 bg-primary text-primary-foreground">
                      <AvatarFallback><Bot className="w-5 h-5"/></AvatarFallback>
                    </Avatar>
                    <div className="rounded-2xl p-3 max-w-sm bg-muted rounded-bl-none flex items-center gap-2">
                        <span className="h-2 w-2 bg-foreground/50 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                        <span className="h-2 w-2 bg-foreground/50 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                        <span className="h-2 w-2 bg-foreground/50 rounded-full animate-pulse"></span>
                    </div>
                 </div>
            )}
          </div>
        </ScrollArea>
        <div className="flex items-center gap-2 pt-4">
          <Input
            placeholder={t('chatWithBookDialog.placeholder')}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={loading}
          />
          <Button onClick={handleSend} disabled={loading}>
            <Send className="w-4 h-4" />
            <span className="sr-only">{t('chatWithBookDialog.send')}</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
