import { DragHandleDots2Icon } from '@radix-ui/react-icons';
import { Modal } from '@web/components/Modal';
import { Select } from '@web/components/Select';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Menu } from 'types/menu';
import { Product } from 'types/product';
import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
} from 'react-beautiful-dnd';

export const Order = ({ products, menus }: { products: Product[]; menus: Menu[] }) => {
  const [selectedMenu, setSelectedMenu] = useState<string | undefined>();
  const [selectedType, setSelectedType] = useState<string | undefined>();

  const [productsFiltered, setProductsFiltered] = useState<Product[]>([]);

  useEffect(() => {
    if (!selectedType || !selectedMenu) return;

    setProductsFiltered(
      products.filter(
        ({ menus, types }) => menus === selectedMenu && types === selectedType,
      ),
    );
  }, [selectedMenu, selectedType, products]);

  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return;

    const items = Array.from(productsFiltered);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setProductsFiltered(items);
  }

  return (
    <Modal.Portal className="max-sm:w-full h-full bg-white w-[40rem] rounded-lg max-h-[calc(100vh-4rem)] max-sm:rounded-none overflow-y-auto">
      <div className="p-8 w-full h-full relative flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Edit product order:</h1>
        <div className="flex w-full gap-4 [&>div]:w-full">
          <div>
            <label htmlFor="product-menus" className="font-bold">
              Select a product menu*
            </label>
            <Select
              options={menus.map(({ id, menuName }) => ({
                value: id,
                label: menuName,
              }))}
              id="product-menus"
              required
              onChange={(values) => {
                setSelectedMenu(values[0].value);
              }}
            />
          </div>
          <div>
            <label htmlFor="product-menus" className="font-bold">
              Select a product type*
            </label>
            <Select
              id="product-types"
              options={menus
                .filter((menu) => selectedMenu === menu.id)
                .map((menu) =>
                  menu.productTypes.map(({ id, type }) => ({ value: id, label: type })),
                )
                .flat(1)}
              required
              disabled={!selectedMenu?.length}
              onChange={(values) => setSelectedType(values[0].value)}
            />
          </div>
        </div>
        <div className="flex mt-10">
          <DragDropContext onDragEnd={handleOnDragEnd}>
            {productsFiltered.length ? (
              <Droppable droppableId="droppable">
                {(provided) => (
                  <ul
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-col w-full gap-4"
                  >
                    {productsFiltered.map((product, i) => (
                      <Draggable key={product.id} draggableId={product.id} index={i}>
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="flex items-center justify-between min-h-16 w-full bg-gray-100 p-4 gap-4 rounded-lg "
                          >
                            <div className="flex items-center gap-4">
                              {product.image && (
                                <Image
                                  src={product.image}
                                  alt=""
                                  width={1000}
                                  height={500}
                                  className="object-cover w-16 h-16 rounded-full"
                                />
                              )}

                              <span className="text-xl font-bold">{product.name}</span>
                            </div>
                            <DragHandleDots2Icon className="w-16 h-16 text-slate-300" />
                          </li>
                        )}
                      </Draggable>
                    ))}
                  </ul>
                )}
              </Droppable>
            ) : (
              <span className="opacity-60">
                Você precisa selecionar um menu e um tipo antes.
              </span>
            )}
          </DragDropContext>
        </div>
      </div>
    </Modal.Portal>
  );
};
