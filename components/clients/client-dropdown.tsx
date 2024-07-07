"use client";

import { Client } from '@prisma/client';
import { MoreHorizontal } from 'lucide-react';
import React from 'react'

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import { DeleteClient } from './delete-client';

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
        <DropdownMenuItem>Editar cliente</DropdownMenuItem>
        <DropdownMenuItem>Criar projeto</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
