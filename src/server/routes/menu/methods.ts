import { GET } from './menu.get';
import { POST } from './menu.post';
import { PATCH } from './menu.patch';
import { DELETE } from './menu.delete';
import { GET_ALL } from './menu.get-all';

export const methods = {
  GET: GET_ALL,
  POST,
};
export const methodsDynamic = {
  GET,
  PATCH,
  DELETE,
};
