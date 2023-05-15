import type { NextApiRequest, NextApiResponse } from 'next';

import { methods } from '@server/routes/menus-order/methods';
import { gatherMethods } from '@server/services/getter-methods';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return gatherMethods(req, res, methods);
}
