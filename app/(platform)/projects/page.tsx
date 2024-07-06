import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db'
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react'
import { ProjectsTable } from '../clients/[id]/_components/projects-card/projects-table';

const Projects = async () => {
  const user = await currentUser();
  if (!user) redirect("/")
  const projects = await db.project.findMany(
    {
      where: { userId: user.id },
      include: {
        tasks: true,
        client: true,
      }
    },
  )
  return (
    <div className="flex flex-col gap-5">
      <div className="p-4">
        <h4 className="scroll-m-20 text-xl font-medium tracking-tight">Meus Projetos</h4>
      </div>

      <Card>
        <CardHeader className='flex flex-row items-end gap-2'>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<p>carregando...</p>}>
            <ProjectsTable showClients projects={projects} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}

export default Projects