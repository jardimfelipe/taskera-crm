import { Card, CardHeader } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Skeleton } from '@/components/ui/skeleton'
import { db } from '@/lib/db'
import { centsToBrl } from '@/utils/currency'
import { formatToPrint } from '@/utils/date'
import { Calendar, DollarSign, User } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
  projectId: string
}

export const ProjectOverview = async ({ projectId }: Props) => {
  const project = await db.project.findFirst({
    where: {
      id: projectId
    },
    include: {
      client: true
    }
  })
  if (!project) redirect('/projects')
  return (
    <Card className="bg-gradient-to-b from-primary to-blue-300 text-white flex-1">
      <CardHeader>
        <div className="flex flex-col gap-5">
          <div className="flex justify-between">
            <div className="flex flex-row gap-2 items-center">
              <div className="rounded-full p-4 bg-blue-300">
                <User className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="scroll-m-20 text-xl font-medium tracking-tight">{project.client.name}</h4>
                <p>{project.client.name}</p>
              </div>
            </div>

            <div className="flex flex-row gap-2 items-center">
              <div className="rounded-full p-4 bg-blue-300">
                <DollarSign className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="scroll-m-20 text-xl font-medium tracking-tight">Orçamento</h4>
                <p>{centsToBrl(project.budget)}</p>
              </div>
            </div>

            <div className="flex flex-row gap-2 items-center">
              <div className="rounded-full p-4 bg-blue-300">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="scroll-m-20 text-xl font-medium tracking-tight">Data de entrega</h4>
                <p>{formatToPrint(project.endAt)}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Progress value={80} indicatorColor='bg-blue-600' />
            <div className="flex justify-between">
              <h4 className="scroll-m-20 text-xl font-medium tracking-tight">Progresso</h4>
              <span className="font-bold">80%</span>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card >
  )
}


ProjectOverview.Skeleton = () => (
  <Card className="bg-gradient-to-b from-primary to-blue-300 text-white flex-1">
    <CardHeader>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between">
          <div className="flex flex-row gap-2 items-center">
            <div className="rounded-full p-4 bg-blue-300">
              <User className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="scroll-m-20 text-xl font-medium tracking-tight">Nome do cliente</h4>
              <Skeleton className="w-100 h-5" />
            </div>
          </div>

          <div className="flex flex-row gap-2 items-center">
            <div className="rounded-full p-4 bg-blue-300">
              <DollarSign className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="scroll-m-20 text-xl font-medium tracking-tight">Orçamento</h4>
              <Skeleton className="w-100 h-5" />
            </div>
          </div>

          <div className="flex flex-row gap-2 items-center">
            <div className="rounded-full p-4 bg-blue-300">
              <Calendar className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="scroll-m-20 text-xl font-medium tracking-tight">Data de entrega</h4>
              <Skeleton className="w-100 h-5" />
            </div>
          </div>
        </div>
      </div>
    </CardHeader>
  </Card >
)