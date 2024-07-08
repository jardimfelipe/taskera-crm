import { Details } from '@/components/projects/project-overview/details'
import { Header } from '@/components/projects/project-overview/header'
import { TaskList } from '@/components/projects/project-overview/task-list'
import { TaskOverview } from '@/components/projects/project-overview/task-overview'
import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import React from 'react'

export const ProjectOverview = async ({ projectId }: { projectId: string }) => {
  const project = await db.project.findFirst({
    where: {
      id: projectId
    },
    include: {
      client: true,
      tasks: {
        take: 10,
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  })
  if (!project) notFound();
  return (
    <div className="flex flex-col gap-4">
      <Header project={project} />
      <Details project={project} />
      <div className="flex space-x-4">
        <div className="w-full lg:w-2/3 ">
          <TaskList project={project} />
        </div>

        <div className="w-full lg:w-1/3">
          <TaskOverview project={project} />
        </div>
      </div>
    </div>
  )
}


ProjectOverview.Skeleton = () => (
  <div className="flex flex-col gap-4">
    <Header.Skeleton />
    <Details.Skeleton />
    <div className="flex space-x-1">
      <div className="w-full lg:w-2/3">
        <TaskList.Skeleton />
      </div>
      <div className="w-full lg:w-1/3">
        <TaskOverview.Skeleton />
      </div>
    </div>
  </div>
)