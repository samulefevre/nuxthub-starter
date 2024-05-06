declare module '#auth-utils' {
  interface User {
    id: number
    name: string
    email: string
    avatarUrl: string | null
    role: 'admin' | 'user'
  }

  interface UserSession {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    extended?: any
    loggedInAt: number
  }
}

export {}
