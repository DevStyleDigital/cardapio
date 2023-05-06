import { ArchiveIcon, Link1Icon, ReaderIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

const Dash = () => {
  return (
    <main className="bg-gray-200 w-full py-16 px-8">
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

export default Dash;
