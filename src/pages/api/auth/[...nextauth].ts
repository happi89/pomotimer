import NextAuth, { type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '../../../server/db/client';
import { env } from '../../../env/server.mjs';

export const authOptions: NextAuthOptions = {
	callbacks: {
		session: ({ session, user }) => {
			if (session.user) {
				session.user.id = user.id;
			}
			return session;
		},
		jwt: ({ token, user }) => {
			// first time jwt callback is run, user object is available
			if (user) {
				token.id = user.id;
			}

			return token;
		},
	},
	// Configure one or more authentication providers
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			id: 'google',
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		}),
		CredentialsProvider({
			id: 'john-doe',
			type: 'credentials',
			credentials: {},
			authorize(credentials) {
				const { username, password } = credentials as {
					username: string;
					password: string;
				};
				// perform you login logic
				// find out user from db
				if (username !== 'john-doe' || password !== '123456') {
					return null;
				}

				// if everything is fine
				return {
					id: '1234',
					name: 'John Doe',
					email: 'john@gmail.com',
					image:
						'https://loginportal.funnyjunk.com/pictures/John+doe+is+to+hack+everyone+on+roblox+march+18_e9cac9_6207963.jpg',
				};
			},
		}),
		// ...add more providers here
	],
	secret: env.NEXTAUTH_SECRET,
	jwt: {
		secret: env.NEXTAUTH_SECRET,
	},
	pages: {
		signIn: '/login',
	},
};

export default NextAuth(authOptions);
