import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";

const EditStudent = () => {
    const { id } = useParams();
    // const history = useHistory();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fullname, setFullname] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [gender, setGender] = useState("");
    const [programStudy, setProgramStudy] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    let navigate = useNavigate();

    useEffect(() => {
        const fetchStudent = async (id) => {
            try {
                const response = await fetch(`http://localhost:3001/student/${id}`);
                const data = await response.json();
                setStudent(data);
                setLoading(false);
                setFullname(data.fullname);
                setBirthDate(data.birthDate);
                setGender(data.gender);
                setProgramStudy(data.programStudy);
                setAddress(data.address)
                setPhoneNumber(data.phoneNumber)
                setProfilePicture(data.profilePicture)
                setLoading(false)
            } catch (error) {
                console.log(error);
            }
        };

        fetchStudent(id);
    }, [id]);

    const handleEditData = async (e) => {
        e.preventDefault();

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

        const updatedStudent = {
            fullname,
            birthDate,
            gender,
            programStudy,
            address,
            phoneNumber,
            faculty:faculties[programStudy],
            profilePicture
        };

        try {
            await fetch(`http://localhost:3001/student/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedStudent),
            });
            navigate("/student");
            // history.push("/student");
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) {
        return <p>Loading ...</p>;
    }

    return (
        <>
            <NavBar/>
            {loading?
            <p>Loading ...</p>
            :
            <>
            
                <img src={student.profilePicture} alt="Profile Picture" />

                <form id="form-student" onSubmit={handleEditData}>
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
                        id="add-btn"
                        data-testid="edit-btn"
                        value="Add student"
                    />
                </form>
            </>
            }
        </>
    );
};

export default EditStudent;
