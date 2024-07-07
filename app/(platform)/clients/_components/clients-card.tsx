import { db } from '@/lib/db';
import { SearchParams } from '@/utils/type';
import { ClientsTable } from '@/components/clients/clients-table';
import { redirect } from 'next/navigation';

type Props = {
  searchParams: SearchParams
}

export const ClientsCard = async ({ searchParams }: Props) => {
  const query = searchParams?.q || "";
  const page = Number(searchParams?.page) || 1;
  const pageSize = Number(searchParams?.pageSize) || 10;

  const clients = await db.client.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    take: 10,
    skip: (page - 1) * 10,
  });

  if (!clients) redirect("/")
  return (
    <ClientsTable clients={clients} />
  )
}