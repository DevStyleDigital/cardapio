export type { HttpFetchOptions } from './fetch';

import { httpFetch } from './fetch';

export const http = {
  ...httpFetch(process.env.HOST || 'http://localhost:3000'),
};
