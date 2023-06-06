import type { NextApiRequest, NextApiResponse } from 'next';

import { database } from '@server/services/database';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;

    if (!id)
      throw {
        status: 400,
        type: 'missing-fields',
      };

    const db = database({ req, res });
    const { data, error } = await db
      .from('menus_order')
      .select('menus_order')
      .eq('id', id as string);

    if (error || !data?.[0]?.menus_order)
      throw {
        status: 404,
        type: 'not-found',
      };

    return res.status(200).send(data[0].menus_order);
  } catch (err) {
    throw err;
  }
}
