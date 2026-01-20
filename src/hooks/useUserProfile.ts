'use client';
import { useUser, useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

// Define the shape of the user profile document from Firestore
interface UserProfile {
  id: string;
  email: string;
  createdAt: string;
  role: 'free' | 'pro';
}

export function useUserProfile() {
  const { user, isUserLoading: isAuthLoading, userError: authError } = useUser();
  const firestore = useFirestore();

  const userDocRef = useMemoFirebase(
    () => (user ? doc(firestore, 'users', user.uid) : null),
    [firestore, user]
  );

  const { data: profile, isLoading: isProfileLoading, error: profileError } = useDoc<UserProfile>(userDocRef);

  return {
    user, // The Firebase Auth user object
    profile, // The user profile data from Firestore
    isLoading: isAuthLoading || isProfileLoading,
    error: authError || profileError,
    isPro: profile?.role === 'pro',
  };
}
