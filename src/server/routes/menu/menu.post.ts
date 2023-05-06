import type { NextApiRequest, NextApiResponse } from 'next';
import { handleFormData } from '@server/services/handle-form-data';
import { v4 as uuidv4 } from 'uuid';
import { database } from '@server/services/database';
import { storage } from '@server/services/database/storage';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = database({ req, res });

    const { fields, files } = await handleFormData<
      'menuName' | 'productTypes' | 'menuResponser',
      'menuImage' | 'menuAdvertiser' | 'productTypesAdvertiser' | 'productTypesImage'
    >(req);

    if (!files.length)
      throw {
        status: 400,
        type: 'missing-fields',
      };

    const menuName = fields.menuName as string;
    const menuResponser = fields.menuResponser as string;
    let productTypes = JSON.parse(fields.productTypes as string) as {
      type: string;
      id: string;
      images: {
        advertiser: string;
        image: string;
      };
    }[];
    productTypes = productTypes.map((productType) => {
      return {
        ...productType,
        images: { advertiser: '', image: '' },
      };
    });

    if (!menuName.length || !productTypes.length)
      throw {
        status: 400,
        type: 'missing-fields',
      };

    const id = uuidv4();

    let errorImage = false;
    let menuImage;
    let menuAdvertiser;
    await Promise.all(
      files.map(async ({ files: filesByKey, key }) => {
        if (key === 'menuImage') {
          const file = filesByKey[0];
          const { error } = await storage
            .in(`menus/${id}`)
            .upload(`image.${file.extension}`, file.file);
          if (error) return (errorImage = true);
          menuImage = storage.in(`menus/${id}`).getUrl(`image.${file.extension}`);
        }

        if (key === 'menuAdvertiser') {
          const file = filesByKey[0];
          const { error } = await storage
            .in(`menus/${id}`)
            .upload(`advertiser.${file.extension}`, file.file);
          if (error) return (errorImage = true);
          menuAdvertiser = storage
            .in(`menus/${id}`)
            .getUrl(`advertiser.${file.extension}`);
        }
        await Promise.all(
          productTypes.map(async (productType) => {
            if (key.includes(productType.id)) {
              const file = filesByKey[0];
              const { error } = await storage
                .in(`menus/${id}`)
                .upload(
                  `product-type/${productType.id}/${file.filename}.${file.extension}`,
                  file.file,
                );
              if (error) return (errorImage = true);
              productType.images[file.filename as 'image'] = storage
                .in(`menus/${id}/product-type/${productType.id}`)
                .getUrl(`${file.filename}.${file.extension}`);
            }
            return productType;
          }),
        );
      }),
    );

    if (errorImage) throw 'error';

    const { error: errorProductTypes } = await db.from('product_types').insert(
      productTypes.map((productType) => ({
        id: productType.id,
        menuId: id,
        type: productType.type,
        image: productType.images.image,
        advertiser: productType.images.advertiser,
      })),
    );

    if (errorProductTypes) throw 'error';

    const { error } = await db.from('menus').insert({
      menuResponser,
      menuName,
      menuAdvertiser,
      menuImage,
      productTypes: productTypes.map(({ id }) => id),
      id,
    });

    if (error) throw 'error';

    return res.status(200).send({ message: 'Success' });
  } catch (err) {
    throw err;
  }
}
