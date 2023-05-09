import type { NextApiRequest, NextApiResponse } from 'next';
import { database } from '@server/services/database';

export async function PATCH(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;

    if (!id)
      throw {
        status: 400,
        type: 'missing-fields',
      };

    const db = database({ req, res });

    const { error } = await db
      .from('menus')
      .update({ ...req.body })
      .eq('id', id);

    if (error) throw 'error';

    return res.status(200).send({ id });
  } catch (err) {
    throw err;
  }
}
