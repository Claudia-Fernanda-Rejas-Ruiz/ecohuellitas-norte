import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, MOCK_USERS } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const current = await api.getCurrentUser();
        setUser(current);
      } catch (err) {
        console.error('Error al inicializar sesión:', err);
        setUser(MOCK_USERS[0]);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const loggedUser = await api.login(email, password);
      setUser(loggedUser);
      return loggedUser;
    } finally {
      setLoading(false);
    }
  };

  const loginAsDemo = async (role = 'citizen') => {
    setLoading(true);
    try {
      const demoUser = await api.login(null, null, role);
      setUser(demoUser);
      return demoUser;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const newUser = await api.registerUser(userData);
      setUser(newUser);
      return newUser;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (patchData) => {
    if (!user) return;
    const updated = await api.updateUser(user.id, patchData);
    setUser(updated);
    return updated;
  };

  const logout = () => {
    localStorage.removeItem('ehn_active_user_id');
    // Default to first user or clean
    setUser(MOCK_USERS[0]);
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    isCitizen: user?.role === 'citizen',
    isInspector: user?.role === 'inspector' || user?.role === 'admin',
    isAdmin: user?.role === 'admin',
    login,
    loginAsDemo,
    register,
    updateUser,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
}
