import { ProjectStatus } from "@/actions/projects/types";
import { z } from "zod";

export const CreateTask = z.object({
  name: z
    .string({
      required_error: "É necessário informar o nome",
      invalid_type_error: "É necessário informar o nome",
    })
    .min(1, {
      message: 'É necessário informar o nome'
    }),

  startAt: z.date({
    required_error: "É necessário informar a data de início",
    invalid_type_error: "É necessário informar a data de início",
  }),

  endAt: z.date({
    required_error: "É necessário informar a data de término",
    invalid_type_error: "É necessário informar a data de término",
  }),

  status: z.nativeEnum(ProjectStatus),
  projectId: z.string()
}) 
 .refine((data) => data.endAt > data.startAt, {
  message: "A estimativa de término não pode ser anterior à data de início",
  path: ["endAt"],
});;
