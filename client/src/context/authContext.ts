import {createContext} from 'react'

function noop() {}
function noop2(p: string, p2: string) {}


export const AuthContext = createContext({
  token: null,
  userId: null,
  login: noop2,
  logout: noop,
  isAuthenticated: false
})