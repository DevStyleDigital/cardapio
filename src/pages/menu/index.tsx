import Image from "next/image";
import Router from 'next/router'
import FundoImg from "../../web/assets/img/fundo.png"
import Fechar from "@web/assets/svg/fechar";
import { MenuItens } from "@web/utils/menu";
import Logo from "../../web/assets/img/logo2.png"
const Menu = () => {
    return (
        <section className="w-full h-screen relative bg-black">
           <Image className="w-full h-full" src={FundoImg} alt="fundo-inicio" width={1290}  height={2793} />
            <div className="absolute w-full flex flex-col p-14 top-0 h-full z-50">
                <div className="text-golden-400 flex justify-between items-center uppercase tracking-2">
                    <h1 className="text-sm">Menu Yoshi's</h1>
                    <div onClick={() => Router.back()}>
                        <Fechar />
                    </div>
                </div>
                <div className="w-full h-full flex flex-col pt-18 justify-center lg:items-center  gap-10">
                        {MenuItens.map((item, index) => {
                            return (
                                <div className="flex flex-col gap-6 md:gap-10 lg:items-center">
                                    <h1 key={item.id} className="text-white uppercase text-xl md:text-3xl tracking-4">{item.label}</h1>
                                    {(MenuItens.length - 1) > index  && (
                                        <div className="w-10/12 sm:w-3/6 md:w-6/12 lg:w-full h-px bg-red-600"></div>
                                    )}
                                </div>
                            )
                        })}
                        <div className="flex justify-end">
                            <Image className="w-1/4 h-auto md:w-1/6 lg:w-32" src={Logo} alt="Logo" width={378}  height={520} />
                        </div>
                </div>
            </div>
        </section>
    )
}

export default Menu