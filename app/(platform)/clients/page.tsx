
import React, { Suspense } from 'react'

import { db } from '@/lib/db'

import { ClientsCard } from './_components/clients-card'
import { SearchParams } from '@/utils/type'
import { ClientsTableSkeleton } from '@/components/clients/clients-table'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { SearchInput } from '@/components/search-input'
import { CreateClient } from '@/components/clients/create-client'

type Props = {
  searchParams: SearchParams
}

const Clients = async ({ searchParams }: Props) => {

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
          <Suspense key={JSON.stringify(searchParams)} fallback={<ClientsTableSkeleton />}>
            <ClientsCard searchParams={searchParams} />
          </Suspense>
        </CardContent>
      </Card>

    </div>
  )
}

export default Clients