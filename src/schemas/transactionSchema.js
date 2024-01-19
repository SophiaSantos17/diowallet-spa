import { z } from "zod";

export const transactionSchema = z.object({
  value: z
    .string()
    .min(1, "O valor precisa ter no minímo 1 caracteres")
    .transform((value) => Number(value)),
  description: z
  .string()
  .toLowerCase()
  .min(3, "A descrição precisa ter no minímo 3 caracteres")
  .transform((description) => {
      return description
      .trim()
      .split(" ")
      .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
      })
      .join(" ");
  }),
});