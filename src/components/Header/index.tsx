import './Header.css';
import { NavLink, Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <div className="header-content">
                <Link to='/'><img src="/logo.png" className="logo" /></Link>
                <nav>
                    <ul>
                        <li><NavLink to='/upload'>Upload</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;