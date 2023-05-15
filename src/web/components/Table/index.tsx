/* eslint-disable react/function-component-definition */
import { DataGrid } from '@mui/x-data-grid';
import clsx from 'clsx';

type Column = {
  field: string;
  headerName: string;
  width: number;
  disableColumnMenu?: boolean;
  sortable?: boolean;
};

type TableProps = {
  rows: any[];
  columns: Column[];
  rowActions?: (props: any) => JSX.Element;
};

export function Table({
  rows,
  columns,
  rowActions,
  ...props
}: GTypes.FCProps<TableProps>) {
  const actions = rowActions
    ? [
        {
          field: 'actions',
          headerName: '',
          width: 120,
          sortable: false,
          disableColumnMenu: true,
          headerClassName: 'actions-row',
          renderCell: rowActions,
        },
      ]
    : [];

  return (
    <div
      {...props}
      className={clsx(
        '[&_.actions-row]:pointer-events-none [&_.actions-row]:!border-transparent',
        props.className,
      )}
    >
      <DataGrid
        rows={rows}
        columns={[...columns, ...actions]}
        classes={{
          columnHeaders: 'bg-white',
          virtualScroller: 'bg-gray-100',
          footerContainer: 'bg-white',
          root: 'rounded-lg overflow-hidden',
        }}
      />
    </div>
  );
}
