import type { NextApiRequest, NextApiResponse } from 'next';
import type { Product } from 'types/product';
import { handleFormData } from '@server/services/handle-form-data';
import { v4 as uuidv4 } from 'uuid';
import { database } from '@server/services/database';
import { storage } from '@server/services/database/storage';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = database({ req, res });

    const {
      fields: { types, menus, ...fields },
      files,
    } = await handleFormData<keyof Product, 'image'>(req);

    // if (!files.length || !files[0].files[0])
    //   throw {
    //     status: 400,
    //     type: 'missing-fields',
    //   };

    const typesParsed = JSON.parse(types as string) as Product['types'];
    const menusParsed = JSON.parse(menus as string) as Product['menus'];

    if (
      !fields.name ||
      !fields.price ||
      !fields.text ||
      !typesParsed.length ||
      !menusParsed.length
    )
      throw {
        status: 400,
        type: 'missing-fields',
      };

    const id = uuidv4();

    const file = files?.[0]?.files?.[0];
    let imageUrl;
    if (file) {
      await storage.in('products').upload(`${id}/image.${file.extension}`, file.file);
      imageUrl = storage.in(`products/${id}`).getUrl(`image.${file.extension}`);
    }

    await db
      .from('menus')
      .insert({ ...fields, types: typesParsed, menus: menusParsed, imageUrl, id });

    return res.status(200).send({ message: 'Success' });
  } catch (err) {
    throw err;
  }
}
