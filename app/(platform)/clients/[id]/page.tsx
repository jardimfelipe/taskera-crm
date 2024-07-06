import React, { Suspense } from 'react'

import { ProjectsCard } from './_components/projects-card';
import { ProfileHeader } from './_components/profile-header';

const Client = async ({ params }: { params: { id: string } }) => {

  return (
    <div className="flex flex-col flex-wrap gap-4">
      <ProfileHeader clientId={params.id} />
      <Suspense fallback={<div>Carregando...</div>}>
        <ProjectsCard clientId={params.id} />
      </Suspense>
    </div>
  )
}

export default Client