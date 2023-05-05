import type { NextApiRequest, NextApiResponse } from 'next';

import { database } from '@server/services/database';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = database({ req, res });
    const { data, error } = await db.from('code').select('code');
    console.log(data);

    if (error || !data?.[0]?.code)
      throw {
        status: 404,
        type: 'not-found',
      };

    return res.status(200).send(data[0].code);
  } catch (err) {
    throw err;
  }
}
