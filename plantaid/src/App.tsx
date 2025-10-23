import { useState, useEffect } from "react";
import { LandingPage } from "./components/LandingPage";
import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";
import { DashboardPage } from "./components/DashboardPage";
import { DetectionPage } from "./components/DetectionPage";
import { authService, User } from "./lib/auth";
import { api, PredictionHistory, PredictionResult } from "./lib/api";
import { Loader2 } from "lucide-react";

type Page = 'landing' | 'login' | 'signup' | 'dashboard' | 'detection';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<PredictionHistory[]>([]);
  const [authError, setAuthError] = useState<string>('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      const { user: sessionUser, accessToken: token } = await authService.getSession();
      if (sessionUser && token) {
        setUser(sessionUser);
        setAccessToken(token);
        setCurrentPage('dashboard');
        loadPredictionHistory(token);
      }
      setIsCheckingSession(false);
    };

    checkSession();

    // Listen for auth state changes
    const { data: listener } = authService.onAuthStateChange((user, token) => {
      setUser(user);
      setAccessToken(token);
      if (user && token) {
        loadPredictionHistory(token);
      }
    });

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  const loadPredictionHistory = async (token: string) => {
    setIsLoadingHistory(true);
    const { success, predictions: history, error } = await api.getPredictionHistory(token);
    if (success && history) {
      setPredictions(history);
    } else if (error) {
      console.error('Failed to load prediction history:', error);
    }
    setIsLoadingHistory(false);
  };

  const handleLogin = async (email: string, password: string) => {
    setAuthError('');
    setIsAuthLoading(true);

    const { success, user: loggedInUser, accessToken: token, error } = await authService.signin(email, password);
    
    setIsAuthLoading(false);

    if (success && loggedInUser && token) {
      setUser(loggedInUser);
      setAccessToken(token);
      setCurrentPage('dashboard');
      loadPredictionHistory(token);
    } else {
      setAuthError(error || 'Login failed');
    }
  };

  const handleSignup = async (email: string, password: string, name: string) => {
    setAuthError('');
    setIsAuthLoading(true);

    const { success, error } = await authService.signup(email, password, name);
    
    setIsAuthLoading(false);

    if (success) {
      // After successful signup, automatically sign in
      await handleLogin(email, password);
    } else {
      setAuthError(error || 'Signup failed');
    }
  };

  const handleSignout = async () => {
    await authService.signout();
    setUser(null);
    setAccessToken(null);
    setPredictions([]);
    setCurrentPage('landing');
  };

  const handleAnalyze = async (imageData: string): Promise<PredictionResult | null> => {
    if (!accessToken) {
      console.error('No access token available');
      return null;
    }

    const { success, result, error } = await api.predictDisease(imageData, accessToken);
    
    if (success && result) {
      // Reload history to include the new prediction
      loadPredictionHistory(accessToken);
      return result;
    } else {
      console.error('Prediction failed:', error);
      return null;
    }
  };

  const handleNewDetection = () => {
    setCurrentPage('detection');
  };

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
  };

  // Show loading screen while checking session
  if (isCheckingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-green-600" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Render appropriate page
  if (currentPage === 'landing') {
    return (
      <LandingPage
        onLogin={() => {
          setAuthError('');
          setCurrentPage('login');
        }}
        onSignup={() => {
          setAuthError('');
          setCurrentPage('signup');
        }}
      />
    );
  }

  if (currentPage === 'login') {
    return (
      <LoginPage
        onLogin={handleLogin}
        onSwitchToSignup={() => {
          setAuthError('');
          setCurrentPage('signup');
        }}
        error={authError}
        isLoading={isAuthLoading}
      />
    );
  }

  if (currentPage === 'signup') {
    return (
      <SignupPage
        onSignup={handleSignup}
        onSwitchToLogin={() => {
          setAuthError('');
          setCurrentPage('login');
        }}
        error={authError}
        isLoading={isAuthLoading}
      />
    );
  }

  if (currentPage === 'dashboard' && user) {
    return (
      <DashboardPage
        user={user}
        predictions={predictions}
        onSignout={handleSignout}
        onNewDetection={handleNewDetection}
        isLoadingHistory={isLoadingHistory}
      />
    );
  }

  if (currentPage === 'detection' && user) {
    return (
      <DetectionPage
        user={user}
        onBackToDashboard={handleBackToDashboard}
        onAnalyze={handleAnalyze}
      />
    );
  }

  // Fallback to landing
  return (
    <LandingPage
      onLogin={() => setCurrentPage('login')}
      onSignup={() => setCurrentPage('signup')}
    />
  );
}
