import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

const Home = () => {

  useEffect(() => {
  }, []);

  return (
    <>
      <MainLayout>
          <div className="bg-primary text-white h-[40vh] py-8 text-center">
            <h1 className="text-2xl"> Welcome to Task Manager App</h1>
            <Link
              to="/signup"
              className="mt-10 text-xl block space-x-2 hover:space-x-4"
            >
              <span className="transition-[margin]">
                Join now to manage your tasks
              </span>
              <span className="relative ml-4 text-base transition-[margin]">
                <i className="fa-solid fa-arrow-right"></i>
              </span>
            </Link>
          </div>
      </MainLayout>
    </>
  );
};

export default Home;
