import { StorageClient } from '@supabase/storage-js';

const storageClient = new StorageClient(
  `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/storage/v1`,
  {
    apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
  },
);

export const storage = {
  in(bucketPath: string) {
    return {
      async create() {
        return await storageClient.createBucket(bucketPath, { public: false });
      },
      async upload(filePath: string, file: File | Buffer) {
        return await storageClient.from(bucketPath).upload(filePath, file);
      },
      async update(filePath: string, file: File | Buffer) {
        return await storageClient.from(bucketPath).update(filePath, file);
      },
      async upsert(filePath: string, file: File | Buffer) {
        const res = await storageClient.from(bucketPath).upload(filePath, file);
        if (res.error?.message === 'The resource already exists')
          return await storageClient.from(bucketPath).update(filePath, file);
        return res;
      },
      async delete(filePath?: string | string[]) {
        if (!filePath) return await storageClient.deleteBucket(bucketPath);
        const filePathArray = Array.isArray(filePath) ? filePath : [filePath];
        return await storageClient.from(bucketPath).remove(filePathArray);
      },
      getUrl<T extends string | string[]>(filePath: T): T {
        if (Array.isArray(filePath))
          return filePath.map(
            (path) => storageClient.from(bucketPath).getPublicUrl(path).data.publicUrl,
          ) as T;
        return storageClient.from(bucketPath).getPublicUrl(filePath).data.publicUrl as T;
      },
    };
  },
};
