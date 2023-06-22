import { createContext, useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    useEffect(() => {
        axios
            .get("/api/secure")
            .then((resp) => setUser(resp.data))
            .catch((_e) => {
                // nav("/login", {
                //   state: {
                //     redirectReason:
                //       "Your session is not valid anymore. Please login again!",
                //   },
                // })
            });
    }, [navigate]);

    const logout = async () => {
        await axios.get("/api/logout");
        setUser({});
        nav("/");
    };

    return (
        <UserContext.Provider
            value={{
                user,
                logout,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};