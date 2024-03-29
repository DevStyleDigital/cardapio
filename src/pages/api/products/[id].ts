import type { NextApiRequest, NextApiResponse } from 'next';

import { methodsDynamic } from '@server/routes/products/methods';
import { gatherMethods } from '@server/services/getter-methods';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return gatherMethods(req, res, methodsDynamic);
}
