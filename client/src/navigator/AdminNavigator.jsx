import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../components/NotFound";
import Movies from "../components/admin/Movies.jsx";
import Actors from "../components/admin/Actors.jsx";
import Dashboard from "../components/admin/Dashboard.jsx";
import Navbar from "../components/admin/Navbar";
import Header from "../components/admin/Header";
import MovieUpload from "../components/admin/MovieUpload";
import ActorUpload from "../components/modals/ActorUpload";

const AdminNavigator = () => {
  const [showMovieUploadModal, setShowMovieUploadModal] = useState(false);
  const [showActorUploadModal, setShowActorUploadModal] = useState(false);

  const displayActorUploadModal = () => {
    setShowActorUploadModal(true);
  };

  const hideActorUploadModal = () => {
    setShowActorUploadModal(false);
  };

  const displayMovieUploadModal = () => {
    setShowMovieUploadModal(true);
  };

  const hideMovieUploadModal = () => {
    setShowMovieUploadModal(false);
  };

  return (
    <div className="relative">
      <div className="flex bg-primary dark:bg-white">
        <Navbar />
        <div className="flex-1 m-2 max-w-screen-xl overflow-hidden">
          <Header
            onAddMovieClick={displayMovieUploadModal}
            onAddActorClick={displayActorUploadModal}
          />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/actors" element={<Actors />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>

      <MovieUpload
        visible={showMovieUploadModal}
        onClose={hideMovieUploadModal}
      />
      <ActorUpload
        visible={showActorUploadModal}
        onClose={hideActorUploadModal}
      />
    </div>
  );
};

export default AdminNavigator;
