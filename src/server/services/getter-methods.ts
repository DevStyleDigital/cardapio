import type { NextApiRequest, NextApiResponse } from 'next';
import { ERROR_MESSAGES, handleError } from './handler-error';

export type Methods = {
  GET?: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
  POST?: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
  PATCH?: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
  DELETE?: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
};

export async function gatherMethods(
  req: NextApiRequest,
  res: NextApiResponse,
  methods: Methods,
) {
  const method = methods[req.method as keyof Methods];
  if (!method) return res.status(404).send(handleError('method-not-found'));

  try {
    return await method(req, res);
  } catch (err: any) {
    if (err.status && err.type && Object.keys(ERROR_MESSAGES).includes(err.type))
      return res.status(err.status).send(handleError(err.type));
    return res.status(500).send(handleError('internal-error'));
  }
}
