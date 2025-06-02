import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/utils/supabase/server';

export async function adminAuthMiddleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createServerClient();

  // Get the session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If there's no session, redirect to login
  if (!session) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/signin';
    redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Check if user has admin role (you'll need to implement this based on your Supabase auth setup)
  const { data: userData, error } = await supabase
    .from('users')
    .select('role')
    .eq('id', session.user.id)
    .single();

  if (error || userData?.role !== 'admin') {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  return res;
}
