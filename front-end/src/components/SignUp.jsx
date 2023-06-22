import axios from 'axios';
import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import './SignUp.scss'

const defaultErrorState = Object.freeze({
    general: "",
    name: "",
    email: "",
    password: "",
});

const defaultData = Object.freeze({
    name: "",
    email: "",
    password: "",
});


const SignUp = () => {

    const [data, setData] = useState(defaultData)
    const [error, setError] = useState(defaultErrorState);

    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(defaultErrorState);
        await axios.post("/api/signup", data)
        setData(defaultData)
            .then((res) => {
                console.log(res)
                navigate("/login")
            }).catch((error) => {
                console.error(error);
                let responseError = error?.response?.data?.error;
                if (responseError?.errors) {
                    //  Object.entries(responseError.errors)
                    // [["email": {message: "",...}], ["password",{message: "",..}]]
                    const propertyMessageMap = Object.entries(responseError.errors).reduce(
                        (acc, [key, value]) => {
                            acc[key] = value.message;
                            return acc;
                        },
                        {}
                    );
                    // propertyMessageMap
                    // {email: "",password: ""}
                    console.log(propertyMessageMap);
                    setError(propertyMessageMap);
                }
                else {
                    setError((prevError) => ({
                        ...prevError,
                        general: error?.response?.data?.error?.message || "",
                    }));
                }
            })
    }


    return (
        <div className='signup'>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name" id="name" >Username</label>
                <input type="text" id="name" value={data.name} onChange={(e) => { setData({ ...data, name: e.target.value }) }} />

                <div>
                    <small className="block text-red-600 mb-5">
                        {error.name && error.name}
                    </small>
                </div>

                <label htmlFor="email" id="email" >Email</label>
                <input type="text" id="email" value={data.email} onChange={(e) => { setData({ ...data, email: e.target.value }) }} />

                <div>
                    <small className="block text-red-600 mb-5">
                        {error.email && error.email}
                    </small>
                </div>

                <label htmlFor="password" id="password" >Password</label>
                <input type="password" id="password" value={data.password} onChange={(e) => { setData({ ...data, password: e.target.value }) }} />

                <div>
                    <small className="block text-red-600 mb-5">
                        {error.password && error.password}
                    </small>
                </div>

                <button>Submit</button>
            </form>
            <Link to={"/login"}>Are you already a user?</Link>
        </div>
    );
}

export default SignUp;