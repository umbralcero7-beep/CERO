
/**
 * @fileoverview This file contains the Firebase Firestore functions for managing Reading Reflections.
 * It provides an abstraction layer for creating, retrieving, updating, and deleting reflection data.
 */

import { firestore } from '@/lib/firebase/firebase';
import { ReadingReflection, ReadingReflectionSchema } from '@/models/reading-reflection';
import {
  collection,
  doc,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';

const getReadingReflectionsCollection = (userId: string) => {
  return collection(firestore, 'users', userId, 'readingReflections');
};

/**
 * Creates a new reading reflection for a user.
 * @param userId - The ID of the user.
 * @param reflectionData - The data for the new reflection.
 * @returns The ID of the newly created reflection.
 */
export const createReadingReflection = async (
  userId: string,
  reflectionData: Omit<ReadingReflection, 'id' | 'createdAt'>
): Promise<string> => {
  try {
    const reflectionsCollection = getReadingReflectionsCollection(userId);
    const docRef = await addDoc(reflectionsCollection, {
      ...reflectionData,
      createdAt: serverTimestamp(), // Let Firestore set the timestamp
    });
    // Update the document to include its own ID
    await updateDoc(docRef, { id: docRef.id });
    return docRef.id;
  } catch (error) {
    console.error('Error creating reading reflection:', error);
    throw new Error('Failed to create reading reflection.');
  }
};

/**
 * Retrieves all reading reflections for a specific book by a user.
 * @param userId - The ID of the user.
 * @param bookId - The ID of the book.
 * @returns An array of reading reflections.
 */
export const getReadingReflectionsForBook = async (
  userId: string,
  bookId: string
): Promise<ReadingReflection[]> => {
  try {
    const reflectionsCollection = getReadingReflectionsCollection(userId);
    const q = query(reflectionsCollection, where('bookId', '==', bookId));
    const querySnapshot = await getDocs(q);
    
    const reflections = querySnapshot.docs.map(doc => {
      const data = doc.data();
      // Validate and parse data with Zod schema
      return ReadingReflectionSchema.parse({
        ...data,
        id: doc.id,
        createdAt: data.createdAt.toDate(), // Convert Firestore Timestamp to Date
      });
    });

    return reflections;
  } catch (error) {
    console.error('Error retrieving reading reflections for book:', error);
    throw new Error('Failed to retrieve reading reflections.');
  }
};
