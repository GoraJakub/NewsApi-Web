import { createContext, useContext, useState } from 'react';

const userContext = createContext({
    login: '',
    isLogged: false,
    name: '',
    surname: ''
})
const userUpdateContext = createContext()

export function useUser() {
    return useContext(userContext)
}
export function useUserUpdate() {
    return useContext(userUpdateContext)
}

export function UserProvider({children}) {
    const [user, setUser] = useState({user: '', isLogged: false, name: '', surname: ''})

    const updateUser = (login, isLogged, name, surname) =>{
        setUser({login: login, isLogged: isLogged, name: name, surname: surname})
    }

    return (
        <userContext.Provider value={user}>
            <userUpdateContext.Provider value={updateUser}>
                {children}
            </userUpdateContext.Provider>
        </userContext.Provider>
    )
}