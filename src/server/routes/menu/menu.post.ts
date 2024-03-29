import type { NextApiRequest, NextApiResponse } from 'next';
import { database } from '@server/services/database';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = database({ req, res });

    const id = uuidv4();

    const { error } = await db.from('menus').insert({ ...req.body, id });

    if (error) throw 'error';

    return res.status(200).send({ id });
  } catch (err) {
    throw err;
  }
}
