import axios from 'axios';
import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import './Login.scss'

const Login = () => {

    const navigate = useNavigate()

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const loginHandler = async (e) => {
        e.preventDefault()
        console.log(user)
        await axios.post("/api/login", user)
            .then((res) => {
                console.log(res)
                navigate("/userprofil")
            }).catch((error) => {
                console.error(error);
            })
    }

    return (
        <div className='login'>
            <h2>Login</h2>
            <form onSubmit={loginHandler}>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" value={user.email} onChange={(e) => { setUser({ ...user, email: e.target.value }) }} />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={user.password} onChange={(e) => { setUser({ ...user, password: e.target.value }) }} />

                <button>Submit</button>

            </form>
            <Link to={"/signup"}>You're not a user? Click here</Link>
        </div>
    );
}

export default Login;