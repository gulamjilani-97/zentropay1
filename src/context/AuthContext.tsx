import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Types
interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

// Create context
const AuthContext = createContext<AuthContextType | null>(null);

// Mock authentication functions
const mockLogin = async (email: string, password: string): Promise<User> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  if (email === 'demo@example.com' && password === 'password') {
    return {
      id: '1',
      email: 'demo@example.com',
      name: 'Demo User',
    };
  }
  
  throw new Error('Invalid email or password');
};

const mockRegister = async (name: string, email: string, password: string): Promise<User> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  // In a real app, this would check if the user already exists
  return {
    id: '2',
    email,
    name,
  };
};

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for stored user in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const user = await mockLogin(email, password);
      setCurrentUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (err) {
      setError((err as Error).message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const user = await mockRegister(name, email, password);
      setCurrentUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (err) {
      setError((err as Error).message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    isLoading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};