import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  type User,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  sendPasswordResetEmail
} from 'firebase/auth';
import { collection, doc, getDoc, getDocs, query, where, limit, setDoc, serverTimestamp, type FieldValue } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { getErrorCode } from '@/lib/utils';
import type { FirestoreTimestamp } from '@/types';

interface UserData {
  uid: string;
  email: string | null;
  name: string | null;
  photoURL?: string | null;
  provider?: string;
  isAdmin: boolean;
  createdAt: Date | FirestoreTimestamp | FieldValue;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  isAdmin: boolean;
  isAffiliate: boolean;
  affiliateCode: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin emails
const ADMIN_EMAILS = ['sac280422@gmail.com', 'artisandevang1234@gmail.com'];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [affiliateCode, setAffiliateCode] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const existing = userDoc.data() as UserData;
            // Keep Firestore record in sync with latest auth profile (esp. Google sign-in)
            const updates: Partial<UserData> = {};
            if (user.email && existing.email !== user.email) updates.email = user.email;
            if (user.displayName && existing.name !== user.displayName) updates.name = user.displayName;
            if (user.photoURL && existing.photoURL !== user.photoURL) updates.photoURL = user.photoURL;
            if (Object.keys(updates).length > 0) {
              await setDoc(userRef, updates, { merge: true });
            }
            setUserData({ ...existing, ...updates });
          } else {
            const providerId = user.providerData[0]?.providerId || 'password';
            const newUserData: UserData = {
              uid: user.uid,
              email: user.email,
              name: user.displayName,
              photoURL: user.photoURL,
              provider: providerId,
              isAdmin: ADMIN_EMAILS.includes(user.email || ''),
              createdAt: serverTimestamp()
            };
            await setDoc(userRef, newUserData);
            setUserData({ ...newUserData, createdAt: new Date() });
          }
        } catch (err) {
          console.error('Failed to sync user profile:', err);
        }
      } else {
        setUserData(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Detect whether the signed-in user is an affiliate (has an active code)
  useEffect(() => {
    let cancelled = false;
    if (!user?.email) {
      setAffiliateCode(null);
      return;
    }
    getDocs(query(
      collection(db, 'affiliateCodes'),
      where('email', '==', user.email),
      where('active', '==', true),
      limit(1),
    ))
      .then((snap) => {
        if (cancelled) return;
        setAffiliateCode(snap.empty ? null : (snap.docs[0].data().code as string) || snap.docs[0].id);
      })
      .catch((err) => {
        console.error('Affiliate lookup failed:', err);
        if (!cancelled) setAffiliateCode(null);
      });
    return () => { cancelled = true; };
  }, [user?.email]);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signup = async (email: string, password: string, name: string) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    const userData: UserData = {
      uid: user.uid,
      email: user.email,
      name,
      provider: 'password',
      isAdmin: ADMIN_EMAILS.includes(email),
      createdAt: serverTimestamp()
    };

    await setDoc(doc(db, 'users', user.uid), userData, { merge: true });
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    provider.addScope('email');
    provider.addScope('profile');

    try {
      // Try popup first (better UX on desktop)
      const { user } = await signInWithPopup(auth, provider);
      await syncGoogleUser(user);
    } catch (popupErr) {
      // Fallback to redirect on mobile or if popup blocked
      const code = getErrorCode(popupErr);
      if (code === 'auth/popup-blocked' || code === 'auth/cancelled-popup-request') {
        await signInWithRedirect(auth, provider);
      } else {
        throw popupErr;
      }
    }
  };

  const syncGoogleUser = async (user: User) => {
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      const userData: UserData = {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
        provider: 'google.com',
        isAdmin: ADMIN_EMAILS.includes(user.email || ''),
        createdAt: serverTimestamp()
      };
      await setDoc(userRef, userData, { merge: true });
    } else {
      await setDoc(
        userRef,
        {
          email: user.email,
          name: user.displayName,
          photoURL: user.photoURL,
          provider: 'google.com'
        },
        { merge: true }
      );
    }
  };

  // Handle redirect result on app load
  useEffect(() => {
    getRedirectResult(auth).then((result) => {
      if (result?.user) {
        syncGoogleUser(result.user);
      }
    }).catch((err) => {
      console.error('Google redirect sign-in error:', err);
    });
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const value: AuthContextType = {
    user,
    userData,
    loading,
    login,
    signup,
    loginWithGoogle,
    logout,
    resetPassword,
    isAdmin: userData?.isAdmin || false,
    isAffiliate: !!affiliateCode,
    affiliateCode,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
