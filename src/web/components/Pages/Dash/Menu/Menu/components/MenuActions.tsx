import { EyeOpenIcon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import { useMenu } from '..';
import { useRouter } from 'next/router';
import { http } from '@web/services/http';
import { toast } from 'react-toastify';

export const MenuActions = () => {
  const router = useRouter();
  const { handleMenuPreview, id, onDelete } = useMenu();

  return (
    <div
      className="absolute inset-0 p-8"
      onClick={(ev) => {
        if (!['preview', 'delete', 'edit'].includes((ev.target as HTMLElement).id))
          handleMenuPreview();
      }}
    >
      <button
        className="action-icon-btn absolute left-0 bottom-0"
        aria-label="Preview"
        title="Preview"
        id="preview"
        onClick={handleMenuPreview}
      >
        <EyeOpenIcon className="w-4 h-4 pointer-events-none" />
      </button>
      <button
        className="action-icon-btn absolute right-0 top-0"
        aria-label="Delete"
        title="Delete"
        id="delete"
        onClick={async () => {
          await http
            .delete(`/api/menu/${id}`)
            .then(() => {
              onDelete();
              toast.success('Menu deleted successful!');
            })
            .catch(({ response: { data: err } }) => toast.error(err.message));
        }}
      >
        <TrashIcon className="w-4 h-4 pointer-events-none" />
      </button>
      <button
        className="action-icon-btn absolute right-0 bottom-0"
        aria-label="Edit"
        title="Edit"
        id="edit"
        onClick={() => router.push(`/admin/dash/menu/${id}`)}
      >
        <Pencil1Icon className="w-4 h-4 pointer-events-none" />
      </button>
    </div>
  );
};
