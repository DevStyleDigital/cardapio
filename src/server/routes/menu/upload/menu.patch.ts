import type { NextApiRequest, NextApiResponse } from 'next';
import { handleFormData } from '@server/services/handle-form-data';
import { database } from '@server/services/database';
import { storage } from '@server/services/database/storage';

export async function PATCH(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;

    if (!id)
      throw {
        status: 400,
        type: 'missing-fields',
      };

    const { fields, files } = await handleFormData(req);

    console.log(fields, files);

    const db = database({ req, res });
    const values = Object.entries(fields);

    if (files?.[0]?.files[0]) {
      await storage.in('menus').upsert(fields.path as string, files[0].files[0].file);
      const imageUrl = storage.in('menus').getUrl(fields.path);
      await db
        .from('menus')
        .update({ [files[0].key]: imageUrl })
        .eq('id', id);
    } else {
      await Promise.all(
        values.map(async ([key, value]) => {
          if (value !== 'delete') return;
          await db
            .from('menus')
            .update({ [key]: null })
            .eq('id', id);
          await storage.in('menus').delete(fields.path);
        }),
      );
    }

    return res.status(200).send({ message: 'Success' });
  } catch (err) {
    throw err;
  }
}
