import {  Client, Project, Task } from "@prisma/client";

export interface CompleteProject extends Project {
  tasks: Task[]
  client: Client | null
}

export enum ProjectStatus {
  IN_PROGRESS = "IN_PROGRESS",
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  NOT_STARTED = "NOT_STARTED",
}

export const ProjectStatusName = {
  [ProjectStatus.IN_PROGRESS]: "Em andamento",
  [ProjectStatus.PENDING]: "Pendente",
  [ProjectStatus.COMPLETED]: "Concluído",
  [ProjectStatus.NOT_STARTED]: "Não iniciado",
} as const;

export const ProjectStatusColor = {
  [ProjectStatus.IN_PROGRESS]: "yellow-500",
  [ProjectStatus.PENDING]: "blue-500",
  [ProjectStatus.COMPLETED]: "green-500",
  [ProjectStatus.NOT_STARTED]: "gray-500",
} as const;
