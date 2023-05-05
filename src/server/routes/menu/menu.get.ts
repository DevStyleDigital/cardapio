import type { NextApiRequest, NextApiResponse } from 'next';
import type { ProductType } from 'types/menu';
import { database } from '@server/services/database';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;

    if (!id)
      throw {
        status: 400,
        type: 'missing-fields',
      };

    const db = database({ req, res });
    const { data, error } = await db.from('menus').select('*').eq('id', id);

    if (!data?.length || error)
      throw {
        status: 404,
        type: 'not-found',
      };

    const { data: productTypesData, error: productTypesError } = await db
      .from('product_types')
      .select('*')
      .eq('menuId', data[0].id);

    if (!productTypesData?.length || productTypesError)
      throw {
        status: 404,
        type: 'not-found',
      };

    return res.status(200).send({
      ...data[0],
      productTypes: productTypesData.map(
        (productType) =>
          ({
            id: productType.id,
            type: productType.type,
            images: { advertiser: productType.advertiser, image: productType.image },
          } as ProductType),
      ),
    });
  } catch (err) {
    throw err;
  }
}
