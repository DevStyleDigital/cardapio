import type { NextApiRequest, NextApiResponse } from 'next';
import type { Product } from 'types/product';
import { handleFormData } from '@server/services/handle-form-data';
import { v4 as uuidv4 } from 'uuid';
import { database } from '@server/services/database';
import { storage } from '@server/services/database/storage';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = database({ req, res });

    const { fields, files } = await handleFormData<keyof Product, 'image'>(req);

    // if (!files.length || !files[0].files[0])
    //   throw {
    //     status: 400,
    //     type: 'missing-fields',
    //   };

    if (!fields.name || !fields.price || !fields.text || !fields.types || !fields.menus)
      throw {
        status: 400,
        type: 'missing-fields',
      };

    const id = uuidv4();

    const file = files?.[0]?.files?.[0];
    let image;
    let imageError = false;
    if (file) {
      const { error } = await storage
        .in('products')
        .upload(`${id}/image.${file.extension}`, file.file);
      image = storage.in(`products/${id}`).getUrl(`image.${file.extension}`);
      imageError = !!error;
    }

    if (imageError) throw 'error';

    const { error } = await db.from('products').insert({ ...fields, image, id });

    if (error) throw 'error';

    return res.status(200).send({ message: 'Success' });
  } catch (err) {
    throw err;
  }
}
