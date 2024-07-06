import { z } from "zod";
import { ProjectStatus } from "../types";

export const CreateProject = z.object({
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

  description: z.string({
    required_error: "É necessário informar a descrição",
    invalid_type_error: "É necessário informar a descrição",
  })
    .min(1, {
      message: 'É necessário informar a descrição'
    }),

  budget: z.string({
    required_error: "É necessário informar o orçamento",
    invalid_type_error: "É necessário informar o orçamento",
  })
    .min(1, {
      message: 'É necessário informar o orçamento'
    }),

   clientId: z.string() 
}) 
 .refine((data) => data.endAt > data.startAt, {
  message: "A estimativa de término não pode ser anterior à data de início",
  path: ["endAt"],
});;
