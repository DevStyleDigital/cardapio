import { iItemMenu } from './iItemMenu';

export interface iMenu {
  id: number;
  label: string;
  link: string;
  banner?: React.ReactNode;
  menu?: iItemMenu[];
}
