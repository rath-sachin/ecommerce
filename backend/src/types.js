import { z } from "zod";
const UsernameSchema = z
  .string()
  .min(3)
  .refine((arg) => arg.toLowerCase() == arg, {
    message: "Username must only contain lowecase letters",
  })
  .refine(
    (arg) => {
      const allowed = "abcdefghijklmnopqrstuvwxyz1234567890";
      for (let i = 0; i < arg.length; i++) {
        if (!allowed.includes(arg[i])) return false;
      }
      return true;
    },
    { message: "Username must not contain any characters other than a-z, 0-9" }
  );

export const SignupSchema = z.strictObject({
  name: z.string(),
  username: UsernameSchema,
  password: z.string().min(8),
  email: z.string(),
});

export const SigninSchema = z.strictObject({
  username: z.string(),
  password: z.string(),
});

export const CreateGameSchema = z.strictObject({
  image: z.string().url(),
  name: z.string(),
  description: z.string(),
  rating: z.coerce.number().max(10).min(1),
  price: z.coerce.number(),
  categories: z.array(z.string()),
});
