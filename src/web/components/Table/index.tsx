/* eslint-disable react/function-component-definition */
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import clsx from 'clsx';

type Column = {
  field: string;
  headerName: string;
  width: number;
};

type TableProps<T extends Column[]> = {
  rows: { [key in T[number]['field'] | 'id']: string }[];
  columns: T;
};

export function Table<T extends any[]>({
  rows,
  columns,
  ...props
}: GTypes.FCProps<TableProps<T>>) {
  return (
    <div {...props} className={clsx('', props.className)}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
