import type { NextApiRequest, NextApiResponse } from 'next';
import { database } from '@server/services/database';
import { storage } from '@server/services/database/storage';

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const { productTypesDeleted } = req.body;
    const db = database({ req, res });

    await Promise.all(
      productTypesDeleted.map(async (ptid: string) => {
        await db.from('product_types').delete().eq('id', ptid);
        await storage.in('menus').delete(`${id}/product-type/${ptid}`);
      }),
    );

    return res.status(200).send({ message: 'Success' });
  } catch (err) {
    throw err;
  }
}
