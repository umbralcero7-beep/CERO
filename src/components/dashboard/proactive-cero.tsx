'use client';

import { useCollection } from '@/firebase/firestore/use-collection';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Lightbulb } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { limit, orderBy } from 'firebase/firestore';

interface ProactiveMessage {
    shouldDisplay: boolean;
    message: string;
}

export function ProactiveCero() {
    const { user, isLoading: isUserLoading } = useUserProfile();
    
    // Fetch the last 15 mood entries to find patterns
    const { data: moodHistory, isLoading: isHistoryLoading } = useCollection(
        user ? `users/${user.uid}/moodHistory` : null,
        [
            limit(15), 
            orderBy('createdAt', 'desc')
        ]
    );

    const [proactiveMessage, setProactiveMessage] = useState<ProactiveMessage | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check if we already showed a message in the last 24 hours
        const lastShown = localStorage.getItem('proactiveCeroLastShown');
        const now = new Date().getTime();

        if (lastShown && (now - Number(lastShown) < 24 * 60 * 60 * 1000)) {
            setIsLoading(false);
            return;
        }

        if (!isUserLoading && !isHistoryLoading && user && moodHistory && moodHistory.length > 5) {
            const formattedHistory = moodHistory.map(entry => ({
                date: new Date(entry.createdAt.seconds * 1000).toLocaleDateString(),
                mood: entry.mood,
            }));

            fetch('/api/run-flow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ history: formattedHistory, userName: user.displayName || 'there' }),
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`API call failed with status: ${res.status}`);
                }
                return res.json();
            })
            .then(setProactiveMessage)
            .catch(console.error)
            .finally(() => setIsLoading(false));
            
             // Set the timestamp once we've run the flow
             localStorage.setItem('proactiveCeroLastShown', String(now));
        } else if (!isUserLoading && !isHistoryLoading) {
            // Don't show if there isn't enough data
            setIsLoading(false);
        }

    }, [user, moodHistory, isUserLoading, isHistoryLoading]);

    if (isLoading) {
        return <Skeleton className="h-24 w-full" />;
    }

    if (!proactiveMessage || !proactiveMessage.shouldDisplay) {
        return null; // Don't render anything if no message should be displayed
    }

    return (
        <Card className="bg-accent/50 border-accent">
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-accent-foreground">
                    <Lightbulb className="h-6 w-6 text-accent" />
                    <span>A Thought from Cero</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-lg text-accent-foreground/90">
                    {proactiveMessage.message}
                </p>
            </CardContent>
        </Card>
    );
}
