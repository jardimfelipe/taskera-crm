
import React from 'react'

import { SearchInput } from '@/components/search-input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { db } from '@/lib/db'

import { ClientsTable } from './_components/clients-table'
import { CreateClient } from './_components/create-client'

type Props = {
  searchParams: {
    q: string;
    page: string;
    pageSize: string;
  }
}

const Clients = async ({ searchParams }: Props) => {
  const query = searchParams?.q || "";
  const page = Number(searchParams?.page) || 1;
  const pageSize = Number(searchParams?.pageSize) || 10;

  const clients = await db.client.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    take: 10,
    skip: (page - 1) * 10,
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="p-4">
        <h4 className="scroll-m-20 text-xl font-medium tracking-tight">Meus clientes</h4>
      </div>

      <Card>
        <CardHeader className='flex flex-row items-end gap-2'>
          <SearchInput />
          <CreateClient />
        </CardHeader>
        <CardContent>
          <ClientsTable clients={clients} />
        </CardContent>
      </Card>
    </div>
  )
}

export default Clients