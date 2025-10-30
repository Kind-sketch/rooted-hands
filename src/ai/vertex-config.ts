import {genkit} from 'genkit';
import {vertexAI} from '@genkit-ai/vertexai';

// Vertex AI configuration
export const vertexAi = genkit({
  plugins: [
    vertexAI({
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      location: process.env.GOOGLE_CLOUD_REGION || 'us-central1',
      // apiKey: process.env.VERTEX_AI_API_KEY // Only needed if using API key auth
    })
  ],
  model: 'vertexai/gemini-1.5-flash',
});