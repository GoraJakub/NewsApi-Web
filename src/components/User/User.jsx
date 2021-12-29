import { useUser } from "../../context/userContext"


const User = () =>{
    const user = useUser()
    return (<h1>Siema {user.login}</h1>)
}

export default User