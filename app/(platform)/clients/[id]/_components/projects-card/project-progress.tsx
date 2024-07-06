import React from 'react'

import { Progress } from "@/components/ui/progress"
import { ProjectWithTasks } from '@/actions/projects/types';

type Props = {
  project: ProjectWithTasks
}

function getProjectStatusColor(status: string): string {
  switch (status) {
    case 'IN_PROGRESS':
      return "bg-IN_PROGRESS";
    case 'PENDING':
      return "bg-PENDING";
    case 'COMPLETED':
      return "bg-COMPLETED";
    case 'NOT_STARTED':
      return "bg-NOT_STARTED";
    default:
      return "bg-NOT_STARTED"; // default color
  }
}

export const ProjectProgress = ({ project }: Props) => {
  const progress = Math.floor(Math.random() * 101);

  const progressColor = getProjectStatusColor(project.status);
  return (
    <div className="flex flex-row gap-2 items-center">
      <span className="text-muted-foreground">{progress}%</span>
      <Progress value={progress} indicatorColor={progressColor} />
    </div>
  )
}
