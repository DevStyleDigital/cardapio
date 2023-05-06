import Image from 'next/image';
import { MenuActions } from './MenuActions';
import { useMenu } from '..';

export const MenuContent = () => {
  const { alt, url, text } = useMenu();

  return (
    <>
      <Image
        alt={alt}
        src={`${url}?v=${Date.now()}`}
        width={2080}
        height={2080}
        className="w-full h-full object-cover object-center"
      />
      <div
        className="absolute inset-0 bg-black transition opacity-25 group-hover:opacity-50"
        aria-hidden
      />
      <div className="absolute inset-0 p-8">
        <span className="font-bold text-2xl uppercase text-white">{text}</span>
      </div>
      <MenuActions />
    </>
  );
};
