import { database } from '@server/services/database';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const { auth } = database({ req, res });
  const { data, error } = await auth.getSession();

  if (error || !data.session) return new NextResponse(null, { status: 404 });
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dash/:path*', '/admin/dash/'],
};
