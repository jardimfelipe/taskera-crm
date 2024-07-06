import { Client, Project } from "@prisma/client";

export interface ClientWithProjects extends Client {
  projects: Project[]
}