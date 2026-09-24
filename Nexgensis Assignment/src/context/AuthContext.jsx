import { createContext, useContext, useMemo, useState } from 'react'
import * as productApi from '../api/products.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => { const saved = localStorage.getItem('nexgensis_user'); return saved ? JSON.parse(saved) : null })
    const [loading] = useState(false)
    async function signIn(credentials) {
        const nextUser = await productApi.login(credentials)
        localStorage.setItem('nexgensis_token', nextUser.accessToken || nextUser.token)
        localStorage.setItem('nexgensis_user', JSON.stringify(nextUser)); setUser(nextUser)
    }
    function signOut() { localStorage.removeItem('nexgensis_token'); localStorage.removeItem('nexgensis_user'); setUser(null) }
    const value = useMemo(() => ({ user, loading, signIn, signOut }), [user, loading])
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() { return useContext(AuthContext) }