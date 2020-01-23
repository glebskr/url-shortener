import {createContext} from 'react'

function noop() {}
function noop2(p: string, p2: string) {}
interface Context {
  token: null | string;
  userId: null | string;
  login: (token: string, userId: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}


export const AuthContext = createContext<Context>({
  token: null,
  userId: null,
  login: noop2,
  logout: noop,
  isAuthenticated: false
})