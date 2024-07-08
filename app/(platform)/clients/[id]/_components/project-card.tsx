import { Prisma, Project, Task } from '@prisma/client'
import React from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { db } from '@/lib/db'

import { ProjectsTable, ProjectsTableSkeleton } from '../../../../../components/projects/projects-table'
import { CompleteProject } from '@/actions/projects/types'

type Props = {
  clientId: string
}

export const ProjectsCard = async ({ clientId }: Props) => {
  const projects: CompleteProject[] = await db.project.findMany({
    where: {
      clientId,
    },
    include: {
      tasks: true,
      client: true
    }
  })
  if (!projects) return null
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2">
        <CardTitle>Projetos</CardTitle>
      </CardHeader>
      <CardContent>
        <ProjectsTable projects={projects} />
      </CardContent>
    </Card>
  )
}

export const ProjectsCardSkeleton = () => (
  <Card>
    <CardHeader className="flex flex-row items-center gap-2">
      <CardTitle>Projetos</CardTitle>
    </CardHeader>
    <CardContent>
      <ProjectsTableSkeleton />
    </CardContent>
  </Card>
)