import { ProjectStatusName } from '@/actions/projects/types';
import { Project } from '@prisma/client'
import React from 'react'

type Props = {
  status: Project["status"]
}

function getProjectStatusColor(status: string): string {
  switch (status) {
    case 'IN_PROGRESS':
      return "text-IN_PROGRESS";
    case 'PENDING':
      return "text-PENDING";
    case 'COMPLETED':
      return "text-COMPLETED";
    case 'NOT_STARTED':
      return "text-NOT_STARTED";
    default:
      return "text-NOT_STARTED"; // default color
  }
}

function getProjectStatusBackground(status: string): string {
  switch (status) {
    case 'IN_PROGRESS':
      return "bg-yellow-100";
    case 'PENDING':
      return "bg-blue-100";
    case 'COMPLETED':
      return "bg-green-100";
    case 'NOT_STARTED':
      return "bg-red-100";
    default:
      return "bg-red-100"; // default color
  }
}

export const StatusBadge = ({ status }: Props) => {
  return (
    <span className={`inline-flex items-center px-2.5 py-1.5 text-xs font-medium ${getProjectStatusColor(status)} ${getProjectStatusBackground(status)}`}>
      {ProjectStatusName[status]}
    </span>
  )
}
