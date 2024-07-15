import { BsFacebook, BsTwitter, BsLinkedin, BsInstagram } from "react-icons/bs";
import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div>
      <footer className="relative left-0 bottom-0 h-[10vh] flex flex-col sm:flex-row items-center justify-between text-white bg-gray-700 sm:px-20 ">
        <section className="text-lg ">
          <p className="text-center sm:text-left">
            Copyright © {year} | All Rights Reserved
          </p>
        </section>
        <section className="flex items-center justify-center gap-5 text-2xl text-white">
          <a
            className="hover:text-yellow-300 transition-all ease-in-out duration-100"
            href=""
          >
            {" "}
            <BsFacebook />{" "}
          </a>
          <a
            className="hover:text-yellow-300 transition-all ease-in-out duration-100"
            href=""
          >
            {" "}
            <BsTwitter />{" "}
          </a>
          <a
            className="hover:text-yellow-300 transition-all ease-in-out duration-100"
            href=""
          >
            {" "}
            <BsInstagram />{" "}
          </a>
          <a
            className="hover:text-yellow-300 transition-all ease-in-out duration-100"
            href=""
          >
            {" "}
            <BsLinkedin />{" "}
          </a>
        </section>
      </footer>
    </div>
  );
};

export default Footer;
