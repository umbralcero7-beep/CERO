'use client';

import { useState, useEffect } from 'react';
import {
  query,
  collection,
  onSnapshot,
  DocumentData,
  FirestoreError,
  QuerySnapshot,
  QueryConstraint,
} from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export type WithId<T> = T & { id: string };

export interface UseCollectionResult<T> {
  data: WithId<T>[] | null;
  isLoading: boolean;
  error: FirestoreError | Error | null;
}

export function useCollection<T = any>(
  collectionName: string | null | undefined,
  constraints: QueryConstraint[] | null | undefined
): UseCollectionResult<T> {
  const [data, setData] = useState<WithId<T>[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<FirestoreError | Error | null>(null);
  const db = useFirestore();

  const constraintsJSON = JSON.stringify(constraints);

  useEffect(() => {
    if (!db) {
      setIsLoading(false);
      return;
    }

    // Validación para asegurar que collectionName es un string válido
    if (typeof collectionName !== 'string') {
      if (collectionName !== null && collectionName !== undefined) {
        console.warn("useCollection: collectionName no es un string válido", collectionName);
      }
      setData(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const colRef = collection(db, collectionName);
      const safeConstraints = constraints || [];
      const q = query(colRef, ...safeConstraints);

      const unsubscribe = onSnapshot(
        q,
        (snapshot: QuerySnapshot<DocumentData>) => {
          const results: WithId<T>[] = [];
          snapshot.forEach((doc) => {
            results.push({ ...(doc.data() as T), id: doc.id });
          });
          setData(results);
          setError(null);
          setIsLoading(false);
        },
        (err: FirestoreError) => {
          console.error(`Firestore error on collection '${collectionName}':`, err);
          const contextualError = new FirestorePermissionError({
            operation: 'list',
            path: collectionName,
          });
          setError(contextualError);
          setData(null);
          setIsLoading(false);
          errorEmitter.emit('permission-error', contextualError);
        }
      );

      return () => unsubscribe();
    } catch (e: any) {
        console.error("Error setting up collection listener:", e);
        setError(e);
        setIsLoading(false);
    }

  }, [collectionName, constraintsJSON, db]);

  return { data, isLoading, error };
}
