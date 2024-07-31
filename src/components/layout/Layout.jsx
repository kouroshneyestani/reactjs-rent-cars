import { Outlet, Link } from "react-router-dom";

function Layout() {
    return (
        <div>
            <header>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/cars">Cars</Link>
                        </li>
                        <li>
                            <Link to="/search">Search</Link>
                        </li>
                    </ul>
                </nav>
            </header>

            <hr />

            <Outlet />
        </div>
    );
}

export default Layout;
