export type ProductType = { id: string; type: string };

export type Menu = {
  id: string;
  menuName: string;
  menuImage: string;
  productTypes: ProductType[];
};
