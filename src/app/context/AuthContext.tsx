"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { ReactNode } from "react";

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);


  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    const storedName = localStorage.getItem("userName");
    if (storedEmail && storedName) {
      setUserName(storedName);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (email: string, name: string, role: string) => {
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userName", name);
    localStorage.setItem("userRole", role);
    setUserName(name);
    setIsLoggedIn(true);
    setUserRole(role);
  };

  const logout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole")
    setUserName(null);
    setUserRole(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ userName, isLoggedIn, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
