import type { NextApiRequest, NextApiResponse } from 'next';
import type { ProductType } from 'types/menu';
import { database } from '@server/services/database';

export async function GET_ALL(req: NextApiRequest, res: NextApiResponse) {
  try {
    const db = database({ req, res });
    const { data, error } = await db.from('menus').select('*');

    if (!data?.length || error)
      throw {
        status: 404,
        type: 'not-found',
      };

    let productTypeError = false;
    const newData = await Promise.all(
      data.map(async (menu) => {
        const { data: productTypesData, error: productTypesError } = await db
          .from('product_types')
          .select('*')
          .eq('menuId', menu.id);
        if (!productTypesData?.length || productTypesError) productTypeError = true;

        return {
          ...menu,
          productTypes: (productTypesData || []).map(
            (productType) =>
              ({
                id: productType.id,
                type: productType.type,
                images: { advertiser: productType.advertiser, image: productType.image },
              } as ProductType),
          ),
        };
      }),
    );

    if (productTypeError)
      throw {
        status: 404,
        type: 'not-found',
      };

    return res.status(200).send(newData);
  } catch (err) {
    throw err;
  }
}
