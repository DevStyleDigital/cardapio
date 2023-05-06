import { Banner } from '@web/components/Banner';
import { purifyText } from '@web/services/purifyText';

const HeaderBanner = ({ text, url, responser }: { url: string; text: string; responser: string }) => {
  return (
    <Banner
      alt=""
      enableBackdrop
      url={url}
      responser={responser}
      className="sticky top-0 border-b-red-600 border-b-2"
    > 
      {text}
    </Banner>
  );
};

export default HeaderBanner;
