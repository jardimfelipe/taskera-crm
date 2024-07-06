"use server";
import { revalidatePath } from "next/cache";

import { currentUser } from "@/lib/auth";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";

import { CreateProject } from "./schema";
import { InputType, ReturnType } from "./types";


const handler = async (data: InputType): Promise<ReturnType> => {
  const user = await currentUser();

  if (!user) {
    return {
      error: "Unauthorized",
    };
  }

  if(!data.clientId) {
    return {
      error: "Missing clientId",
    }
  }
  const found = await db.client.findFirst({
    where: {
      id: data.clientId,
    },
  });

  if (!found) {
    return {
      error: "Client not found",
    }
  }
  let project;
  const budget = parseFloat(data.budget.replace(',', '')) * 100;
  console.log(budget)
  try {
    project = await db.project.create({ data: {...data, userId: user.id as string, budget} });
  } catch (error) {
  console.error(error)
  return {
      error: "Ocorreu um erro ao criar o cliente. Por favor, tente novamente.",
    };
  }
  revalidatePath(`/clients/${data.clientId}`);
  return {data: project}
};

export const createProject = createSafeAction(CreateProject, handler);
