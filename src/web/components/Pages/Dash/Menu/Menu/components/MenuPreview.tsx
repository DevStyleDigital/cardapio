import { useMenu } from '..';
import { Banner } from '@web/components/Banner';

export const MenuPreview = () => {
  const { menuPreview, handleMenuPreview, url, alt, text } = useMenu();

  return menuPreview ? (
    <div
      className="fixed user-select-none z-50 w-full h-screen flex items-center top-0 left-0 bg-black/60"
      onClick={handleMenuPreview}
    >
      <Banner alt={alt} url={url}>
        {text}
      </Banner>
    </div>
  ) : (
    <></>
  );
};
