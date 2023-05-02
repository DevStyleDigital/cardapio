import type { NextApiRequest, NextApiResponse } from 'next';

import { database } from '@server/services/database';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { auth } = database({ req, res });

    const { error } = await auth.signInWithPassword(req.body);

    if (error)
      throw {
        status: 404,
        type: 'user-not-found',
      };

    return res.status(200).send({ message: 'Success' });
  } catch (err) {
    throw err;
  }
}
