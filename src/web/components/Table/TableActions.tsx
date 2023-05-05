'use client';
import { IconButton } from '@mui/material';
import { Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';

export const TableActions = ({
  onClickDelete,
  onClickEdit,
}: {
  onClickDelete?: () => void;
  onClickEdit?: () => void;
}) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <IconButton onClick={() => onClickEdit && onClickEdit()}>
        <Pencil2Icon />
      </IconButton>
      <IconButton onClick={() => onClickDelete && onClickDelete()}>
        <TrashIcon />
      </IconButton>
    </div>
  );
};
