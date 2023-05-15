import type { NextApiRequest, NextApiResponse } from 'next';

import { database } from '@server/services/database';

export async function PATCH(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = database({ req, res });

    const { menusOrder } = req.body;
    if (!menusOrder)
      throw {
        status: 400,
        type: 'missing-fields',
      };

    await db
      .from('menus_order')
      .update({ menus_order: menusOrder })
      .eq('id', 'menus_order');

    return res.status(200).send({ message: 'Success' });
  } catch (err) {
    throw err;
  }
}
