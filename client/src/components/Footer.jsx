import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bottom-0 left-0 text-white bg-gray-800 flex flex-col sm:flex-row items-center justify-between px-16 py-5 h-[10vh]">
      <section className="text-lg">
        Copyright {year} | All rights reserved.
      </section>
      <section className="text-2xl flex items-center justify-center gap-5">
        <a className="text-gray-500 hover:text-white transition-all ease-in-out duration-200">
          <BsFacebook />
        </a>
        <a className=" text-gray-500 hover:text-white transition-all ease-in-out duration-200">
          <BsInstagram />
        </a>
        <a className=" text-gray-500 hover:text-white transition-all ease-in-out duration-200">
          <BsLinkedin />
        </a>
        <a className=" text-gray-500 hover:text-white transition-all ease-in-out duration-200">
          <BsTwitter />
        </a>
      </section>
    </footer>
  );
}

export default Footer;
