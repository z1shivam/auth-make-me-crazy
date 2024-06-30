"use server";
import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { LoginSchema } from "@/schemas/authSchema";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }
  const { email, password } = validatedFields.data;

  const user = await getUserByEmail(email);
  if (!user) {
    return { error: "User not found." };
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return { error: "Invalid password" };
  }
  await signIn("credentials", {
    email,
    password,
    name: user.name,
    redirectTo: "/secret",
  }).then(() => {
    return { success: "User logged in" };
  });
};
