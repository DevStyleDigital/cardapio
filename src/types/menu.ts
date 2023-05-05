export type ProductType = {
  id: string;
  type: string;
  images?: {
    image?: string | File | null;
    advertiser?: string | File | null;
  };
};

export type Menu = {
  id: string;
  menuName: string;
  menuResponser: string;
  menuImage: string;
  menuAdvertiser: string;
  productTypes: ProductType[];
};
