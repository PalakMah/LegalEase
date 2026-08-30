import { createContext, useContext, ReactNode } from 'react';

/**
 * LegalEase no longer has login/signup — the app runs fully anonymously.
 * This context is kept only so existing components (Header, ProfilePage,
 * NotificationContext, etc.) that call useAuth() don't need to be rewritten.
 * `isAuthenticated` is always true and `login`/`logout` are no-ops.
 */
interface AuthContextType {
  isAuthenticated: boolean;
  isVerifying: boolean;
  userEmail: string | null;
  accessToken: string | null;
  login: (token: string) => Promise<void>;
  logout: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const value: AuthContextType = {
    isAuthenticated: true,
    isVerifying: false,
    userEmail: null,
    accessToken: null,
    login: async () => {},
    logout: () => true,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
