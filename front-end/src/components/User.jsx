import axios from 'axios';
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'

const User = () => {

    const [user, setUser] = useState([])

    // hier wird der User aus der Datenbank geholt
    useEffect(() => {
        axios.get("/api/secure", { withCredentials: true })
            .then((res) => {
                console.log(res)
                setUser(res.data)
            }).catch((error) => {
                console.error(error);
            })
    }, [])
    console.log(user);

    return (
        <>
            <h3>Userprofil</h3>
            {user ? <h3>Welcome {user.name}</h3> : <h3>Welcome</h3>}
            {user.email}
            <Link to={"/"}>Logout</Link>
        </>
    );
}

export default User;