'use client';

import {createContext, useContext, type ReactNode} from 'react';
import type {Auth} from 'firebase/auth';
import type {FirebaseApp} from 'firebase/app';
import type {Firestore} from 'firebase/firestore';

export interface FirebaseProviderProps {
  children: ReactNode;
  firebaseApp: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
}

const FirebaseContext = createContext<
  | {
      firebaseApp: FirebaseApp;
      auth: Auth;
      firestore: Firestore;
    }
  | undefined
>(undefined);

export function FirebaseProvider(props: FirebaseProviderProps) {
  const {firebaseApp, auth, firestore, children} = props;

  return (
    <FirebaseContext.Provider value={{firebaseApp, auth, firestore}}>
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
}

export function useFirebaseApp() {
  const {firebaseApp} = useFirebase();
  return firebaseApp;
}

export function useFirestore() {
  const {firestore} = useFirebase();
  return firestore;
}

export function useAuth() {
  const {auth} = useFirebase();
  return auth;
}
