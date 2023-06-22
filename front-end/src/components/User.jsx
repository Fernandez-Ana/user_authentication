import { useContext } from "react"

import { UserContext } from '../contexts/UserContext'

const User = () => {

    const { user, logout } = useContext(UserContext)
    console.log(user);


    return (
        <>
            <h2>Userprofil</h2>
            {user ? <h3>Welcome {user.name}</h3> : <h3>Welcome</h3>}
            {user.email}
            <button onClick={logout} >Logout</button>
        </>
    );
}

export default User;