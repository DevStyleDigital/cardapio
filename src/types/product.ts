export type Product = {
  id: string;
  image: string;
  name: string;
  text: string;
  price: string;

  menus: { id: string; name: string }[];
  types: { id: string; name: string }[];
};
