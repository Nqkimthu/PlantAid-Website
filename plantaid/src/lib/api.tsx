import { projectId, publicAnonKey } from '../utils/supabase/info';

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-b7fff76e`;

export interface PredictionResult {
  disease: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  description: string;
  symptoms: string[];
  treatments: string[];
  prevention: string[];
}

export interface PredictionHistory {
  id: string;
  userId: string;
  imageUrl: string;
  disease: string;
  confidence: number;
  severity: string;
  timestamp: string;
}

export const api = {
  // Predict disease from image
  async predictDisease(imageData: string, accessToken: string): Promise<{ success: boolean; result?: PredictionResult; error?: string }> {
    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ imageData })
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error('Prediction API error:', data);
        return { success: false, error: data.error || 'Prediction failed' };
      }

      return { success: true, result: data.result };
    } catch (error) {
      console.error('Prediction network error:', error);
      return { success: false, error: 'Network error during prediction' };
    }
  },

  // Get user's prediction history
  async getPredictionHistory(accessToken: string): Promise<{ success: boolean; predictions?: PredictionHistory[]; error?: string }> {
    try {
      const response = await fetch(`${API_URL}/history`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error('History API error:', data);
        return { success: false, error: data.error || 'Failed to fetch history' };
      }

      return { success: true, predictions: data.predictions };
    } catch (error) {
      console.error('History network error:', error);
      return { success: false, error: 'Network error fetching history' };
    }
  },

  // Get all diseases
  async getDiseases(): Promise<{ success: boolean; diseases?: any[]; error?: string }> {
    try {
      const response = await fetch(`${API_URL}/diseases`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error('Diseases API error:', data);
        return { success: false, error: data.error || 'Failed to fetch diseases' };
      }

      return { success: true, diseases: data.diseases };
    } catch (error) {
      console.error('Diseases network error:', error);
      return { success: false, error: 'Network error fetching diseases' };
    }
  }
};
