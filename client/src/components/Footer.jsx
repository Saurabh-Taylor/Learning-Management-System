import { BsFacebook, BsTwitter, BsLinkedin, BsInstagram } from "react-icons/bs";
import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="bg-gray-700 text-white py-6">
      <footer className="container mx-auto px-4 sm:px-20 flex flex-col sm:flex-row items-center justify-between">
        <section className="text-center sm:text-left mb-4 sm:mb-0">
          <p className="text-lg">
            Copyright © {year} | All Rights Reserved
          </p>
        </section>
        <section className="flex items-center justify-center gap-5 text-2xl">
          <a
            className="hover:text-yellow-300 transition-all ease-in-out duration-100"
            href=""
            aria-label="Facebook"
          >
            <BsFacebook />
          </a>
          <a
            className="hover:text-yellow-300 transition-all ease-in-out duration-100"
            href=""
            aria-label="Twitter"
          >
            <BsTwitter />
          </a>
          <a
            className="hover:text-yellow-300 transition-all ease-in-out duration-100"
            href=""
            aria-label="Instagram"
          >
            <BsInstagram />
          </a>
          <a
            className="hover:text-yellow-300 transition-all ease-in-out duration-100"
            href=""
            aria-label="LinkedIn"
          >
            <BsLinkedin />
          </a>
        </section>
      </footer>
    </div>
  );
};

export default Footer;
