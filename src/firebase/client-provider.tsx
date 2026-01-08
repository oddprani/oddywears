'use client';

import {useEffect, useState} from 'react';

import {FirebaseProvider, type FirebaseProviderProps, initializeFirebase} from '.';

export function FirebaseClientProvider(
  props: Omit<FirebaseProviderProps, 'firebaseApp' | 'auth' | 'firestore'>
) {
  const [firebase, setFirebase] = useState<ReturnType<
    typeof initializeFirebase
  > | null>(null);

  useEffect(() => {
    const {firebaseApp, auth, firestore} = initializeFirebase();

    setFirebase({
      firebaseApp,
      auth,
      firestore,
    });
  }, []);

  if (!firebase) {
    // Show a loading screen until Firebase is initialized.
    // This can be customized as needed.
    return null;
  }

  return (
    <FirebaseProvider
      firebaseApp={firebase.firebaseApp}
      auth={firebase.auth}
      firestore={firebase.firestore}
    >
      {props.children}
    </FirebaseProvider>
  );
}
