import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { supabase } from "./_lib/supabase";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) {
          throw new Error("請填滿欄位");
        }

        const { data: user, error } = await supabase
          .from("guest")
          .select("id, fullName, email, password, role,authProviderId")
          .eq("email", email)
          .single();

        if (error) {
          console.error("Supabase error:", error);
          throw new Error("Supabase query failed");
        }

        if (!user || !user.password) {
          throw new Error("無效的電子信箱或密碼");
        }

        const isMatched = await compare(password, user.password);

        if (!isMatched) {
          throw new Error("密碼不匹配");
        }
        console.log(user);

        return {
          name: user.fullName,
          email: user.email,
          role: user.role,
          id: user.authProviderId,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      // console.log(token);

      if (token?.sub) {
        session.user.id = token.sub;
        session.user.role = token.role;
        session.user.name = token.name;
      }
      return session;
    },
    async jwt({ token, user }) {
      // console.log(token);
      if (user) {
        token.role = user.role;
        token.sub = user.id; // 將用戶 ID 存儲在 token.sub
        token.name = user.name;
      }
      return token;
    },
    signIn: async ({ user, account }) => {
      if (account?.provider === "google") {
        try {
          const { email, name, image, id } = user;
          const { data: alreadyUser, error: selectError } = await supabase
            .from("guest")
            .select("*")
            .eq("email", email)
            .single();

          if (!alreadyUser) {
            const { error: insertError } = await supabase
              .from("guest")
              .insert([
                {
                  email,
                  fullName: name,
                  role: "user",
                  authProviderId: id,
                  image,
                },
              ]); // 注意這裡的 name

            if (insertError) {
              console.error("Supabase insert error:", insertError);
              return false;
            }
          }

          return true;
        } catch (error) {
          console.error("Supabase signIn error:", error);
          return false;
        }
      }

      return account?.provider === "credentials";
    },
  },
});
