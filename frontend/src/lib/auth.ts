'use client';

import { signupUser, loginUser } from './api';

export interface User {
  id: string;
  name: string;
  email: string;
  token?: string;
}

const TOKEN_KEY = 'jwt_token';

export const authService = {
  async createAccount(email: string, password: string, name: string): Promise<User | null> {
    const { token, user } = await signupUser({ email, password, name });
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      return user;
    }
    return null;
  },

  async login(email: string, password: string): Promise<User | null> {
    const { token, user } = await loginUser({ email, password });
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      return user;
    }
    return null;
  },

  async getCurrentUser(): Promise<User | null> {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return null;

    try {
      // In a real app, you would verify the token with a backend endpoint
      // For now, we decode it to get user info.
      const payload = JSON.parse(atob(token.split('.')[1]));
      return { id: payload.userId, name: payload.name, email: payload.email };
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  },

  logout() {
    localStorage.removeItem(TOKEN_KEY);
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },
};
