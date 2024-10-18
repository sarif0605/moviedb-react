import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/nav/Navbar";
import { Footer } from "../components/Footer";

export const PublicLayout: React.FC = () => {
  return (
    <>
      <main className="mx-auto max-w-6xl min-h-90">
        <Navbar />
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
