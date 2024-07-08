"use client";

import { Status, Task } from '@prisma/client'
import React from 'react'


import { DefaultRawDatum, PieCustomLayerProps, PieTooltipProps, ResponsivePie } from '@nivo/pie'
import { ProjectStatus, ProjectStatusName } from '@/actions/projects/types'
import { Card } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

function getProjectStatusColor(status: Status): string {
  switch (status) {
    case ProjectStatus.IN_PROGRESS:
      return "yellow";
    case ProjectStatus.PENDING:
      return "blue";
    case ProjectStatus.COMPLETED:
      return "#2ed47e";
    case ProjectStatus.NOT_STARTED:
      return "hsl(var(--destructive))";
    default:
      return "hsl(var(--destructive))"; // default color
  }
}

const CustomTooltip = (props: PieTooltipProps<DefaultRawDatum>) => {
  return (
    <Card className="p-2 bg-slate-50 opacity-90">
      <div className="flex items-center gap-2 flex-row">
        <span className={`w-4 h-4 rounded-full bg-${props.datum.id}`}></span>
        <span>{props.datum.label} ({props.datum.value})</span>
      </div>
    </Card>
  );
};

const CustomLayerComponent = ({ dataWithArc, centerX, centerY }: PieCustomLayerProps<DefaultRawDatum>) => {
  const totalTasks = dataWithArc.reduce((acc, { value }) => acc + value, 0);
  return (
    <>
      <text
        x={centerX}
        y={centerY}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: "50px",
          fontWeight: "600"
        }}
      >
        {totalTasks}
      </text>
      <text
        x={centerX}
        y={centerY + 40}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: "20px",
          fontWeight: "400"
        }}
      >
        tarefas
      </text>
    </>
  );
};

export const TasksChart = ({ tasks }: { tasks: Task[] }) => {
  const chartData = (Object.keys(ProjectStatus) as Array<keyof typeof ProjectStatus>).map((status) => ({
    id: status,
    label: ProjectStatusName[status],
    value: tasks.filter((task) => task.status === status).length,
    color: getProjectStatusColor(status)
  }));

  if (!tasks.length) return (
    <div className="flex flex-col justify-center items-center h-64">
      <span>Crie tarefas para gerar o seu progresso!</span>
    </div>
  )

  return (
    <ResponsivePie innerRadius={0.7} tooltip={CustomTooltip} animate colors={{ datum: 'data.color' }} layers={['arcs', 'legends', CustomLayerComponent]} data={chartData}
    />
  )
}

export const TasksChartSkeleton = () => (
  <Skeleton className="h-60 rounded-full bg-gray-300" />
)