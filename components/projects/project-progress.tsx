import React from 'react'

import { Progress } from "@/components/ui/progress"
import { CompleteProject, ProjectStatus } from '@/actions/projects/types';
import { calculateProgress } from '@/utils/calculate-progress';
import { Status } from '@prisma/client';

type Props = {
  project: CompleteProject
}

function getProjectStatusColor(status: Status): string {
  switch (status) {
    case ProjectStatus.IN_PROGRESS:
      return "bg-IN_PROGRESS";
    case ProjectStatus.PENDING:
      return "bg-PENDING";
    case ProjectStatus.COMPLETED:
      return "bg-COMPLETED";
    case ProjectStatus.NOT_STARTED:
      return "bg-NOT_STARTED";
    default:
      return "bg-NOT_STARTED"; // default color
  }
}

export const ProjectProgress = ({ project }: Props) => {
  const progress = calculateProgress(project.tasks);

  const progressColor = getProjectStatusColor(project.status);
  if (!project.tasks.length) return (
    <span className="text-muted-foreground">Crie tarefas e comece a ver seu progresso!</span>
  )
  return (
    <div className="flex flex-row gap-2 items-center">
      <span className="text-muted-foreground">{progress}%</span>
      <Progress value={progress} indicatorColor={progressColor} />
    </div>
  )
}
