import type { NextApiRequest, NextApiResponse } from 'next';

import { database } from '@server/services/database';

export async function PATCH(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = database({ req, res });

    const { code } = req.body;
    if (!code)
      throw {
        status: 400,
        type: 'missing-fields',
      };

    await db.from('code').update({ code }).eq('id', 'code');

    return res.status(200).send({ message: 'Success' });
  } catch (err) {
    throw err;
  }
}
