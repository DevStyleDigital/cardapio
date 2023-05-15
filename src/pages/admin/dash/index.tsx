import type { GetServerSideProps } from 'next';
import {
  ArchiveIcon,
  BookmarkFilledIcon,
  Link1Icon,
  ReaderIcon,
} from '@radix-ui/react-icons';
import { Button } from '@web/components/Button';
import { ImageDropzone } from '@web/components/ImageDropzone';
import { Input } from '@web/components/Input';
import { http } from '@web/services/http';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Dash = ({ homeImageDb }: { homeImageDb: string | null }) => {
  const [loading, setLoading] = useState(false);
  const [homeImage, setHomeImage] = useState<File | null>(null);

  async function submitImage(
    validDelete: boolean,
    key: string,
    filepath: string,
    file: any,
    route?: string,
  ) {
    const formData = new FormData();
    formData.append('path', filepath);

    let makeFetch;
    if (!file && validDelete) {
      formData.append(key, 'delete');
      makeFetch = true;
    } else if (
      !!file &&
      file?.name !== 'default-image.webp' &&
      typeof file !== 'string'
    ) {
      makeFetch = true;
      formData.append(key, file, key);
    }
    makeFetch &&
      (await http
        .patch(route || `/api/menu/${filepath.split('/')[0]}/upload`, formData, {
          headers: { 'content-type': 'application/x-www-form-urlencode' },
        })
        .then((res) => res)
        .catch(() => toast.error('Ocurred an error on submit a few images!')));
  }

  function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setLoading(true);

    submitImage(!!homeImageDb, 'homeImage', 'home/image.webp', homeImage)
      .then(async (res) => {
        toast.success('Image edited!');
        return res;
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(async () => {
        setLoading(false);
      });
  }
  return (
    <main className="bg-gray-200 w-full py-16 px-8">
      <form onSubmit={handleSubmit} className="mb-10">
        <Input.Root id="menu-image" error={null}>
          <Input.Label>Patrocinador Início:</Input.Label>
          <div>
            <ImageDropzone
              required
              id="menu-image"
              className="rounded-md border-2 border-dashed border-gray-400 max-h-64"
              onFileUpload={setHomeImage}
              defaultValue={
                homeImage === undefined
                  ? undefined
                  : homeImage || (homeImageDb && `${homeImageDb}?v=${Date.now()}`)
              }
            />
          </div>
        </Input.Root>
        <Button type="submit" loading={loading} className="gap-2 py-4">
          <span>Save</span>
          <BookmarkFilledIcon className="w-5 h-5" />
        </Button>
      </form>
      <ul className="flex flex-wrap justify-center gap-4">
        {[
          {
            href: '/admin/dash/menu',
            name: 'Menu',
            Icon: ReaderIcon,
          },
          {
            href: '/admin/dash/products',
            name: 'Products',
            Icon: ArchiveIcon,
          },
        ].map(({ href, Icon, name }) => (
          <li
            key={href}
            className="w-full h-fit hover:shadow-sm transition group bg-white shadow-md rounded-lg"
          >
            <Link
              href={href}
              className="p-8 gap-8 flex flex-col items-center justify-center"
            >
              <span className="text-4xl flex gap-4 items-center group-hover:text-primary-400 transition">
                <span>{name}</span> <Link1Icon className="w-10 h-10" />
              </span>
              <Icon className="w-10 h-10" />
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const home = await http
    .get<{ homeImage: string }>('/api/home')
    .then((res) => res)
    .catch(() => null);

  return {
    props: {
      homeImageDb: home?.homeImage || null,
    },
  };
};

export default Dash;
