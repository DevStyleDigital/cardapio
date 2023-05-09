import { database } from '@server/services/database';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const cookie = req.cookies.get('supabase-auth-token');
  const cookieValue = JSON.parse(cookie?.value || '[]') as string[];
  const { auth } = database({ req, res });
  const dataUser = cookieValue[0] && (await auth.getUser(cookieValue[0]));

  if (!dataUser || dataUser.error || !dataUser.data.user) {
    return NextResponse.rewrite(new URL('/admin', req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dash/:path*', '/admin/dash/'],
};
