import type { NextApiRequest, NextApiResponse } from 'next';

import { database } from '@server/services/database';

export async function GET_ALL(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = database({ req, res });
    const { data, error } = await db
      .from('menus_order')
      .select('id,menus_order')
      .neq('id', 'menus_order');

    if (error || !data?.[0]?.menus_order)
      throw {
        status: 404,
        type: 'not-found',
      };

    return res.status(200).send(
      data.reduce((acc, data) => {
        acc[data.id as string] = data.menus_order;
        return acc;
      }, {} as { [key: string]: any }),
    );
  } catch (err) {
    throw err;
  }
}
