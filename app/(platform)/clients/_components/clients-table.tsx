"use client";

import { Client } from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal, Trash } from 'lucide-react';
import Link from 'next/link';
import React, { Suspense, useMemo } from 'react'

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { DeleteClient } from './delete-client';

type Props = {
  clients: Client[]
}

export const ClientsTable = ({ clients }: Props) => {
  const columns: ColumnDef<Client>[] = useMemo(() => [
    {
      accessorKey: "name",
      header: "Nome",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Telefone",
    },
    {
      id: "actions",

      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DeleteClient client={
              row.original as Client
            } />
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><Link href={`clients/${row.original.id}`}>Ver detalhes</Link></DropdownMenuItem>
            <DropdownMenuItem>Ver projetos</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>)
    }
  ], [])
  return (
    <DataTable columns={columns} data={clients} />
  )
}
