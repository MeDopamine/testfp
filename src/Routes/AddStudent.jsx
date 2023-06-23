import { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
    const [fullname, setFullname] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [gender, setGender] = useState("Male");
    const [programStudy, setProgramStudy] = useState("Ekonomi");
    const [profilePicture, setProfilePicture] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isRefresh, setIsRefresh] = useState(false)
    const [lastId, setLastId] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        fetchData();
    }, [isRefresh]);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:3001/student`);
            // const response = await fetch('https://swapi.py4e.com/api/people');
            const jsonData = await response.json();
            const lastStudent = jsonData[jsonData.length - 1];
            const lastId = lastStudent ? lastStudent.id : 0;
            // console.log(jsonData);
            setLastId(lastId);
            
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };

    const handleAddData = async (e) => {
        e.preventDefault();
        const newId = lastId + 1;
        

        const faculties = {
            "Ekonomi": "Fakultas Ekonomi",
            "Manajemen": "Fakultas Ekonomi",
            "Akuntansi": "Fakultas Ekonomi",
            "Administrasi-publik": "Fakultas Ilmu Sosial dan Politik",
            "Administrasi-bisnis": "Fakultas Ilmu Sosial dan Politik",
            "Hubungan-internasional": "Fakultas Ilmu Sosial dan Politik",
            "Teknik-sipil": "Fakultas Teknik",
            "Arsitektur": "Fakultas Teknik",
            "Matematika": "Fakultas Teknologi Informasi dan Sains",
            "Fisika": "Fakultas Teknologi Informasi dan Sains",
            "Informatika": "Fakultas Teknologi Informasi dan Sains"
        };
        
        const newStudent = {
            fullname: fullname,
            profilePicture: profilePicture,
            address: address,
            phoneNumber: phoneNumber,
            birthDate: birthDate,
            gender: gender,
            faculty:faculties[programStudy],
            programStudy: programStudy,
            id: newId,
        };

        try {
            // console.log(newStudent);
            // onButtonClick(newStudent);

            // Reset form fields after successful data addition
            const response = await fetch("http://localhost:3001/student", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newStudent),
            });
            const jsonData = await response.json();
            console.log("Successfully added student data:", jsonData);
            setFullname("");
            setBirthDate("");
            setAddress("");
            setProfilePicture("");
            setPhoneNumber("");
            setGender("Male");
            setProgramStudy("ekonomi");
            setIsRefresh(!isRefresh)
            navigate("/student");
        } catch (error) {
            console.error("Error adding student data:", error);
        }
    };

    return (
        <>
            <NavBar/>
            <form id="form-student" onSubmit={handleAddData}>
                <label htmlFor="input-name" id="Fullname">
                    Fullname
                </label>
                <input
                    id="input-name"
                    type="text"
                    data-testid="name"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                />

                <label htmlFor="input-profile-picture" id="Profile Picture">
                    Profile Picture
                </label>
                <input
                    type="text"
                    id="input-profile-picture"
                    data-testid="profilePicture"
                    value={profilePicture}
                    onChange={(e) => setProfilePicture(e.target.value)}
                />

                <label htmlFor="input-address" id="Address">
                    Address
                </label>
                <input
                    type="text"
                    id="input-address"
                    data-testid="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

                <label htmlFor="input-phone" id="Phone Number">
                    Phone Number
                </label>
                <input
                    type="text"
                    id="input-phone"
                    data-testid="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />

                <label htmlFor="input-date" id="Birth Date">
                    Birth Date
                </label>
                <input
                    type="date"
                    id="input-date"
                    data-testid="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                />

                <label htmlFor="input-gender" id="Gender">
                    Gender
                </label>
                <select
                    id="input-gender"
                    data-testid="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>

                <label htmlFor="input-prody" id="Program Study">
                    Program Study
                </label>
                <select
                    id="input-prody"
                    data-testid="prody"
                    value={programStudy}
                    onChange={(e) => setProgramStudy(e.target.value)}
                >
                    <option value="Ekonomi">Ekonomi</option>
                    <option value="Manajemen">Manajemen</option>
                    <option value="Akuntansi">Akuntansi</option>
                    <option value="Administrasi-publik">Administrasi Publik</option>
                    <option value="Administrasi-bisnis">Administrasi Bisnis</option>
                    <option value="Hubungan-internasional">Hubungan Internasional</option>
                    <option value="Teknik-sipil">Teknik Sipil</option>
                    <option value="Arsitektur">Arsitektur</option>
                    <option value="Matematika">Matematika</option>
                    <option value="Fisika">Fisika</option>
                    <option value="Informatika">Informatika</option>
                </select>

                <input
                    type="submit"
                    data-testid="add-btn"
                    value="Add student"
                    id="add-btn"
                />
            </form>
        </>
    );
};

export default AddStudent;
