import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { compare } from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      async profile(profile) {
        // Try to find existing user
        let user = await prisma.user.findUnique({
          where: { email: profile.email },
        });

        // If user doesn't exist, create a new one
        if (!user) {
          const names = profile.name?.split(' ') || ['', ''];
          user = await prisma.user.create({
            data: {
              email: profile.email,
              name: names[0] || '',
              surname: names.slice(1).join(' ') || '',
              role: 'USER',
              passwordHash: '', // No password for Google users
              phone: '', // Phone required but empty for Google users
            },
          });
        }

        return {
          id: user.id,
          email: user.email,
          name: `${user.name} ${user.surname}`,
          role: user.role,
        } as any;
      },
    }),
    CredentialsProvider({
      name: 'Credenziali',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        if (!user) {
          return null;
        }

        const isValid = await compare(credentials.password, user.passwordHash);
        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: `${user.name} ${user.surname}`,
          role: user.role,
        } as any;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          // Controlla se l'utente esiste già
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! }
          });

          if (!existingUser) {
            // Crea nuovo utente Google
            const nameParts = user.name?.split(' ') || ['', ''];
            await prisma.user.create({
              data: {
                email: user.email!,
                name: nameParts[0],
                surname: nameParts.slice(1).join(' ') || 'Utente',
                passwordHash: '', // Utenti Google non hanno password
                role: 'CLIENTE',
                phone: '', // Campo richiesto ma vuoto per utenti Google
              }
            });
          }
        } catch (error) {
          console.error('Errore creazione utente Google:', error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
