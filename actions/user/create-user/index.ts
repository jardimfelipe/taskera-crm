"use server";

import { redirect } from "next/navigation";

import { currentUser } from "@/lib/auth";
import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";

import { CreateUser } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const googleUser = await currentUser();

  if (!googleUser) {
    return {
      error: "Unauthorized",
    };
  }
  let user;

  try {
    user = await db.user.create({ data });
  } catch (error) {
    return {
      error: "Failed to create",
    };
  }

  redirect("/teams");
};

export const createBoard = createSafeAction(CreateUser, handler);
