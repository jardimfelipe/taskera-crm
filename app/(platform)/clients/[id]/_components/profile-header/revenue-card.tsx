import { ClientWithProjects } from '@/actions/clients/types'
import { ProjectStatus } from '@/actions/projects/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { centsToBrl } from '@/utils/currency'
import { Info } from 'lucide-react'
import React from 'react'

type Props = {
  client: ClientWithProjects
}

export const RevenueCard = ({ client }: Props) => {
  const estimateRevenue = client.projects.reduce((acc, project) => {
    if (project.status !== ProjectStatus.COMPLETED) {
      return acc
    }
    return acc + project.budget
  }, 0)
  return (
    <Card className="bg-green-400">
      <CardHeader>
        <CardDescription className="text-sm text-white font-bold">
          Total de ganhos
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className='ml-2'>
                <Info className="w-4 h-4" aria-label="Informações sobre a estimativa de receita" />
              </TooltipTrigger>
              <TooltipContent className="text-muted-foreground">
                O total de ganhos é a soma da receita dos projetos concluídos
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-white">
          {centsToBrl(estimateRevenue)}
        </CardTitle>
      </CardContent>
    </Card>
  )
}

RevenueCard.Skeleton = () => {
  return (
    <Card className="bg-green-400">
      <CardHeader>
        <CardDescription className="text-sm text-white font-bold">
          Estimativa de receita
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-6 w-24" />
      </CardContent>
    </Card>
  )
}
