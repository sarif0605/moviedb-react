import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">
        Halaman yang Anda cari tidak ditemukan.
      </p>
      <button className="btn btn-primary" onClick={goHome}>
        Kembali ke Halaman Utama
      </button>
    </div>
  );
};

export default NotFound;
