import React, { Suspense } from 'react'
import { ProjectOverview } from './_components/project-overview'

const Project = async ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex flex-col gap-5 p-4 w-full">
      <h4 className="scroll-m-20 text-xl font-medium tracking-tight">Resumo</h4>
      <Suspense fallback={<ProjectOverview.Skeleton />}>
        <ProjectOverview projectId={params.id} />
      </Suspense>
    </div>
  )
}

export default Project
