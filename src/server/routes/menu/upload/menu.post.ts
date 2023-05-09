import type { NextApiRequest, NextApiResponse } from 'next';
import { database } from '@server/services/database';
import { handleFormData } from '@server/services/handle-form-data';
import { storage } from '@server/services/database/storage';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const db = database({ req, res });

    const { fields, files } = await handleFormData(req);

    let imageUrl;
    if (files?.[0]?.files[0]) {
      await storage.in('menus').upload(fields.path as string, files[0].files[0].file);
      imageUrl = storage.in('menus').getUrl(fields.path);
      await db
        .from('menus')
        .update({ [files[0].key]: imageUrl })
        .eq('id', id);
    }

    return res.status(200).send({ message: 'Success' });
  } catch (err) {
    throw err;
  }
}
