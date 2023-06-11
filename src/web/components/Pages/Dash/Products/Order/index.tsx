import {
  DragHandleDots2Icon,
  DrawingPinFilledIcon,
  PlusIcon,
} from '@radix-ui/react-icons';
import { Modal } from '@web/components/Modal';
import ReactDOM from 'react-dom';
import { Select } from '@web/components/Select';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Menu } from 'types/menu';
import { Product } from 'types/product';
import {
  DragDropContext,
  Draggable,
  Droppable,
  type DropResult,
} from 'react-beautiful-dnd';
import { Button } from '@web/components/Button';
import { http } from '@web/services/http';
import { toast } from 'react-toastify';

function isArrayEqual<T>(array1: T[], array2: T[]): boolean {
  if (array1.length !== array2.length) {
    return false;
  }

  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }

  return true;
}

export const Order = ({
  products,
  menus,
  orders,
}: {
  products: Product[];
  menus: Menu[];
  orders: { [key: string]: string[] };
}) => {
  const [selectedMenu, setSelectedMenu] = useState<string | undefined>();
  const [selectedType, setSelectedType] = useState<string | undefined>();

  const [productsFiltered, setProductsFiltered] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!selectedType || !selectedMenu) return;

    setProductsFiltered(
      products
        .filter(({ menus, types }) => menus === selectedMenu && types === selectedType)
        .sort(
          (a, b) =>
            (orders[`${selectedMenu}-${selectedType}`] || []).indexOf(a.id) -
            (orders[`${selectedMenu}-${selectedType}`] || []).indexOf(b.id),
        ),
    );
  }, [selectedMenu, selectedType, products, orders]);

  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return;

    const items = Array.from(productsFiltered);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setProductsFiltered(items);
  }

  function editOrder() {
    setLoading(true);
    const order = productsFiltered.map(({ id }) => id);

    if (isArrayEqual(order, orders[`${selectedMenu}-${selectedType}`])) {
      setLoading(false);
      return toast.success('Ordem atualizada com sucesso');
    }

    http
      .patch('/api/products-order', {
        menu: selectedMenu,
        type: selectedType,
        order,
      })
      .then(() => toast.success('Ordem atualizada com sucesso'))
      .catch(() => toast.error('Ops... Ocorreu um erro tente novamente mais tarde.'))
      .finally(() => setLoading(false));
  }

  return (
    <div className="p-8 max-md:p-0 pt-0 w-full h-full flex flex-col gap-4 relative overflow-auto pb-10">
      <h1 className="text-3xl font-bold">Edit product order:</h1>
      <div className="flex w-full gap-4 [&>div]:w-full max-md:flex-col">
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
      <div className="flex mt-6">
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
                      {(provided) => {
                        return (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="flex top-0 left-0 items-center justify-between min-h-16 w-full bg-gray-100 p-4 gap-4 rounded-lg "
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
                        );
                      }}
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
      <Button
        className="gap-4 mt-6 bg-white !text-primary-400 hover:bg-slate-100"
        loading={loading}
        onClick={editOrder}
      >
        <span>Save</span>
        <DrawingPinFilledIcon className="w-6 h-6 pointer-events-none" />
      </Button>
    </div>
  );
};
