import type { NextApiRequest, NextApiResponse } from 'next';
import { handleFormData } from '@server/services/handle-form-data';
import { database } from '@server/services/database';
import { storage } from '@server/services/database/storage';

export async function PATCH(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { fields, files } = await handleFormData(req);

    const db = database({ req, res });
    const values = Object.entries(fields);

    if (files?.[0]?.files[0]) {
      await storage.in('home').upsert(fields.path as string, files[0].files[0].file);
      const imageUrl = storage.in('home').getUrl(fields.path);
      await db
        .from('home')
        .update({ [files[0].key]: imageUrl })
        .eq('id', 'home');
    } else {
      await Promise.all(
        values.map(async ([key, value]) => {
          if (value !== 'delete') return;
          await db
            .from('home')
            .update({ [key]: null })
            .eq('id', 'home');
          await storage.in('home').delete(fields.path);
        }),
      );
    }

    return res.status(200).send({ message: 'Success' });
  } catch (err) {
    throw err;
  }
}
