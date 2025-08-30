import NextAuth, { NextAuthOptions, getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          scope: 'openid email profile https://www.googleapis.com/auth/calendar.events',
          prompt: 'consent',
          access_type: 'offline',
          include_granted_scopes: 'true',
        },
      },
    }),
    Credentials({
      name: 'Email',
      credentials: {
        email: { label: 'Email', type: 'email' },
        name: { label: 'Name', type: 'text' },
      },
      async authorize(creds) {
        const email = (creds?.email || '').toString().trim()
        if (!email) return null
        return { id: email, email, name: (creds?.name as string) || email.split('@')[0] }
      },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.provider = account.provider
        token.access_token = (account as any).access_token
        token.refresh_token = (account as any).refresh_token
        token.expires_at = (account as any).expires_at
      }
      if (profile && !token.name) token.name = (profile as any).name
      return token
    },
    async session({ session, token }) {
      ;(session as any).provider = token.provider
      ;(session as any).access_token = token.access_token
      ;(session as any).refresh_token = token.refresh_token
      ;(session as any).expires_at = token.expires_at
      return session
    },
  },
  pages: { signIn: '/login' },
  secret: process.env.NEXTAUTH_SECRET || 'dev_secret_change_me',
}

export const getSession = () => getServerSession(authOptions)
