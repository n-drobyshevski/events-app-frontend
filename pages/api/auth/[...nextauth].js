/* eslint-disable new-cap */
import NextAuth from "next-auth";
import { API_URL } from "@/config/index";
import CredentialsProvider from "next-auth/providers/credentials";

export default async function auth(req, res) {
  NextAuth(req, res, {
    providers: [
      CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: "credentials",
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          username: {
            label: "Username",
            type: "text",
            placeholder: "username",
          },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          // Add logic here to look up the user from the credentials supplied
          try {
            const userCredentials = {
              identifier: credentials.email,
              password: credentials.password,
            };
            const response = await fetch(`${API_URL}/api/auth/local`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userCredentials),
            });

            const data = await response.json();
            console.log(" -- data -- ", data);
            const user = {
              id: data.user.id,
              email: data.user.email,
              accessToken: data.jwt,
            };
            return user;
          } catch (error) {
            console.log("error l.39 - ", error);
            throw new Error(error.response);
          }
        },
      }),
    ],
    database: API_URL,
    session: {
      strategy: "jwt",
      maxAge: 24 * 60 * 60, // 24 hours
    },

    pages: {
      signIn: "api/login",
    },

    callbacks: {
      session: async ({ session, token }) => {
        session.accessToken = token.accessToken;
        session.user.id = token.id;

        return Promise.resolve(session);
      },
      jwt: async ({ token, user }) => {
        if (user) {
          token.id = user.id;
          token.accessToken = user.accessToken;
          token.email = user.email;
        }

        console.log(" -- token -- ", token);
        console.log(" -- user -- ", user);

        return Promise.resolve(token);
      },
    },
  });
}
