import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  type User,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

interface UserData {
  uid: string;
  email: string | null;
  name: string | null;
  photoURL?: string | null;
  provider?: string;
  isAdmin: boolean;
  createdAt: Date | any;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Admin email
const ADMIN_EMAIL = 'sac280422@gmail.com';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

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
              isAdmin: user.email === ADMIN_EMAIL,
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
      isAdmin: email === ADMIN_EMAIL,
      createdAt: serverTimestamp()
    };

    await setDoc(doc(db, 'users', user.uid), userData, { merge: true });
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    const { user } = await signInWithPopup(auth, provider);

    // Ensure user doc exists so Google sign-ins show up in admin dashboard
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      const userData: UserData = {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
        provider: 'google.com',
        isAdmin: user.email === ADMIN_EMAIL,
        createdAt: serverTimestamp()
      };
      await setDoc(userRef, userData, { merge: true });
    } else {
      // Sync latest profile fields from Google
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

  const logout = async () => {
    await signOut(auth);
  };

  const value: AuthContextType = {
    user,
    userData,
    loading,
    login,
    signup,
    loginWithGoogle,
    logout,
    isAdmin: userData?.isAdmin || false
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
