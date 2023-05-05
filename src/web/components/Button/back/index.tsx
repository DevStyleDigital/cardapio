import Back from "@web/assets/svg/back"
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface BackButtonPropos{
    menuPath: string;
}

const BackButton = ({menuPath}: BackButtonPropos) => {
    return (
        <div className="fixed bottom-8 py-[.8rem] px-10 left-1/2 whitespace-nowrap flex items-center -translate-x-2/4 bg-red-600 rounded-full">
            <Link href={`/${menuPath}`} className="text-white text-md font-bold flex gap-4"><Back /> Voltar ao menu</Link>
        </div>
    )
}

export default BackButton