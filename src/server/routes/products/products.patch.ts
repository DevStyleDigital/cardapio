import type { NextApiRequest, NextApiResponse } from 'next';
import type { Product } from 'types/product';
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

    const db = database({ req, res });

    const {
      fields: { types, menus, ...fields },
      files,
    } = await handleFormData<keyof Product, 'image'>(req);

    const typesParsed = JSON.parse(types as string) as Product['types'];
    const menusParsed = JSON.parse(menus as string) as Product['menus'];

    const file = files?.[0]?.files?.[0];
    let imageUrl;
    if (file) {
      await storage.in(`products/${id}`).delete();
      await storage.in('products').upload(`${id}/image.${file.extension}`, file.file);
      imageUrl = storage.in(`products/${id}`).getUrl(`image.${file.extension}`);
    }

    if (fields.image === 'delete')
      await storage.in('products').delete(`${id}/image.webp`);

    await db
      .from('products')
      .update({
        ...fields,
        image: fields.image === 'delete' ? null : imageUrl,
        types: typesParsed,
        menus: menusParsed,
      })
      .eq('id', id);

    return res.status(200).send({ message: 'Success' });
  } catch (err) {
    throw err;
  }
}
