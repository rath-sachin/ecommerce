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

export const CreateProductSchema = z.strictObject({
  image: z.string().url(),
  name: z.string(),
  description: z.string(),
  price: z.coerce.number(),
});

export const DeleteProductSchema = z.strictObject({
  id: z.string(),
});
