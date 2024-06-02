import { z } from "zod";

export const CreateUser = z.object({
  email: z
    .string({
      required_error: "É necessário informar o email",
      invalid_type_error: "É necessário informar o email",
    })
    .email({
      message: "Insira um email válido",
    }),

  name: z.string({
    required_error: "É necessário informar o nome",
    invalid_type_error: "É necessário informar o nome",
  }),
});
