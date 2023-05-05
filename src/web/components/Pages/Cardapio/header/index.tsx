import { Banner } from '@web/components/Banner';

const HeaderBanner = ({ text, url }: { url: string; text: string }) => {
  return (
    <Banner
      alt=""
      enableBackdrop
      url={url}
      className="sticky top-0 border-b-red-600 border-b-2"
    >
      {text}
    </Banner>
  );
};

export default HeaderBanner;
