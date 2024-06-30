'use client';

import { ColumnDef } from '@tanstack/react-table';
import CellAction from './cell-action';

export type OrderColumn = {
  id: string;
  storeId: string;
  isPaid: boolean;
  phone: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: 'products',
    header: 'Products'
  },
  {
    accessorKey: 'phone',
    header: 'Phone'
  },
  {
    accessorKey: 'address',
    header: 'Address'
  },
  {
    accessorKey: 'totalPrice',
    header: 'Total Price'
  },
  {
    accessorKey: 'isPaid',
    header: 'Paid'
  },
  {
    accessorKey: 'createdAt',
    header: 'Date'
  },
  {
    accessorKey: 'Actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
