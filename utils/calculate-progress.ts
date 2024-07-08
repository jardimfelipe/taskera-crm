import { ProjectStatus } from "@/actions/projects/types";
import { Task } from "@prisma/client";

export const calculateProgress = (tasks:Task[]) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === ProjectStatus.COMPLETED).length;
  return Math.floor((completedTasks / totalTasks) * 100);
} 