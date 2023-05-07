import { GET } from './products.get';
import { POST } from './products.post';
import { PATCH } from './products.patch';
import { DELETE } from './products.delete';
import { GET_ALL } from './products.get-all';
import { GET_ALL_FILTERED } from './products.get-all-filtered';

export const methods = {
  GET: GET_ALL_FILTERED,
};
export const methodsDash = {
  POST,
  GET: GET_ALL,
};
export const methodsDynamic = {
  GET,
  PATCH,
  DELETE,
};
