import React, { Suspense } from 'react'

import { ProjectsCard, ProjectsCardSkeleton } from './_components/project-card';
import { ProfileHeader, ProfileHeaderSkeleton } from './_components/profile-header';

const Client = async ({ params }: { params: { id: string } }) => {

  return (
    <div className="flex flex-col flex-wrap gap-4">
      <Suspense fallback={<ProfileHeaderSkeleton />}>
        <ProfileHeader clientId={params.id} />
      </Suspense>
      <Suspense fallback={<ProjectsCardSkeleton />}>
        <ProjectsCard clientId={params.id} />
      </Suspense>
    </div>
  )
}

export default Client