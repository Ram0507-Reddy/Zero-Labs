'use server';

import { headers } from 'next/headers';

// High-speed, in-memory IP cache. 
// On Serverless platforms like Vercel, this persists during hot function invocations, 
// natively blocking massive concurrent bot attacks instantly without needing an external database.
const rateLimitMap = new Map<string, number>();

export async function transmitAction(data: { name: string, email: string, problems: string, projectDetails: string, website: string }) {
  try {
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();
    
    // 60-second structural lockout per IP
    if (rateLimitMap.has(ip)) {
      const lastTransmission = rateLimitMap.get(ip)!;
      if (now - lastTransmission < 60000) {
        return { error: '429_TOO_MANY_REQUESTS' };
      }
    }
    
    // Register unique IP signature in cache
    rateLimitMap.set(ip, now);
    
    // Execute the payload directly via Firebase REST protocol.
    // This completely removes the need to download or initialize heavy Client Web SDKs on the builder form page.
    const firebaseUrl = `https://firestore.googleapis.com/v1/projects/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}/databases/(default)/documents/requests?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`;
    
    const payload = {
      fields: {
        name: { stringValue: data.name },
        email: { stringValue: data.email },
        problems: { stringValue: data.problems },
        projectDetails: { stringValue: data.projectDetails },
        website: { stringValue: data.website },
        status: { stringValue: 'UNREAD' },
        createdAt: { stringValue: new Date().toISOString() }
      }
    };

    const response = await fetch(firebaseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("[FIRESTORE REST REJECTION]", err);
      return { error: 'FIREBASE_REJECTION' };
    }

    return { success: true };
  } catch (err) {
    console.error("[CRITICAL BACKEND ERROR]", err);
    return { error: 'INTERNAL_SERVER_ERROR' };
  }
}
