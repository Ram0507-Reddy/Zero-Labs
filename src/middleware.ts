import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('zero_access_token');
  
  // Isolate the /admin routing branch for inspection
  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    
    // Natively bounce unauthenticated traffic back to login before Next.js even begins to render the dashboard
    if (!token || token.value !== 'encrypted_zero_session_active') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  return NextResponse.next();
}

// Strictly bind the Edge Firewall to only execute on the secure routing tree
export const config = {
  matcher: ['/admin/:path*'],
};
