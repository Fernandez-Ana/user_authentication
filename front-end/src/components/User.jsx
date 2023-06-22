import { useContext } from "react"
import { UserContext } from '../contexts/UserContext'
import './User.scss'

const User = () => {

    const { user, logout } = useContext(UserContext)
    console.log(user);


    return (
        <div className="userprofil">
            <h2>Userprofil</h2>
            {user ? <h3>Welcome {user.name}</h3> : <h3>Welcome</h3>}
            <p>{user.email}</p>
            <button onClick={logout} >Logout</button>
        </div>
    );
}

export default User;