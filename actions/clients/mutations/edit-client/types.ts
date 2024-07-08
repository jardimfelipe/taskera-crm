import { Client } from "@prisma/client";
import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";

import { EditClient } from "./schema";

export type InputType = z.infer<typeof EditClient>;
export type ReturnType = ActionState<InputType, Client>;
