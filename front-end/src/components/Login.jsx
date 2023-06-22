import axios from 'axios';
import { useState } from "react"
import { Link, useNavigate, useLocation } from 'react-router-dom'
import './Login.scss'

const Login = () => {

    const { state: navState } = useLocation();
    const navigate = useNavigate();
    const [error, setError] = useState(navState?.redirectReason || "");

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const loginHandler = async (e) => {
        e.preventDefault()
        console.log(user)
        setError("")

        await axios.post("/api/login", user)
            .then((res) => {
                console.log(res)
                navigate("/userprofil")
            }).catch((error) => {
                // console.error(error);
                const responseError = error?.response?.data?.error?.message;
                if (responseError) {
                    setError(responseError);
                } else {
                    setError("Password / Email combination wrong. Try again");
                }
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
                <div className='error'>
                    <small>{error}</small>
                </div>
                <button>Submit</button>

            </form>
            <Link to={"/signup"}>You're not a user? Click here</Link>
        </div>
    );
}

export default Login;