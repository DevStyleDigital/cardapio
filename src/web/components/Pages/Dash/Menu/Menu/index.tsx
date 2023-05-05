import clsx from 'clsx';
import { createContext, useContext, useEffect, useState } from 'react';
import { MenuContent } from './components/MenuContent';
import { MenuPreview } from './components/MenuPreview';

type MenuBaseProps = {
  id: string;
  url: string;
  alt: string;
  text: string;
  onDelete: () => void;
};
type MenuContextProps = MenuBaseProps & {
  menuPreview: boolean;
  handleMenuPreview: () => void;
};

const MenuContext = createContext<MenuContextProps>({} as MenuContextProps);
export const useMenu = () => useContext(MenuContext);

export const Menu: GTypes.FC<MenuBaseProps> = ({
  onDelete,
  url,
  alt,
  id,
  text,
  ...props
}) => {
  const [menuPreview, setMenuPreview] = useState(false);

  function handleMenuPreview() {
    setMenuPreview(!menuPreview);
  }

  useEffect(() => {
    document.addEventListener(
      'keydown',
      ({ key }) => key === 'Escape' && setMenuPreview(false),
    );

    return document.removeEventListener('keydown', () => false);
  }, []);

  return (
    <MenuContext.Provider
      value={{ url, alt, id, text, handleMenuPreview, menuPreview, onDelete }}
    >
      <div
        id={id}
        {...props}
        className={clsx(
          'w-full h-64 group relative rounded-lg transition select-none overflow-hidden cursor-pointer',
          props.className,
        )}
      >
        <MenuContent />
      </div>
      <MenuPreview />
    </MenuContext.Provider>
  );
};
