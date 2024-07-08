"use client";

import { Client } from '@prisma/client';
import { MoreHorizontal } from 'lucide-react';
import React from 'react'

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import { DeleteClient } from './delete-client';
import { CreateProject } from '../projects/create-project';
import { ClientForm } from './client-form';

type Props = {
  client: Client
}

export default function ClientDropdown({ client }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DeleteClient client={
          client
        } />
        <DropdownMenuSeparator />
        <ClientForm client={client} trigger={
          <span className='block cursor-pointer px-2 py-1.5 text-sm transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' role="menuitem">Editar cliente</span>
        } />
        <CreateProject client={client} trigger={
          <span className='cursor-pointer px-2 py-1.5 text-sm transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50' role="menuitem">Criar projeto</span>
        } />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
