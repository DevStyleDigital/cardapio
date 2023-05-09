import type { NextApiRequest, NextApiResponse } from 'next';

import { methods } from '@server/routes/menu/upload/methods';
import { gatherMethods } from '@server/services/getter-methods';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return gatherMethods(req, res, methods);
}
