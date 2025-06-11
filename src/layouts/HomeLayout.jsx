import React from "react";
import { Outlet, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

const HomeLayout = () => {
  const { state } = useNavigate();
  return (
    <div>
      <header className="w-11/12 mx-auto">
        {import.meta.env.VITE_name}
        <Navbar></Navbar>
      </header>
      <main className="w-11/12 mx-auto">
        <div className="min-h-[calc(100vh-280px)]">
          <div className="max-w-screen-2xl mx-auto px-8">
            {state == "loading" ? <Loading></Loading> : <Outlet />}
          </div>
        </div>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default HomeLayout;
