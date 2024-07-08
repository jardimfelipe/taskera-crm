"use server";
import { revalidatePath } from "next/cache";

import { currentUser } from "@/lib/auth";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";

import { InputType } from "./types";
import { EditClient } from "./schema";
import { ReturnType } from "./types"


const handler = async (data: InputType): Promise<ReturnType> => {
  const googleUser = await currentUser();

  const {id, ...rest} = data;
  if (!googleUser) {
    return {
      error: "Unauthorized",
    };
  }
  const found = await db.client.findFirst({
    where: {
      id: data.id,
    },
  });

  if (!found) {
    return {
      error: "Cliente nao encontrado",
    }
  }
  let updatedClient;
  
  try {
    updatedClient = await db.client.update({  
      where: { id: data.id },
      data: rest 
    });
  } catch (error) {
    console.error(error);
    return {
      error: "Ocorreu um erro ao editar o cliente. Por favor, tente novamente.",
    };
  }
  revalidatePath(`/clients`);
  return {data: updatedClient}
};

export const editClient = createSafeAction(EditClient, handler);
