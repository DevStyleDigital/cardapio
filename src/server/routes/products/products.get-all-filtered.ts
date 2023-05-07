import type { NextApiRequest, NextApiResponse } from 'next';
import { database } from '@server/services/database';

export async function GET_ALL_FILTERED(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { types, menus } = req.body;

    const db = database({ req, res });
    const { data, error } = await db
      .from('products')
      .select('*')
      .eq('menus', menus)
      .eq('types', types);

    if (!data?.length || error)
      throw {
        status: 404,
        type: 'not-found',
      };

    return res.status(200).send(data);
  } catch (err) {
    throw err;
  }
}
