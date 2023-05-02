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

    const db = database({ req, res });

    const { fields, files } = await handleFormData<
      'menuName' | 'productTypes',
      'menuImage'
    >(req);

    const menuName = fields.menuName as string;
    const productTypes = JSON.parse(fields.productTypes as string) as {
      type: string;
      id: string;
    }[];

    const file = files?.[0]?.files?.[0];
    let imageUrl = undefined;
    if (file) {
      await storage.in(`menu/${id}`).delete(`${id}/image`);

      await storage.in('menu').upload(`${id}/image.${file.extension}`, file.file);
      imageUrl = storage.in(`menu/${id}`).getUrl(`image.${file.extension}`);
    }

    await db
      .from('menus')
      .update({
        imageUrl,
        menuName,
        productTypes: productTypes.length ? productTypes : undefined,
      })
      .eq('id', id);

    return res.status(200).send({ message: 'Success' });
  } catch (err) {
    throw err;
  }
}
