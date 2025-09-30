'use client';
import { useState, useEffect, createContext, useContext } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  bio?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role?: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await fetch('/api/users', {
            headers: { Authorization: `Bearer ${token}` },
          });
          
          if (response.ok) {
            const userData = await response.json();
            if (userData.id) {
              setUser(userData);
            }
          } else {
            localStorage.removeItem('token');
          }
        }
      } catch (error) {
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { token, user } = await response.json();
        localStorage.setItem('token', token);
        setUser(user);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const register = async (name: string, email: string, password: string, role = 'user') => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });

      if (response.ok) {
        const { token, user } = await response.json();
        localStorage.setItem('token', token);
        setUser(user);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = { user, login, register, logout, loading };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};