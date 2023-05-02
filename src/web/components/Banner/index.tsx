import { purifyText } from '@web/services/purifyText';
import clsx from 'clsx';
import Image from 'next/image';

type BannerProps = {
  alt: string;
  url: string;
  children: string;
  enableBackdrop?: boolean;
};

const BannerRoot: GTypes.FC = ({ ...props }) => {
  return (
    <div
      {...props}
      className={clsx('w-full h-fit relative overflow-hidden', props.className)}
    />
  );
};

const BannerBackdrop = () => {
  return <div className="absolute inset-0 bg-black opacity-40" aria-hidden />;
};

const BannerText: GTypes.FC<{ children: string }> = ({ children, ...props }) => {
  return (
    <div
      {...props}
      className={clsx(
        'absolute inset-0 flex items-end md:text-6xl sm:text-4xl text-3xl uppercase p-8 text-white font-light',
        props.className,
      )}
    >
      <span dangerouslySetInnerHTML={{ __html: purifyText(children) }} />
    </div>
  );
};

export const Banner: GTypes.FC<BannerProps> & {
  Backdrop: typeof BannerBackdrop;
  Root: typeof BannerRoot;
  Text: typeof BannerText;
} = ({ alt, url, children, enableBackdrop, ...props }) => {
  return (
    <BannerRoot {...props}>
      <Image
        alt={alt}
        src={url}
        width={2080}
        height={2080}
        className="w-full lg:h-[30rem] md:h-96 sm:h-80 h-64 object-cover object-center"
      />
      {enableBackdrop && <BannerBackdrop />}
      <BannerText>{children}</BannerText>
    </BannerRoot>
  );
};

Banner.Backdrop = BannerBackdrop;
Banner.Root = BannerRoot;
Banner.Text = BannerText;
