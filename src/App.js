import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import AddStudent from "./Routes/AddStudent";
import Student from "./Routes/Student";
import EditStudent from "./Routes/EditStudent";
// TODO: answer here
import NotFound from "./Routes/NotFound";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="add">
                <Route index element={<AddStudent />} />
            </Route>
            <Route path="student">
                <Route index element={<Student />} />
                <Route path=":id" element={<EditStudent />} />
            </Route>
            <Route path="*" element={<NotFound />} />
            {/* test coba */}
            {/* <Route path="edit">
                <Route index element={<EditStudent />} />
            </Route>
            <Route path="*" element={<NotFound />} /> */}
        </Routes>
    );
};

export default App;
