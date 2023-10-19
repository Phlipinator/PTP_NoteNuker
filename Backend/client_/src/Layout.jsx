import './Layout.css';
import {Outlet} from "react-router-dom";

function Layout() {
    return (
        <div>
            <div className={"flex_row navbar"}>
                <div className={"flex1 logo"}>Note Nuker</div>
                <ul className={"flex_row menu"}>
                    <li><a href="/">Password Manager</a></li>
                    <li><a href="/quiz">Quiz</a></li>
                    <li>Log out</li>
                </ul>
            </div>
            <Outlet/>
        </div>

    );
}

export default Layout;
