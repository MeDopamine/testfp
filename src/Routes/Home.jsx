import { Link } from "react-router-dom"

const Home = () => {
    return (
        <>
        <Link to="/student">
            <input type="submit" data-testid="student-btn" value="All Student" id="add-btn" />
        </Link>
        {/* <Link to="/add">
            <input type="submit" data-testid="student-btn" value="ADD Student" id="add-btn" />
        </Link>
        <Link to="/edit">
            <input type="submit" data-testid="student-btn" value="Edit Student" id="add-btn" />
        </Link> */}
        </>
    ) 
};

export default Home;
