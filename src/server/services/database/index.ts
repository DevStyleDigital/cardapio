import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { NextApiRequest, NextApiResponse } from 'next';

export const database = (ctx: { req: NextApiRequest; res: NextApiResponse } | any) =>
  createServerSupabaseClient(ctx, {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  });
