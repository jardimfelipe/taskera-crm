import { SearchInput } from '@/components/search-input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { CreateProject } from '../create-project'
import { TasksTable, TasksTableSkeleton } from '../../tasks/tasks-table'
import { CompleteProject } from '@/actions/projects/types'
import { CreateTask } from '@/components/tasks/create-task'
import { ScrollArea } from '@/components/ui/scroll-area'

export const TaskList = ({ project }: { project: CompleteProject }) => {
  return (
    <div className="flex flex-col gap-5">
      <Card>
        <CardHeader>
          <CardTitle>To-do</CardTitle>
          <CardDescription>Suas tarefas mais recentes</CardDescription>
          <div className='flex flex-row items-end gap-2'>
            <SearchInput />
            <CreateTask />
          </div>
        </CardHeader>
        <ScrollArea className="overflow-y-auto">
          <CardContent className="max-h-[400px]">
            <TasksTable tasks={project.tasks} />
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  )
}

TaskList.Skeleton = () => (
  <div className="flex flex-col gap-5">
    <Card>
      <CardHeader>
        <CardTitle>To-do</CardTitle>
        <div className='flex flex-row items-end gap-2'>
          <SearchInput />
          <CreateTask />
        </div>
      </CardHeader>
      <CardContent>
        <TasksTableSkeleton />
      </CardContent>
    </Card>
  </div>
)