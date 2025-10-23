import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js@2';
import * as bcrypt from 'https://deno.land/x/bcrypt@v0.4.1/mod.ts';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Middleware
app.use('*', cors());
app.use('*', logger(console.log));

// Initialize Supabase client
const getSupabaseClient = () => {
  return createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );
};

// Initialize storage bucket
const initStorage = async () => {
  const supabase = getSupabaseClient();
  const bucketName = 'make-b7fff76e-plant-images';
  
  const { data: buckets } = await supabase.storage.listBuckets();
  const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
  
  if (!bucketExists) {
    await supabase.storage.createBucket(bucketName, { public: false });
    console.log(`Created bucket: ${bucketName}`);
  }
};

// Initialize disease information in database
const initDiseaseData = async () => {
  const diseases = [
    {
      name: 'Late Blight',
      category: 'Fungal',
      description: 'Late blight is a devastating disease that affects tomatoes and potatoes. It spreads rapidly in humid conditions.',
      symptoms: ['Dark brown to black lesions on leaves', 'White fuzzy growth on undersides of leaves', 'Stem lesions with dark streaks', 'Fruit rot with firm, greasy appearance'],
      treatments: ['Remove and destroy affected plants immediately', 'Apply copper-based fungicides every 7-10 days', 'Improve air circulation around plants', 'Avoid overhead watering'],
      prevention: ['Plant resistant varieties when available', 'Ensure proper plant spacing for air circulation', 'Water at the base of plants, not overhead', 'Remove plant debris at end of season']
    },
    {
      name: 'Powdery Mildew',
      category: 'Fungal',
      description: 'A fungal disease that creates white powdery spots on leaves and stems, reducing plant vigor.',
      symptoms: ['White powdery spots on leaves', 'Leaves may curl and become distorted', 'Reduced plant growth and vigor', 'Premature leaf drop'],
      treatments: ['Apply sulfur or potassium bicarbonate sprays', 'Remove heavily infected leaves', 'Spray with neem oil solution', 'Improve air circulation'],
      prevention: ['Plant in full sun when possible', 'Avoid overcrowding plants', 'Water in the morning to allow leaves to dry', 'Choose resistant varieties']
    },
    {
      name: 'Bacterial Spot',
      category: 'Bacterial',
      description: 'A bacterial disease causing dark spots on leaves and fruit, commonly affecting peppers and tomatoes.',
      symptoms: ['Small dark spots with yellow halos on leaves', 'Spots on fruit and stems', 'Leaf yellowing and drop', 'Reduced fruit quality'],
      treatments: ['Apply copper-based bactericides', 'Remove infected plant parts', 'Avoid working with wet plants', 'Use disease-free seeds and transplants'],
      prevention: ['Practice crop rotation', 'Use drip irrigation instead of overhead', 'Sanitize tools between plants', 'Remove plant debris promptly']
    },
    {
      name: 'Early Blight',
      category: 'Fungal',
      description: 'Causes dark concentric rings on lower leaves, progressing upward.',
      symptoms: ['Dark spots with concentric rings on leaves', 'Yellow halo around spots', 'Progressive leaf death from bottom up', 'Stem lesions near soil line'],
      treatments: ['Remove affected leaves promptly', 'Apply fungicides containing chlorothalonil', 'Mulch around plants to prevent soil splash', 'Stake plants for better air flow'],
      prevention: ['Rotate crops annually', 'Space plants properly', 'Avoid overhead irrigation', 'Clean up plant debris']
    },
    {
      name: 'Leaf Curl',
      category: 'Viral',
      description: 'Leaves become distorted, curled, and discolored, affecting plant growth.',
      symptoms: ['Leaves curl upward or downward', 'Yellowing or reddening of leaves', 'Stunted plant growth', 'Reduced fruit production'],
      treatments: ['Remove and destroy infected plants', 'Control aphid populations (virus vectors)', 'No cure available once infected', 'Focus on prevention'],
      prevention: ['Use virus-free planting material', 'Control insect vectors', 'Remove infected plants immediately', 'Plant resistant varieties']
    },
    {
      name: 'Healthy',
      category: 'None',
      description: 'Your plant appears to be healthy with no signs of disease. Continue with proper care practices.',
      symptoms: [],
      treatments: [],
      prevention: ['Maintain consistent watering schedule', 'Ensure adequate sunlight exposure', 'Provide proper nutrients and fertilization', 'Monitor regularly for early signs of problems', 'Maintain good air circulation around plants']
    }
  ];

  for (const disease of diseases) {
    const existing = await kv.get(`disease:${disease.name}`);
    if (!existing) {
      await kv.set(`disease:${disease.name}`, disease);
    }
  }
};

// Initialize on startup
initStorage();
initDiseaseData();

// Health check
app.get('/make-server-b7fff76e/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// User Registration
app.post('/make-server-b7fff76e/auth/signup', async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    if (!email || !password || !name) {
      return c.json({ error: 'Email, password, and name are required' }, 400);
    }

    // Check if user already exists
    const existingUser = await kv.get(`user:${email}`);
    if (existingUser) {
      return c.json({ error: 'User with this email already exists' }, 400);
    }

    // Use Supabase Auth to create user
    const supabase = getSupabaseClient();
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured
      email_confirm: true
    });

    if (error) {
      console.error('Supabase auth signup error:', error);
      return c.json({ error: `Authentication error during signup: ${error.message}` }, 400);
    }

    // Store additional user data in KV store
    const userId = data.user.id;
    const userData = {
      id: userId,
      email,
      name,
      created_at: new Date().toISOString()
    };

    await kv.set(`user:${email}`, userData);
    await kv.set(`user:id:${userId}`, userData);

    return c.json({ 
      success: true, 
      message: 'User registered successfully',
      user: { id: userId, email, name }
    });
  } catch (error) {
    console.error('Signup error:', error);
    return c.json({ error: `Server error during signup: ${error.message}` }, 500);
  }
});

// Disease Prediction (Mock AI Model)
app.post('/make-server-b7fff76e/predict', async (c) => {
  try {
    // Get and verify user
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = getSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized - Please log in' }, 401);
    }

    const { imageData } = await c.req.json();
    
    if (!imageData) {
      return c.json({ error: 'Image data is required' }, 400);
    }

    // Upload image to Supabase Storage
    const timestamp = Date.now();
    const fileName = `${user.id}/${timestamp}.jpg`;
    
    // Convert base64 to blob
    const base64Data = imageData.split(',')[1];
    const binaryData = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
    
    const { error: uploadError } = await supabase.storage
      .from('make-b7fff76e-plant-images')
      .upload(fileName, binaryData, {
        contentType: 'image/jpeg',
        upsert: false
      });

    if (uploadError) {
      console.error('Image upload error:', uploadError);
      return c.json({ error: `Failed to upload image: ${uploadError.message}` }, 500);
    }

    // Get signed URL for the image
    const { data: signedUrlData } = await supabase.storage
      .from('make-b7fff76e-plant-images')
      .createSignedUrl(fileName, 60 * 60 * 24 * 365); // 1 year

    const imageUrl = signedUrlData?.signedUrl || '';

    // Mock AI prediction - randomly select a disease
    const diseaseNames = ['Late Blight', 'Powdery Mildew', 'Bacterial Spot', 'Early Blight', 'Leaf Curl', 'Healthy'];
    const selectedDisease = diseaseNames[Math.floor(Math.random() * diseaseNames.length)];
    
    const diseaseInfo = await kv.get(`disease:${selectedDisease}`);
    
    const confidence = Math.floor(Math.random() * 15) + 85; // 85-99%
    const severity = selectedDisease === 'Healthy' ? 'low' : 
                    confidence > 90 ? 'high' : 
                    confidence > 85 ? 'medium' : 'low';

    const predictionResult = {
      disease: selectedDisease,
      confidence,
      severity,
      description: diseaseInfo?.description || '',
      symptoms: diseaseInfo?.symptoms || [],
      treatments: diseaseInfo?.treatments || [],
      prevention: diseaseInfo?.prevention || []
    };

    // Save prediction to user history
    const predictionId = `prediction:${user.id}:${timestamp}`;
    const predictionRecord = {
      id: predictionId,
      userId: user.id,
      imageUrl,
      disease: selectedDisease,
      confidence,
      severity,
      timestamp: new Date().toISOString()
    };

    await kv.set(predictionId, predictionRecord);

    return c.json({ 
      success: true, 
      result: predictionResult,
      predictionId
    });
  } catch (error) {
    console.error('Prediction error:', error);
    return c.json({ error: `Server error during prediction: ${error.message}` }, 500);
  }
});

// Get User Prediction History
app.get('/make-server-b7fff76e/history', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = getSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id || authError) {
      return c.json({ error: 'Unauthorized - Please log in' }, 401);
    }

    // Get all predictions for this user
    const predictions = await kv.getByPrefix(`prediction:${user.id}:`);
    
    // Sort by timestamp, most recent first
    predictions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return c.json({ success: true, predictions });
  } catch (error) {
    console.error('History retrieval error:', error);
    return c.json({ error: `Server error retrieving history: ${error.message}` }, 500);
  }
});

// Get Disease Information
app.get('/make-server-b7fff76e/diseases', async (c) => {
  try {
    const diseases = await kv.getByPrefix('disease:');
    return c.json({ success: true, diseases });
  } catch (error) {
    console.error('Disease info retrieval error:', error);
    return c.json({ error: `Server error retrieving diseases: ${error.message}` }, 500);
  }
});

// Get specific disease info
app.get('/make-server-b7fff76e/diseases/:name', async (c) => {
  try {
    const name = c.req.param('name');
    const disease = await kv.get(`disease:${name}`);
    
    if (!disease) {
      return c.json({ error: 'Disease not found' }, 404);
    }

    return c.json({ success: true, disease });
  } catch (error) {
    console.error('Disease info retrieval error:', error);
    return c.json({ error: `Server error retrieving disease: ${error.message}` }, 500);
  }
});

Deno.serve(app.fetch);
