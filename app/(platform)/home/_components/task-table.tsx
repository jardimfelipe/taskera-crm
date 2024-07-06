import { Project } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { Suspense } from "react"

import { DataTable } from "@/components/ui/data-table"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

interface ProjectData {
  name: string
  tasks: number
  createdAt: string
  updatedAt: string
}

const columns: ColumnDef<ProjectData>[] = [
  {
    accessorKey: 'name',
    header: 'Nome'
  },
  {
    accessorKey: 'tasks',
    header: 'Total de tarefas',
  },
  {
    accessorKey: 'createdAt',
    header: 'Criado em',
  },
  {
    accessorKey: 'updatedAt',
    header: 'Atualizado em',
  },

]

export const TaskTable = async () => {
  const user = await currentUser()
  const projects = await db.project.findMany({
    where: {
      userId: user?.id
    },
    include: {
      tasks: true,
    }

  })
  const data = projects.map((project) => (
    {
      name: project.name,
      tasks: project.tasks.length,
      createdAt: new Date(project.createdAt).toLocaleDateString('pt-br', { hour: '2-digit', minute: '2-digit' }),
      updatedAt: project.updatedAt ? new Date(project.updatedAt).toLocaleDateString('pt-br', { hour: '2-digit', minute: '2-digit' }) : '-',
    }
  ))
  return (
    <Suspense fallback={<p>carregando...</p>}>
      <DataTable columns={columns} data={data} />
    </Suspense>
  )
}

