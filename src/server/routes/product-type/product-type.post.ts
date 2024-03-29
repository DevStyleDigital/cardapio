import type { NextApiRequest, NextApiResponse } from 'next';
import { database } from '@server/services/database';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const db = database({ req, res });

    const { error } = await db.from('product_types').upsert({ ...req.body, id });

    if (error) throw 'error';

    return res.status(200).send({ message: 'Success' });
  } catch (err) {
    throw err;
  }
}
