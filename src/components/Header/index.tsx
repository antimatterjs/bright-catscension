import './Header.css';
import { NavLink } from "react-router-dom";

const Header = (props: HeaderProps) => {
    return (
        <header>
            <h1>Bright Catscension</h1>
            <nav>
                <ul>
                    <li><NavLink to='/'>Home</NavLink></li>
                    <li><NavLink to='/upload'>Upload</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;