import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { UserTokenSchema } from "./schemas/authSchema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/error",
  },
  callbacks: {},
  providers: [
    Credentials({
      credentials: {
        email: {},
        name: {},
      },
      authorize: async (credentials) => {
        const validatedFields = UserTokenSchema.safeParse(credentials);
        if (!validatedFields.success) {
          return null;
        }
        if (validatedFields.success) {
          const { email, name } = validatedFields.data;
          return { name, email };
        }
        return null;
      },
    }),
  ],
});
