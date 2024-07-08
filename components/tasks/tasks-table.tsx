"use client";

import { Button } from '@/components/ui/button';
import { DataTable, DataTableSkeleton } from '@/components/ui/data-table';
import { Skeleton } from '@/components/ui/skeleton';
import { formatToPrint } from '@/utils/date';
import { Task } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table';
import { Eye } from 'lucide-react';
import Link from 'next/link';
import React, { useMemo } from 'react'
import { StatusBadge } from '../ui/status-badge';

export const TasksTable = ({ tasks }: { tasks: Task[] }) => {
  const columns: ColumnDef<Task>[] = useMemo(() => [
    {
      accessorKey: 'name',
      header: 'Nome',
    },
    {
      accessorKey: 'startAt',
      header: 'Previsão de início',
      accessorFn: (row) => formatToPrint(row.startAt),
    },
    {
      accessorKey: 'endAt',
      header: 'Previsão de término',
      accessorFn: (row) => formatToPrint(row.endAt),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <Button variant="link" asChild>
          <Link href={`/projects/${row.original.id}`}><Eye /></Link>
        </Button>
      ),
    },

  ], [])
  return (
    <DataTable columns={columns} data={tasks} />
  )
}

export const TasksTableSkeleton = () => (
  <DataTableSkeleton columns={
    [
      {
        accessorKey: 'name',
        header: 'Nome',
      },
      {
        accessorKey: 'startAt',
        header: 'Previsão de início',
      },
      {
        accessorKey: 'endAt',
        header: 'Previsão de término',
      },
      {
        accessorKey: 'status',
        header: 'Status',
      },
      {
        id: 'actions',
        cell: () => (
          <Skeleton className="w-8 h-8" />
        )
      },
    ]
  } />
)
