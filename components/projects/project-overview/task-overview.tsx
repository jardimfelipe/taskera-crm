import { CompleteProject } from '@/actions/projects/types'
import { TasksChart, TasksChartSkeleton } from '@/components/tasks/tasks-chart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

export const TaskOverview = ({ project }: { project: CompleteProject }) => {
  return (
    <div className="flex flex-col gap-5">
      <Card>
        <CardHeader>
          <CardTitle>Progresso das tarefas</CardTitle>
        </CardHeader>
        <CardContent className="h-[500px]">
          <TasksChart tasks={project.tasks} />
        </CardContent>
      </Card>
    </div>
  )
}


TaskOverview.Skeleton = () => (
  <div className="flex flex-col gap-5">
    <Card>
      <CardHeader>
        <CardTitle>Progresso das tarefas</CardTitle>
      </CardHeader>
      <CardContent className="h-[500px]">
        <TasksChartSkeleton />
      </CardContent>
    </Card>
  </div>
)