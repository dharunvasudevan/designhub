import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, AuthState, LoginCredentials, SignupCredentials } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  signup: (credentials: SignupCredentials) => Promise<boolean>;
  logout: () => void;
  toggleSaveTool: (slug: string) => void;
  isToolSaved: (slug: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize from localStorage for demo persistence
  useEffect(() => {
    try {
      const stored = localStorage.getItem('designhub_user');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load user state', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    // Scaffold ready for future backend API call
    const mockUser: User = {
      id: 'usr_1',
      name: credentials.email.split('@')[0] || 'Designer',
      email: credentials.email,
      role: 'user',
      savedToolSlugs: ['figma', 'framer'],
    };
    setUser(mockUser);
    localStorage.setItem('designhub_user', JSON.stringify(mockUser));
    return true;
  };

  const signup = async (credentials: SignupCredentials): Promise<boolean> => {
    const mockUser: User = {
      id: 'usr_' + Date.now(),
      name: credentials.name,
      email: credentials.email,
      role: 'user',
      savedToolSlugs: [],
    };
    setUser(mockUser);
    localStorage.setItem('designhub_user', JSON.stringify(mockUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('designhub_user');
  };

  const toggleSaveTool = (slug: string) => {
    if (!user) return;
    const exists = user.savedToolSlugs.includes(slug);
    const updated = {
      ...user,
      savedToolSlugs: exists
        ? user.savedToolSlugs.filter((s) => s !== slug)
        : [...user.savedToolSlugs, slug],
    };
    setUser(updated);
    localStorage.setItem('designhub_user', JSON.stringify(updated));
  };

  const isToolSaved = (slug: string): boolean => {
    return user ? user.savedToolSlugs.includes(slug) : false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        toggleSaveTool,
        isToolSaved,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
