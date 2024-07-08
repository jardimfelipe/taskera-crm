import { Card, CardContent, CardHeader } from '@/components/ui/card';
import React, { Suspense } from 'react'
import { ProjectsTableSkeleton } from '../../../components/projects/projects-table';
import { SearchInput } from '@/components/search-input';
import { CreateProject } from '@/components/projects/create-project';
import { SearchParams } from '@/utils/type';
import { ProjectsContent } from './_components/projects-content';

const Projects = async ({ searchParams }: { searchParams: SearchParams }) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="p-4">
        <h4 className="scroll-m-20 text-xl font-medium tracking-tight">Meus Projetos</h4>
      </div>
      <Card>
        <CardHeader className='flex flex-row items-end gap-2'>
          <SearchInput />
          <CreateProject />
        </CardHeader>
        <CardContent>
          <Suspense key={JSON.stringify(searchParams)} fallback={<ProjectsTableSkeleton showClients />}>
            <ProjectsContent searchParams={searchParams} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}

export default Projects