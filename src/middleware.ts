import { createServerClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const supabase = createServerClient();
  
  // Refresh session if expired - required for Server Components
  await supabase.auth.getSession();
  
  // Check if the user is trying to access the admin route
  if (request.nextUrl.pathname.startsWith('/admin') && 
      !request.nextUrl.pathname.startsWith('/admin/login')) {
    
    const { data: { session } } = await supabase.auth.getSession();
    
    // If no session, redirect to login
    if (!session) {
      const redirectUrl = new URL('/admin/login', request.url);
      redirectUrl.searchParams.set('redirectedFrom', request.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }
    
    // Check if user has admin role
    const { data: userData, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', session.user.id)
      .single();
    
    if (error || userData?.role !== 'admin') {
      await supabase.auth.signOut();
      const redirectUrl = new URL('/admin/login', request.url);
      redirectUrl.searchParams.set('message', 'unauthorized');
      return NextResponse.redirect(redirectUrl);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/auth (auth routes)
     */
    '/((?!_next/static|_next/image|favicon.ico|api/auth).*)',
  ],
};
