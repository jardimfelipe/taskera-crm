"use client";

import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link';
import React, { useMemo } from 'react'

import { DataTable, DataTableSkeleton } from '@/components/ui/data-table'

import { centsToBrl } from '@/utils/currency';
import { formatToPrint } from '@/utils/date';
import { ProjectProgress } from './project-progress';
import { ProjectStatusBadge } from './project-status-badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { ProjectWithTasks } from '@/actions/projects/types';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
  projects: ProjectWithTasks[]
  showClients?: boolean
}

export const ProjectsTable = ({ projects, showClients = false }: Props) => {
  const columns: ColumnDef<ProjectWithTasks>[] = useMemo(() => [
    ...(showClients ? [{
      accessorKey: 'client',
      header: 'Cliente',
      cell: ({ row }: { row: any }) => (
        <div className="flex flex-row items-center gap-2">
          <Avatar>
            <AvatarFallback className="text-2xl">{row.original.client.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span>{row.original.client.name}</span>
          </div>
        </div>
      ),
    }] : []),
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
      accessorKey: 'budget',
      header: 'Orçamento',
      accessorFn: (row) => centsToBrl(row.budget),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <ProjectStatusBadge status={row.original.status} />,
    },
    {
      accessorKey: 'progress',
      header: 'Progresso',
      cell: ({ row }) => (
        <div className='w-[200px]'>
          <ProjectProgress project={row.original} />
        </div>
      ),
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
    <DataTable columns={columns} data={projects} />
  )
}

export const ProjectsTableSkeleton = ({ showClients = false }: { showClients?: Props["showClients"] }) => (

  <DataTableSkeleton columns={
    [
      ...(showClients ? [{
        accessorKey: 'client',
        header: 'Cliente',
      }] : []),
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
        accessorKey: 'budget',
        header: 'Orçamento',
      },
      {
        accessorKey: 'status',
        header: 'Status',
      },
      {
        accessorKey: 'progress',
        header: 'Progresso',
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