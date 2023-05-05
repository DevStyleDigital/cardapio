import type { NextApiRequest, NextApiResponse } from 'next';
import { database } from '@server/services/database';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = database({ req, res });
    const { data, error } = await db.from('menus').select('id,menuName');

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
