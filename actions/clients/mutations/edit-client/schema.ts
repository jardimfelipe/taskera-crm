import { z } from "zod";

export const EditClient = z.object({
  email: z
    .string()
    .email({
      message: "Insira um email válido",
    }).optional(),

  name: z.string({
    required_error: "É necessário informar o nome",
    invalid_type_error: "É necessário informar o nome",
  }).optional(),

  id: z.string({
    required_error: "É necessário informar o cliente",
    invalid_type_error: "É necessário informar o cliente",
  }),

  phone: z.string({
    required_error: "É necessário informar o telefone",
    invalid_type_error: "É necessário informar o telefone",
  }).optional()
});
