'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import { getStorage, type Storage } from 'firebase/storage';

// IMPORTANT: DO NOT MODIFY THIS FUNCTION
export function initializeFirebase() {
  if (getApps().length) {
    return getSdks(getApp());
  }

  // Important! initializeApp() is called without any arguments because Firebase App Hosting
  // integrates with the initializeApp() function to provide the environment variables needed to
  // populate the FirebaseOptions in production. It is critical that we attempt to call initializeApp()
  // without arguments.
  let firebaseApp;
  try {
    // Attempt to initialize via Firebase App Hosting environment variables
    firebaseApp = initializeApp();
  } catch (e) {
    // Only warn in production because it's normal to use the firebaseConfig to initialize
    // during development
    if (process.env.NODE_ENV === "production") {
      console.warn('Automatic initialization failed. Falling back to firebase config object.', e);
    }
    
    // Fallback for local development or other environments
    if (!firebaseConfig.apiKey) {
      throw new Error("Firebase API key is missing. Please provide it in your .env file as NEXT_PUBLIC_FIREBASE_API_KEY.");
    }
    firebaseApp = initializeApp(firebaseConfig);
  }

  return getSdks(firebaseApp);
}

let auth: Auth | null = null;
let firestore: Firestore | null = null;
let storage: Storage | null = null;

export function getSdks(firebaseApp: FirebaseApp) {
  if (!auth) {
    auth = getAuth(firebaseApp);
  }

  if (!firestore) {
    firestore = getFirestore(firebaseApp);
  }

  if (!storage) {
    storage = getStorage(firebaseApp);
  }

  return {
    firebaseApp,
    auth,
    firestore,
    storage,
  };
}


export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
export * from '../hooks/useUserProfile';
