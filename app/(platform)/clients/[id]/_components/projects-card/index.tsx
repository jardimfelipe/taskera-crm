import { Prisma, Project, Task } from '@prisma/client'
import React from 'react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { db } from '@/lib/db'

import { ProjectsTable } from './projects-table'
import { ProjectWithTasks } from '@/actions/projects/types'

type Props = {
  clientId: string
}

export const ProjectsCard = async ({ clientId }: Props) => {
  const projects: ProjectWithTasks[] = await db.project.findMany({
    where: {
      clientId,
    },
    include: {
      tasks: true,
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
