import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext();
const TEST_EMAIL = "teste@studionails.com";
const TEST_PASSWORD = "StudioNails@123";
const TEST_USER_KEY = "studio_nails_test_user";

function normalizeAuthError(error) {
  const rawMessage = error?.message || "";
  if (!rawMessage) {
    return "Erro inesperado de autenticacao.";
  }

  if (rawMessage.toLowerCase().includes("failed to fetch")) {
    return "Falha de conexao com o Supabase. Verifique URL/chave no .env e se o projeto esta online.";
  }

  return rawMessage;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedTestUser = localStorage.getItem(TEST_USER_KEY);
    if (savedTestUser === "1") {
      setUser({ email: TEST_EMAIL, isTestUser: true });
      setIsLoading(false);
      return;
    }

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signInWithEmailPassword(email, password) {
    if (email === TEST_EMAIL && password === TEST_PASSWORD) {
      localStorage.setItem(TEST_USER_KEY, "1");
      setUser({ email: TEST_EMAIL, isTestUser: true });
      return { error: null };
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return { error: error ? { message: normalizeAuthError(error) } : null };
    } catch {
      return { error: { message: "Falha de conexao com o Supabase. Verifique URL/chave e internet." } };
    }
  }

  async function signUpWithEmailPassword(email, password) {
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      return { error: error ? { message: normalizeAuthError(error) } : null };
    } catch {
      return { error: { message: "Falha de conexao com o Supabase. Verifique URL/chave e internet." } };
    }
  }

  async function signOut() {
    localStorage.removeItem(TEST_USER_KEY);
    if (user?.isTestUser) {
      setUser(null);
      return;
    }
    await supabase.auth.signOut();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signInWithEmailPassword, signUpWithEmailPassword, signOut, testCredentials: { email: TEST_EMAIL, password: TEST_PASSWORD } }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
