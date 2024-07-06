import { Client } from "@prisma/client";
import { z } from "zod";

import { ActionState } from "@/lib/create-safe-action";

import { DeleteClient } from "./schema";

export type InputType = z.infer<typeof DeleteClient>;
export type ReturnType = ActionState<InputType, Client>;
