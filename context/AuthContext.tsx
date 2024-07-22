'use client';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  FC,
  SetStateAction,
  Dispatch,
} from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  login: (login: string, password: string) => Promise<void>;
  checkUserLoggedIn: () => Promise<void>;
  logout: () => Promise<void>;
}

interface User {
  id: number;
  login: string;
  created_at: string;
  updated_at: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    const token = localStorage.getItem('access_token');

    if (token) {
      try {
        const res = await axios.post(
          'https://extra.turkmentv.gov.tm/api/auth/me',
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setUser(res.data);
        router.push('/sms/dashboard');
      } catch (error) {
        await refreshAccessToken();
      }
    } else {
      router.push('/sms/sign_up');
    }
  };

  const login = async (login: string, password: string) => {
    try {
      const res = await axios.post('https://extra.turkmentv.gov.tm/api/auth/login', {
        login: login,
        password: password,
      });
      localStorage.setItem('access_token', res.data.access_token);
      setUser(res.data);
      router.push('/sms/dashboard');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const refreshAccessToken = async () => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const res = await axios.post(
          'https://extra.turkmentv.gov.tm/api/auth/refresh',
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        localStorage.setItem('access_token', res.data.access_token);
        const meRes = await axios.post(
          'https://extra.turkmentv.gov.tm/api/auth/me',
          {},
          {
            headers: { Authorization: `Bearer ${res.data.access_token}` },
          },
        );
        setUser(meRes.data);
      } catch (error) {
        localStorage.removeItem('access_token');
        setUser(null);
        router.push('/sms/sign_up');
      }
    }
  };

  const logout = async () => {
    const token = localStorage.getItem('access_token');
    if (token) {
      await axios.post(
        'https://extra.turkmentv.gov.tm/api/auth/logout',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      localStorage.removeItem('access_token');
      setUser(null);
      router.push('/sms/sign_up');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, checkUserLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
