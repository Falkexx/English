'use client';
import { createContext, useState } from 'react';
import { setCookie, destroyCookie, parseCookies } from 'nookies';
import { useRouter } from 'next/navigation';

type AuthContextType = {
  isAuthenticated: boolean;
  signIn: (data: { email: string; password: string }) => Promise<void>;
  signUp: (data: { email: string; password: string; country: string; name: string; }) => Promise<void>;
  logout: () => void;
  token: string | null;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const [token, setToken] = useState<string | null>(() => {
    const cookies = parseCookies();
    return cookies['nextauth.token'] || null;
  });

  const isAuthenticated = !!token;
  const router = useRouter();

  async function signIn({ email, password }: { email: string; password: string }) {
    try {
      const response = await fetch('http://localhost:3000/auth/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Erro ao fazer login');
      }

      const { access_token } = await response.json();

      // Salva apenas o token nos cookies
      setCookie(undefined, 'nextauth.token', access_token, { maxAge: 60 * 60 * 1, path: '/' });

      setToken(access_token);

      router.push('/Home');
    } catch (error) {
      console.error('Erro na autenticação:', error);
    }
  }

  async function signUp({ email, password, country, name }: { email: string; password: string; country: string; name: string; }) {

    const data = {
      name,
      email,
      password,
      country: "Brazil",
    };

    try {
      const response = await fetch("http://localhost:3000/student/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Erro ao fazer login');
      }

      const { access_token } = await response.json();

      // Salva apenas o token nos cookies
      setCookie(undefined, 'nextauth.token', access_token, { maxAge: 60 * 60 * 1, path: '/' });

      setToken(access_token);

      router.push('/Home');
    } catch (error) {
      console.error('Erro na autenticação:', error);
    }
  }

  function logout() {
    destroyCookie(undefined, 'nextauth.token');
    setToken(null);
    router.push('/');
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, logout, token, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}