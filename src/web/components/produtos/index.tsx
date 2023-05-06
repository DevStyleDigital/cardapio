import Image from 'next/image';
import Link from 'next/link';
import { Modal } from '../Modal';
import { Cross1Icon } from '@radix-ui/react-icons';

interface ProdutoProps {
  nome: string;
  descricao: string;
  preco: string;
  img?: string;
}
const ProdutosContent = ({ nome, descricao, preco, img }: ProdutoProps) => {
  return (
    <>
      <Modal.Root id="product-modal">
        <Modal.Trigger className="text-start" asChild>
          <div className="w-full flex items-center gap-4 py-4 h-auto min-h-[150px] border-b-[1px] border-gray-100/30">
            <div className="w-full flex flex-col gap-2">
              <div className="w-full flex flex-col gap-2">
                <h1 className="text-lg break-all text-white/95">{nome}</h1>
                <p className="text-[0.7rem] break-all text-white/70">{descricao}</p>
              </div>
              <p className="h-full text-white flex items-center gap-1">
                <span className="text-sm">R$</span>
                <span className="text-lg">{preco}</span>
              </p>
            </div>
            {img && (
              <div className="w-full h-full max-h-[110px] max-w-[130px] md:max-h-[140px] md:max-w-[160px]  bg-golden-400 shadow-lg shadow-black/80">
                <Image
                  className="w-full h-full"
                  blurDataURL={img}
                  placeholder="blur"
                  loading="lazy"
                  src={img}
                  width={400}
                  height={400}
                  alt="img-product"
                />
              </div>
            )}
          </div>
        </Modal.Trigger>
        <Modal.Portal
          className="w-full h-full"
          classNames={{ container: '!z-[999]', backdrop: 'bg-black/100' }}
        >
          <Modal.Trigger className="relative w-screen h-screen">
            <div className="text-white absolute top-12 right-8">
              <Cross1Icon className="w-16 h-16 text-golden-400" />
            </div>
          </Modal.Trigger>
          <div className="fixed w-full sm:w-[50%] h-auto min-h-[50%] top-1/2 -translate-y-1/2 flex flex-col sm:translate-x-1/2 gap-4 p-4">
            {img && (
              <div className="w-full max-w-[630px] bg-golden-400 shadow-lg shadow-black/80">
                <Image
                  className="w-full h-full"
                  src={img}
                  width={400}
                  height={400}
                  alt="img-product"
                />
              </div>
            )}
            <div className="w-full flex flex-col max-h-[40vh] overflow-auto gap-2 py-4 pr-6 lg:pr-4 2xl:pr-[30%]">
              <div className="w-full flex flex-col gap-2">
                <h1 className="text-xl break-all text-white/95">{nome}</h1>
                <p className="text-md lg:text-lg break-all text-white/70">{descricao}</p>
              </div>
              <p className="h-full text-white flex items-center gap-1">
                <span className="text-md">R$</span>
                <span className="text-xl">{preco}</span>
              </p>
            </div>
          </div>
        </Modal.Portal>
      </Modal.Root>
    </>
  );
};
export default ProdutosContent;
