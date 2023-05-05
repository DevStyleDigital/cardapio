import { GET } from './products.get';
import { POST } from './products.post';
import { PATCH } from './products.patch';
import { DELETE } from './products.delete';
import { GET_ALL } from './products.get-all';

export const methods = {
  POST,
  GET: GET_ALL,
};
export const methodsDynamic = {
  GET,
  PATCH,
  DELETE,
};
