import clsx from 'clsx';
import { LogoExtended } from './logo-extended';

export const Logo: GTypes.FCIcon & {
  Extended: typeof LogoExtended;
} = ({ ...props }) => (
  <h1>Yoshi's</h1>
);

Logo.Extended = LogoExtended;
