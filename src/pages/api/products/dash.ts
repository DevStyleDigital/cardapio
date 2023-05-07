import type { NextApiRequest, NextApiResponse } from 'next';

import { methodsDash } from '@server/routes/products/methods';
import { gatherMethods } from '@server/services/getter-methods';

export const config = {
  api: {
    responseLimit: false,
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return gatherMethods(req, res, methodsDash);
}
