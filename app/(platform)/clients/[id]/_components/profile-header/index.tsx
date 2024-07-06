import React, { Suspense } from 'react'
import { ProfileCard } from './profile-card'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import { RevenueEstimateCard } from './revenue-estimate-card'
import { RevenueCard } from './revenue-card'

type Props = {
  clientId: string
}

export const ProfileHeader = async ({ clientId }: Props) => {
  const client = await db.client.findFirst({
    where: {
      id: clientId,
    },
    include: {
      projects: true,
    }
  });
  if (!client) redirect('/clients')
  return (
    <div className="flex flex-row gap-4">
      <Suspense fallback={<ProfileCard.Skeleton />}>
        <ProfileCard client={client} />
      </Suspense>
      <Suspense fallback={<RevenueEstimateCard.Skeleton />}>
        <RevenueEstimateCard client={client} />
      </Suspense>
      <Suspense fallback={<RevenueCard.Skeleton />}>
        <RevenueCard client={client} />
      </Suspense>
    </div>
  )
}
