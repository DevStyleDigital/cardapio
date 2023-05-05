import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import url from 'url';
interface MenuItemProps {
  nome: string;
  menu: string;
  link: string;
  img?: string;
}
const MenuItem = ({ nome, menu, link, img }: MenuItemProps) => {
  const router = useRouter();
  function push(nome: string) {
    const objetoState = { nome };
    const urlObjeto = {
      pathname: `/${menu}/${link}`,
    };
    const urlString = url.format(urlObjeto);
    const urlCompleta = `${urlString}?${new URLSearchParams(objetoState).toString()}`;
    router.push(urlCompleta);
  }
  return (
    <button
      onClick={()=> push(nome) }
      className="w-full flex flex-col items-center gap-2 h-auto min-h-[160px] "
    >
      <div className="w-full h-full bg-golden-400 shadow-lg shadow-black/90">
        {img && (
          <Image className='w-full h-full' src={img} alt='img-menu' width={400} height={400} />
        )}
      </div>
      <div className="w-full flex flex-col items-center gap-2">
        <h1 className="text-white text-sm">{nome}</h1>
        <div className="w-3/4 h-px bg-golden-400"></div>
      </div>
    </button>
  );
};
export default MenuItem;
