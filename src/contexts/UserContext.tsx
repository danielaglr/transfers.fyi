import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '../../firebase';

interface ContextProps {
  currentUser: User | null;
  signInWithGoogle: () => void;
};

const AuthContext = createContext<ContextProps>({ currentUser: null, signInWithGoogle: () => {} });

export function useAuth() {
  return useContext(AuthContext);
};

interface ProviderProps {
  children: ReactNode;
};

function AuthProvider({ children }: ProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const router = useRouter();

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider).then((result) => {
      router.push('/dashboard');
    }).catch((err) => {
      console.error(err.message, err.code);
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, signInWithGoogle }}>{children}</AuthContext.Provider>
  )
};

export default AuthProvider;