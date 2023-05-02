import clsx from 'clsx';
import { LogoExtended } from './logo-extended';

export const Logo: GTypes.FCIcon & {
  Extended: typeof LogoExtended;
} = ({ ...props }) => (
  <svg
    width="238"
    height="146"
    viewBox="0 0 238 146"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    className={clsx('w-auto h-8', props.className)}
  >
    <path
      d="M168.8 146L132 0H158L180 95.2C181.2 99.8667 182.333 104.867 183.4 110.2C184.467 115.533 185.267 119.867 185.8 123.2C186.333 119.867 187.067 115.533 188 110.2C188.933 104.867 189.933 99.8 191 95L212.8 0H238L201.2 146H168.8Z"
      fill="currentColor"
    />
    <path
      d="M0 146V0H43.4C53.2667 0 61.8 1.86667 69 5.6C76.3333 9.33333 82 14.6 86 21.4C90 28.2 92 36.2667 92 45.6V100.2C92 109.4 90 117.467 86 124.4C82 131.2 76.3333 136.533 69 140.4C61.8 144.133 53.2667 146 43.4 146H0ZM25 123H43.4C50.6 123 56.3333 121 60.6 117C64.8667 112.867 67 107.267 67 100.2V45.6C67 38.6667 64.8667 33.2 60.6 29.2C56.3333 25.0667 50.6 23 43.4 23H25V123Z"
      fill="currentColor"
    />
    <path
      d="M79.3219 36V13H161L166.312 36H79.3219ZM79.3219 85V62H166.522V85H79.3219Z"
      fill="currentColor"
    />
    <path d="M79.3219 109.4V132.4H166.522V109.4H79.3219Z" fill="currentColor" />
  </svg>
);

Logo.Extended = LogoExtended;
