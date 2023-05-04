import Link from 'next/link';

interface MenuItemProps {
  nome: string;
  menu: string;
  link: string;
}
const MenuItem = ({ nome, menu, link }: MenuItemProps) => {
  return (
    <Link
      href={`/${menu}/${link}`}
      className="w-full flex flex-col items-center gap-2 h-auto min-h-[160px]"
    >
      <div className="w-full h-full bg-golden-400"></div>
      <div className="w-full flex flex-col items-center gap-2">
        <h1 className="text-white text-sm">{nome}</h1>
        <div className="w-3/4 h-px bg-golden-400"></div>
      </div>
    </Link>
  );
};
export default MenuItem;
