# Rooted Hands

This is a NextJS application for Rooted Hands.

To get started, take a look at src/app/page.tsx.

## Brand Name Change

The application name has been changed from "Artistry Havens" to "Rooted Hands" across the entire codebase.

## Firebase Setup Requirements

Before running the application, you need to complete the following Firebase setup tasks:

### 1. Firebase Project Configuration

1. **Create a Firebase Project**:
   - Go to the [Firebase Console](https://console.firebase.google.com/)
   - Click "Create a project" or select an existing project
   - Follow the setup wizard to create your project

2. **Enable Firebase Services**:
   - Enable Authentication with Phone provider
   - Enable Firestore Database
   - Enable Firebase Storage

3. **Get Firebase Configuration Values**:
   - In Firebase Console, go to Project Settings > General
   - Register a web app if you haven't already
   - Copy the Firebase SDK configuration values

4. **Set up Admin SDK**:
   - In Firebase Console, go to Project Settings > Service Accounts
   - Generate a new private key (this downloads a JSON file)
   - Extract the required values from this file

### 2. Environment Configuration

Update your `.env.local` file with the actual Firebase configuration values:

```env
# Firebase Configuration (from Firebase Console > Project Settings > General)
NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdefghijklmnop
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Firebase Admin SDK (from service account JSON file)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=your-project-id@appspot.gserviceaccount.com

# AI Services Configuration
GEMINI_API_KEY=your_gemini_api_key
VERTEX_API_KEY=your_vertex_api_key
GOOGLE_CLOUD_PROJECT_ID=your_google_cloud_project_id
GOOGLE_CLOUD_REGION=us-central1
```

### 3. Firestore Collections Setup

Create the following collections in your Firestore Database:
- `users`
- `products`
- `orders`
- `artisans`
- `sponsors`

### 4. Firebase Security Rules

Deploy the security rules from the `docs` directory:
- `docs/firestore.rules` for Firestore Database
- `docs/storage.rules` for Firebase Storage

## Code Updates Required

### 1. Environment Variables

Ensure all environment variables in `.env.local` are properly configured with actual values from your Firebase project.

### 2. Firebase Configuration

The Firebase configuration is managed in `src/lib/firebase.config.ts` and should work with the environment variables once properly set.

### 3. Firebase Service Implementation

The application uses mock implementations in `src/services/firebase-service.ts` and `src/context/firebase-context.tsx` that need to be replaced with actual Firebase calls.

## Development

To run the development server:

```bash
npm run dev
```

The application will be available at http://localhost:9002

## Deployment

To deploy the Firebase backend resources:

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login to Firebase: `firebase login`
3. Initialize Firebase project: `firebase init`
4. Deploy Firebase resources: `firebase deploy`

The Firebase configuration files in the `docs` directory are ready to be used with the Firebase CLI to provision all necessary backend resources.

## Troubleshooting

If you encounter issues:

1. **Firebase: Error (auth/invalid-api-key)**:
   - Verify that `NEXT_PUBLIC_FIREBASE_API_KEY` in `.env.local` is correct
   - Ensure all Firebase environment variables are properly set

2. **Dependency Issues**:
   - Run `npm install` to ensure all dependencies are installed
   - Run `npm install --legacy-peer-deps` if you encounter peer dependency conflicts

3. **Genkit Version Conflicts**:
   - All Genkit packages should be at the same version (currently 1.22.0)
   - Check `package.json` for version consistency

4. **Missing Environment Variables**:
   - Ensure `.env.local` contains all required variables
   - Restart the development server after updating environment variables