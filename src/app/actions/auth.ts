'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
  const password = formData.get('password');
  
  // SECURITY: This exact string match is executed perfectly off-world on the Vercel node server. 
  // It NEVER downloads to the user's browser, making the site totally immune to DOM inspection.
  if (password === 'zero') {
    const cookieStore = await cookies();
    cookieStore.set('zero_access_token', 'encrypted_zero_session_active', {
      httpOnly: true, // Absolutely invisible to Client JS (blocks XSS token theft)
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7 // 1 week duration globally
    });
    
    redirect('/admin');
  }
  
  // If invalid, return the rejection
  return { error: 'ACCESS DENIED: INSUFFICIENT CLEARANCE' };
}
