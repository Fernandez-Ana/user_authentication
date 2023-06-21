import { Link } from 'react-router-dom'
import './Nav.scss'

const Nav = () => {
    return (
        <div className='navbar'>
            <nav>
                <h2>Hello!</h2>
                <p>Please</p>
                <Link to={"/signup"}>Sign up</Link>
                <p>or</p>
                <Link to={"/login"}>Login</Link>
            </nav>
        </div>
    );
}

export default Nav;