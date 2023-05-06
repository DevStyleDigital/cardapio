import { v4 as uuidv4 } from 'uuid';

import formidable from 'formidable';
import { readFileSync } from 'fs';
import { NextApiRequest } from 'next';

export const formDataConfig = {
  keepExtensions: true,
};

type Fields<T extends string> = { [key in T]: string | string[] };
type Files<T extends string> = { [key in T]: File | File[] };

function handleFile(file: formidable.File) {
  const filenameSplit = file.mimetype!.split('/');
  const fileExtension = filenameSplit[filenameSplit.length - 1];
  return {
    id: uuidv4(),
    file: readFileSync(file.filepath),
    extension: fileExtension,
    filename: file.originalFilename,
  };
}

export function handleFormData<T extends string, U extends string>(
  req: NextApiRequest,
  opts: Parameters<typeof formidable>[0] = formDataConfig,
): Promise<{
  fields: Fields<T>;
  files: { files: ReturnType<typeof handleFile>[]; key: U }[];
}> {
  return new Promise((resolve, reject) => {
    const form = formidable(opts);

    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err);
      }

      const fieldsTyped = fields as Fields<T>;
      const filesEntries = Object.entries(files);

      const filesFormatted = filesEntries.map(([key, value]) => {
        if (!value) return { files: [], key: key as U };
        if (Array.isArray(value)) return { files: value.map(handleFile), key: key as U };
        return { files: [handleFile(value)], key: key as U };
      });

      return resolve({ fields: fieldsTyped, files: filesFormatted });
    });
  });
}
