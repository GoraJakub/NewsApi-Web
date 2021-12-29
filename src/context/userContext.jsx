import { createContext, useContext, useState } from 'react';

const userContext = createContext({
    login: '',
    isLogged: false
})
const userUpdateContext = createContext()

export function useUser() {
    return useContext(userContext)
}
export function useUserUpdate() {
    return useContext(userUpdateContext)
}

export function UserProvider({children}) {
    const [user, setUser] = useState({user: '', isLogged: false})

    const updateUser = (login, isLogged) =>{
        setUser({login: login, isLogged: isLogged})
    }

    return (
        <userContext.Provider value={user}>
            <userUpdateContext.Provider value={updateUser}>
                {children}
            </userUpdateContext.Provider>
        </userContext.Provider>
    )
}