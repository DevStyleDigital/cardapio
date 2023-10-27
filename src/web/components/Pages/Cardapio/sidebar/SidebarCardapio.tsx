import LogoVelasco from '@web/assets/svg/logoVelasco';
import { SidebarCardapio } from '.';

export const SideBar = () => {
  return (
    <SidebarCardapio.Fundo>
      <SidebarCardapio.Title>
        <div className="uppercase">Menu Yoshi&#39;s</div>
        {/* <div className="text-white flex text-sm">
          by <LogoVelasco />
        </div> */}
      </SidebarCardapio.Title>
      <SidebarCardapio.Navs />
    </SidebarCardapio.Fundo>
  );
};
