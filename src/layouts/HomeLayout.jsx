import React from "react";
import { Outlet, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

const HomeLayout = () => {
  const { state } = useNavigate();
  return (
    <div className="">
      <header className="">
        <Navbar></Navbar>
      </header>
      <main className="">
        <div className="min-h-[calc(100vh-280px)]">
          <div className="">
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
