import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav>
            <h1>
                <Link to="/" data-testid="home-page">
                    Student Portal
                </Link>
            </h1>
            <ul>
                <li>
                    <Link to="/student" data-testid="student-page">
                        All Student
                    </Link>
                </li>
                <li>
                    <Link to="/add" data-testid="add-page">
                        Add Student
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
