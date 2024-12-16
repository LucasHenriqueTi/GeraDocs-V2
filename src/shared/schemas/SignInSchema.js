import { z } from "zod";

export const signinSchema = z.object({
  username: z
    .string()
    .nonempty("O campo login é obrigatório."), // Campo de 'username' agora é obrigatório
  password: z
    .string()
    .min(3, "A senha deve ter no mínimo 3 caracteres.")
    .nonempty("O campo senha é obrigatório."),
});
