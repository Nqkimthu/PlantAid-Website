import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
}

// Create Supabase client for frontend auth
const supabaseUrl = `https://${projectId}.supabase.co`;
const supabase = createClient(supabaseUrl, publicAnonKey);

export const authService = {
  // Sign up new user
  async signup(email: string, password: string, name: string): Promise<{ success: boolean; error?: string; user?: User }> {
    try {
      const response = await fetch(`${supabaseUrl}/functions/v1/make-server-b7fff76e/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ email, password, name })
      });

      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, error: data.error || 'Signup failed' };
      }

      return { success: true, user: data.user };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: 'Network error during signup' };
    }
  },

  // Sign in existing user
  async signin(email: string, password: string): Promise<{ success: boolean; error?: string; user?: User; accessToken?: string }> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error || !data.session) {
        return { success: false, error: error?.message || 'Sign in failed' };
      }

      const user: User = {
        id: data.user.id,
        email: data.user.email || '',
        name: data.user.user_metadata?.name || ''
      };

      return { 
        success: true, 
        user,
        accessToken: data.session.access_token
      };
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, error: 'Network error during sign in' };
    }
  },

  // Sign out
  async signout(): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      return { success: false, error: 'Network error during sign out' };
    }
  },

  // Get current session
  async getSession(): Promise<{ user: User | null; accessToken: string | null }> {
    try {
      const { data, error } = await supabase.auth.getSession();
      
      if (error || !data.session) {
        return { user: null, accessToken: null };
      }

      const user: User = {
        id: data.session.user.id,
        email: data.session.user.email || '',
        name: data.session.user.user_metadata?.name || ''
      };

      return { 
        user,
        accessToken: data.session.access_token
      };
    } catch (error) {
      console.error('Get session error:', error);
      return { user: null, accessToken: null };
    }
  },

  // Listen to auth state changes
  onAuthStateChange(callback: (user: User | null, accessToken: string | null) => void) {
    return supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        const user: User = {
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.name || ''
        };
        callback(user, session.access_token);
      } else {
        callback(null, null);
      }
    });
  }
};
