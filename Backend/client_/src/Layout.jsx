import './Layout.css';
import {NavLink, Outlet} from "react-router-dom";

function Layout() {
    return (
        <div>
            <div className={"flex_row navbar"}>
                <div className={"flex1 logo"}>Note Nuker</div>
                <ul className={"flex_row menu"}>
                    <li><NavLink to='/' activeClassName="active">Password Manager</NavLink></li>
                    <li><NavLink to='/quiz' activeClassName="active">Quiz</NavLink></li>
                    <li>Log out</li>
                </ul>
            </div>
            <Outlet/>
        </div>

    );
}

export default Layout;
