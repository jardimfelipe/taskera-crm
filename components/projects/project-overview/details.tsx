import { CompleteProject } from '@/actions/projects/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import DOMPurify from 'dompurify';
import React from 'react'
import { JSDOM } from "jsdom";
import { formatToPrint } from '@/utils/date';
import { Skeleton } from '@/components/ui/skeleton';

const window = new JSDOM("").window;
const DOMPurifyServer = DOMPurify(window);
const formatOptions: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' }

export const Details = ({ project }: { project: CompleteProject }) => {
  const sanitizedHTML = DOMPurifyServer.sanitize(project.description)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detalhes do projeto</CardTitle>
        <div className="flex flex-row gap-4 text-sm text-muted-foreground">
          <span>Previsao de início: {formatToPrint(project.startAt, formatOptions)}</span>
          <span>-</span>
          <span>Previsao de término: {formatToPrint(project.endAt, formatOptions)}</span>
        </div>
      </CardHeader>
      <CardContent dangerouslySetInnerHTML={{ __html: sanitizedHTML }} >
      </CardContent>
    </Card>
  )
}

Details.Skeleton = () => (
  <Card>
    <CardHeader>
      <CardTitle>Detalhes do projeto</CardTitle>
      <CardDescription>
        <div className="flex flex-row gap-4">
          <Skeleton className="h-4 w-[100px]" />
          <span>-</span>
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-2">
          <Skeleton className="h-4 w-1/4 bg-gray-300"></Skeleton>
          <Skeleton className="h-4 w-3/4 bg-gray-300"></Skeleton>
        </div>
        <div className="flex flex-row gap-2">
          <Skeleton className="h-4 w-1/4 bg-gray-300"></Skeleton>
          <Skeleton className="h-4 w-3/4 bg-gray-300"></Skeleton>
        </div>
        <div className="flex flex-row gap-2">
          <Skeleton className="h-4 w-2/4 bg-gray-300"></Skeleton>
          <Skeleton className="h-4 w-1/4 bg-gray-300"></Skeleton>
          <Skeleton className="h-4 w-1/4 bg-gray-300"></Skeleton>
        </div>
        <div className="flex flex-row gap-2">
          <Skeleton className="h-16 w-1/4 bg-gray-300"></Skeleton>
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="h-4 w-3/4 bg-gray-300"></Skeleton>
            <Skeleton className="h-4 w-3/4 bg-gray-300"></Skeleton>
            <Skeleton className="h-4 w-3/4 bg-gray-300"></Skeleton>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
)