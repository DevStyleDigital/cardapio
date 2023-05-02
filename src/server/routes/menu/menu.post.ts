import type { NextApiRequest, NextApiResponse } from 'next';
import { handleFormData } from '@server/services/handle-form-data';
import { v4 as uuidv4 } from 'uuid';
import { database } from '@server/services/database';
import { storage } from '@server/services/database/storage';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = database({ req, res });

    const { fields, files } = await handleFormData<
      'menuName' | 'productTypes',
      'menuImage'
    >(req);

    if (!files.length || !files[0].files[0])
      throw {
        status: 400,
        type: 'missing-fields',
      };

    const menuName = fields.menuName as string;
    const productTypes = JSON.parse(fields.productTypes as string) as {
      type: string;
      id: string;
    }[];

    if (!menuName.length || !productTypes.length)
      throw {
        status: 400,
        type: 'missing-fields',
      };

    const id = uuidv4();
    const file = files[0].files[0];

    await storage.in('menu').upload(`${id}/image.${file.extension}`, file.file);
    const imageUrl = storage.in(`menu/${id}`).getUrl(`image.${file.extension}`);

    await db.from('menus').insert({ menuName, productTypes, imageUrl, id });

    return res.status(200).send({ message: 'Success' });
  } catch (err) {
    throw err;
  }
}
