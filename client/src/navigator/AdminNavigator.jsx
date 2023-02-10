import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../components/NotFound";
import Movies from "../components/admin/Movies.jsx";
import Actors from "../components/admin/Actors.jsx";
import Dashboard from "../components/admin/Dashboard.jsx";
import Navbar from "../components/admin/Navbar";
import Header from "../components/admin/Header";

const AdminNavigator = () => {
  return (
    <div className="flex bg-primary dark:bg-white">
      <Navbar />
      <div className="flex-1 m-2 max-w-screen-xl overflow-hidden">
        <Header onAddMovieClick={() => console.log("add movie")} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/actors" element={<Actors />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminNavigator;
