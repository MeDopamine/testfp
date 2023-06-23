import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import NavBar from "../components/Navbar";

const Student = () => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isRefresh, setIsRefresh] = useState(false)
    const [filter, setFilter] = useState("All");
    useEffect(() => {
        fetchData();

    }, [isRefresh]);
    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:3001/student`);
            // const response = await fetch('https://swapi.py4e.com/api/people');
            const jsonData = await response.json();
            // const lastStudent = jsonData[jsonData.length - 1];
            // const lastId = lastStudent ? lastStudent.id : 0;
            // console.log(jsonData);
            // setLastId(lastId);
            setData(jsonData);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false)
            console.log('Error fetching data:', error);
        }
    };
    const handleDeleteData = async (id) => {
        try {
            await fetch(`http://localhost:3001/student/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setIsRefresh(!isRefresh);
            return { message: `Successfully deleted student data with id ${id}` }
        } catch (error) {
            console.error("Error:", error);
        }
    }
    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const filteredData =
        filter !== "All"
            ? data?.filter((student) => student.faculty === filter)
            : data;
    return (
        <>
            <NavBar/>
            {isLoading?
            <p>Loading ...</p>
            :
            <>
                <select
                    data-testid="filter"
                    value={filter}
                    onChange={handleFilterChange}
                >
                    <option value="All">All</option>
                    <option value="Fakultas Ekonomi">Fakultas Ekonomi</option>
                    <option value="Fakultas Ilmu Sosial dan Politik">
                        Fakultas Ilmu Sosial dan Politik
                    </option>
                    <option value="Fakultas Teknik">Fakultas Teknik</option>
                    <option value="Fakultas Teknologi Informasi dan Sains">
                        Fakultas Teknologi Informasi dan Sains
                    </option>
                </select>
                <table id="table-student">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Full Name</th>
                            <th>Faculty</th>
                            <th>Program Study</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData?.map((student, index) => (
                            <tr className="student-data-row" key={student.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <Link to={`/student/${student.id}`}>
                                        {student.fullname}
                                    </Link>
                                </td>
                                <td>{student.faculty}</td>
                                <td>{student.programStudy}</td>
                                {/* <td><a onClick={handleDeleteData}>Delete</a></td> */}
                                <td><button data-testid={`delete-${student.id}`} onClick={() => handleDeleteData(student.id)}>Delete</button></td>
                                {/* <td><button onClick={handleDeleteData(student.id)}>Delete</button></td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
            }
        </>
    );
};

export default Student;
