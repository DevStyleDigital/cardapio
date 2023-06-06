import type { NextApiRequest, NextApiResponse } from 'next';

import { database } from '@server/services/database';

export async function PATCH(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = database({ req, res });

    const { menu, type, order } = req.body;

    if (!order || !menu || !type)
      throw {
        status: 400,
        type: 'missing-fields',
      };

    await db
      .from('menus_order')
      .upsert({ menus_order: order, id: `${menu}-${type}` })
      .eq('id', `${menu}-${type}`);

    return res.status(200).send({ message: 'Success' });
  } catch (err) {
    throw err;
  }
}
