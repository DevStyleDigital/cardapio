import type { NextApiRequest, NextApiResponse } from 'next';
import { database } from '@server/services/database';
import { storage } from '@server/services/database/storage';

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;

    if (!id)
      throw {
        status: 400,
        type: 'missing-fields',
      };

    const db = database({ req, res });
    await db.from('products').delete().eq('id', id);
    await storage.in(`products/${id}`).delete();

    return res.status(200).send({ message: 'Success' });
  } catch (err) {
    throw err;
  }
}
