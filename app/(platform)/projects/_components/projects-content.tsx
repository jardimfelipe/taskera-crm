import { db } from '@/lib/db';
import { SearchParams } from '@/utils/type';
import { ClientsTable } from '@/components/clients/clients-table';
import { redirect } from 'next/navigation';
import { currentUser } from '@/lib/auth';
import { ProjectsTable } from '@/components/projects/projects-table';

type Props = {
  searchParams: SearchParams
}

export const ProjectsContent = async ({ searchParams }: Props) => {
  const query = searchParams?.q || "";
  const page = Number(searchParams?.page) || 1;
  const pageSize = Number(searchParams?.pageSize) || 10;

  const user = await currentUser();
  if (!user) redirect("/")

  const projects = await db.project.findMany(
    {
      where: {
        userId: user.id, name: {
          contains: query,
          mode: "insensitive",
        },
      },
      include: {
        tasks: true,
        client: true,
      },
      take: 10,
      skip: (page - 1) * 10,
    },
  )

  if (!projects) redirect("/")

  return (
    <ProjectsTable showClients projects={projects} />
  )
}