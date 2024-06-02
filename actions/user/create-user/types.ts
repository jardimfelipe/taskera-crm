import { User } from "@prisma/client";
import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";

import { CreateUser } from "./schema";

export type InputType = z.infer<typeof CreateUser>;
export type ReturnType = ActionState<InputType, User>;
