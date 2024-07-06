"use server";

import { redirect } from "next/navigation";

import { currentUser } from "@/lib/auth";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { InputType, ReturnType } from "./types";
import { DeleteClient } from "./schema";
import { revalidatePath } from "next/cache";



const handler = async (data: InputType): Promise<ReturnType> => {
  const googleUser = await currentUser();

  if (!googleUser) {
    return {
      error: "Unauthorized",
    };
  }
  console.log(data)
  try {
     await db.client.delete({ where: { id: data.id }});
  } catch (error) {
    return {
      error: "Ocorreu um erro ao excluir o cliente. Por favor, tente novamente.",
    };
  }
  revalidatePath(`/clients`);
  redirect(`/clients`)
};

export const deleteClient = createSafeAction(DeleteClient, handler);
