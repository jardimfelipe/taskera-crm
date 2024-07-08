"use server";
import { revalidatePath } from "next/cache";

import { currentUser } from "@/lib/auth";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";

import { CreateTask } from "./schema";
import { InputType, ReturnType } from "./types";


const handler = async (data: InputType): Promise<ReturnType> => {
  const user = await currentUser();

  if (!user) {
    return {
      error: "Unauthorized",
    };
  }

  if(!data.projectId) {
    return {
      error: "Missing projectId",
    }
  }
  const found = await db.project.findFirst({
    where: {
      id: data.projectId,
    },
  });

  if (!found) {
    return {
      error: "Project not found",
    }
  }
  let task;
  try {
    task = await db.task.create({ data });
  } catch (error) {
  console.error(error)
  return {
      error: "Ocorreu um erro ao criar o cliente. Por favor, tente novamente.",
    };
  }
  revalidatePath(`/projects/${data.projectId}`);
  return {data: task}
};

export const createTask = createSafeAction(CreateTask, handler);
