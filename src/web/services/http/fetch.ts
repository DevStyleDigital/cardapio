import axios from 'axios';
import { regex } from './regex';

function concatWithBaseUrl(url: string, baseUrl: string) {
  if (regex.url.test(url)) return url;
  const newBaseUrl = baseUrl.endsWith('/')
    ? baseUrl.substring(0, baseUrl.length - 1)
    : baseUrl;
  const newUrl = url.startsWith('/') ? url : `/${url}`;
  return newBaseUrl + newUrl;
}

export type HttpFetchOptions = {
  headers?: Partial<{
    'content-type': string;
    Authorization: string;
    'Access-Control-Allow-Origin': string;
    token: string;
    Accept: string;
  }>;
};
type Response<U> = U;

export const httpFetch = (baseUrl: string = '') => ({
  post: async <T, U = Response<T>>(
    url: string,
    data: any,
    options?: HttpFetchOptions,
  ): Promise<U> => {
    return axios
      .post(concatWithBaseUrl(url, baseUrl), data, {
        ...options,
        maxContentLength: 50 * 1024 * 1024,
        timeout: 8 * 1000,
      })
      .then(({ data }) => data);
  },

  delete: async <T, U = Response<T>>(
    url: string,
    options?: HttpFetchOptions,
  ): Promise<U> => {
    return axios
      .delete(concatWithBaseUrl(url, baseUrl), {
        ...options,
        timeout: 4 * 1000,
      })
      .then(({ data }) => data);
  },

  patch: async <T, U = Response<T>>(
    url: string,
    data: any,
    options?: HttpFetchOptions,
  ): Promise<U> => {
    return axios
      .patch(concatWithBaseUrl(url, baseUrl), data, {
        ...options,
        maxContentLength: 50 * 1024 * 1024,
        timeout: 4 * 1000,
      })
      .then(({ data }) => data);
  },

  get: async <T, U = Response<T>>(
    url: string,
    options?: HttpFetchOptions,
  ): Promise<U> => {
    return axios
      .get(concatWithBaseUrl(url, baseUrl), {
        ...options,
        timeout: 4 * 1000,
      })
      .then(({ data }) => data);
  },
});
