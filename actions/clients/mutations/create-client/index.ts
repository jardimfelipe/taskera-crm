"use server";
import { revalidatePath } from "next/cache";

import { currentUser } from "@/lib/auth";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";

import { InputType } from "./types";
import { CreateClient } from "./schema";
import { ReturnType } from "./types"


const handler = async (data: InputType): Promise<ReturnType> => {
  const googleUser = await currentUser();

  if (!googleUser) {
    return {
      error: "Unauthorized",
    };
  }
  const found = await db.client.findFirst({
    where: {
      email: data.email,
    },
  });

  if (found) {
    return {
      error: "Já existe um cliente com este e-mail.",
    }
  }
  let client;

  try {
    client = await db.client.create({ data });
  } catch (error) {
    return {
      error: "Ocorreu um erro ao criar o cliente. Por favor, tente novamente.",
    };
  }
  revalidatePath(`/clients`);
  return {data: client}
};

export const createClient = createSafeAction(CreateClient, handler);
