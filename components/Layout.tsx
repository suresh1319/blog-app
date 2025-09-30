'use client';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { useEffect, useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Blog Platform
            </Link>
            <nav className="flex space-x-4 items-center">
              <Link href="/" className="text-gray-600 hover:text-blue-600">
                Home
              </Link>
              {mounted && user ? (
                <>
                  {user.role === 'admin' ? (
                    <Link href="/admin" className="text-gray-600 hover:text-blue-600">
                      Admin
                    </Link>
                  ) : (
                    <Link href="/dashboard" className="text-gray-600 hover:text-blue-600">
                      Dashboard
                    </Link>
                  )}
                  <Link href="/profile" className="text-gray-600 hover:text-blue-600">
                    Profile
                  </Link>
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover border-2 border-gray-300"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-600">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <button
                    onClick={logout}
                    className="text-gray-600 hover:text-blue-600"
                  >
                    Logout
                  </button>
                </>
              ) : mounted ? (
                <>
                  <Link href="/login" className="text-gray-600 hover:text-blue-600">
                    Login
                  </Link>
                  <Link href="/register" className="text-gray-600 hover:text-blue-600">
                    Register
                  </Link>
                </>
              ) : null}
            </nav>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}