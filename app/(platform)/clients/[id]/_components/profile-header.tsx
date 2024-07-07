import React, { Suspense } from 'react'
import { ProfileCard } from '../../../../../components/clients/profile-card'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import { RevenueEstimateCard } from '../../../../../components/clients/revenue-estimate-card'
import { RevenueCard } from '../../../../../components/clients/revenue-card'

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
      <ProfileCard client={client} />
      <RevenueEstimateCard client={client} />
      <RevenueCard client={client} />
    </div>
  )
}

export const ProfileHeaderSkeleton = () => (
  <div className="flex flex-row gap-4">
    <ProfileCard.Skeleton />
    <RevenueEstimateCard.Skeleton />
    <RevenueCard.Skeleton />
  </div>
)