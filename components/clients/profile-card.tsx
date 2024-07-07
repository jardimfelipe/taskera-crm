import { redirect } from 'next/navigation'
import React, { Suspense } from 'react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { db } from '@/lib/db'
import { Client } from '@prisma/client'

const ClientDropdown = React.lazy(() => import('./client-dropdown'))

type Props = {
  client: Client
}

export const ProfileCard = async ({ client }: Props) => {
  if (!client) redirect('/clients')
  return (
    <Card className="md:w-full lg:w-1/3">
      <CardHeader className="flex flex-row justify-between">
        <div className="flex flex-row items-center gap-2">
          <Avatar className="w-16 h-16">
            <AvatarFallback className="text-2xl">{client.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span>{client.name}</span>
            <span className="text-muted-foreground">{client.email}</span>
          </div>
        </div>
        <Suspense fallback={<Skeleton className="h-12 w-12 rounded-full" />}>
          <ClientDropdown client={client} />
        </Suspense>
      </CardHeader>
    </Card>
  )
}

ProfileCard.Skeleton = () => (
  <Card className="md:w-full lg:w-1/3">
    <CardHeader>
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </CardHeader>
  </Card>
)
