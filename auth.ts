import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { db } from "./lib/db";
import { getUserByEmail } from "./services/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async session({ session }) {
      const user = await getUserByEmail(session.user.email);

      if (!user) return session;

      session.user.id = user.id;
      return session;
    },
    async signIn({ profile }) {
      if (!profile?.email) return false;
      const user = await getUserByEmail(profile.email);

      if (!user) {
        await db.user.create({
          data: {
            email: profile.email,
            name: profile.name as string,
            image: profile.picture,
          },
        });
      }
      return true;
    },
  },
});
