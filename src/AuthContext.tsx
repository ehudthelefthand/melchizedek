import { createContext, useContext, useState } from 'react'
import { TokenUser } from './api/models'

// this is user context api

const initialUser = {
  token: '',
  user: {
    department: '',
    fullname: '',
    role: '',
  },
}

const UserContext = createContext({
  user: initialUser,
  setUser: (_: TokenUser) => {},
})

export const AuthProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState<TokenUser>(initialUser)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)

export const AppProvider: React.FC<any> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>
}
