import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string
          }),
          CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "your-cool-username"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "your-awesome-password"
                }
            },
            async authorize(credentials) {
                // This is where you need to retrieve user data 
                // to verify with credentials
                // Docs: https://next-auth.js.org/configuration/providers/credentials
                const user = { id: "42", name: "Fattesingh", password: "nextauth" }

                if (credentials?.username === user.name && credentials?.password === user.password) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],
    session: {
        strategy: 'jwt',
      },
      callbacks: {
        async signIn(a) {
          console.log('called signin');
          console.log(a);
    
          return true;
        },
        async jwt(a) {
          console.log('called jwt');
          console.log(a);
    
          console.log('=================================================');
    
          return a.token;
        },
        async session(a) {
          console.log('called session');
          console.log(a);
          console.log('=================================================');
    
          return a.session;
        },
      },
}