import { useState } from "react";
import { FaLeaf } from "react-icons/fa6";
import {  NavLink } from "react-router-dom";
import { IoLogInOutline } from "react-icons/io5";

const Header = () => {
  const [isActive, setIsactive] = useState("beranda");

  return (
    <>
      <div className="px-[20%] flex justify-between items-center py-3 shadow-sm shadow-gray-200 bg-white">
        <div className="font-bold text-black flex justify-start items-center gap-2">
          <div className="p-2 bg-green-800 rounded-md">
            <FaLeaf size={20} color="#ffffff" />
          </div>
          <h2>SisPakar</h2>
        </div>

        <nav>
          <ul className="flex justify-center items-center gap-5 ">
            <NavLink
              to="/"
              end
              className={({isActive}) =>
                `hover:bg-primary-100 rounded-md px-3 py-2 cursor-pointer ${isActive ? "text-green-700 bg-primary-100" : "text-gray-600"}`
              }
            >
              Beranda
            </NavLink>
            <NavLink
              to="/diagnosa"
              end
              className={({isActive}) =>
                `hover:bg-primary-100 rounded-md px-3 py-2 cursor-pointer ${isActive ? "text-green-700 bg-primary-100" : "text-gray-600"}`
              }
            >
              Diagnosa
            </NavLink>
            <NavLink
              to="/basispengetahuan"
              end
              className={({isActive}) =>
                `hover:bg-primary-100 rounded-md px-3 py-2 cursor-pointer ${isActive ? "text-green-700 bg-primary-100" : "text-gray-600"}`
              }
            >
              Basis Pengetahuan
            </NavLink>
            <NavLink
              to="/tentang"
              end
              className={({isActive}) =>
                `hover:bg-primary-100 rounded-md px-3 py-2 cursor-pointer ${isActive ? "text-green-700 bg-primary-100" : "text-gray-600"}`
              }
            >
              Tentang
            </NavLink>
          </ul>
        </nav>

        <div className="flex justify-end items-center gap-5">
          <NavLink to="/diagnosa" className="px-4 py-2 text-white font-semibold bg-green-800 rounded-md">
            Mulai Diagnosa
          </NavLink>
          or
          <NavLink
            to={"/login"}
            className="px-4 py-2 text-white font-semibold bg-green-800 rounded-md flex justify-center items-center gap-2"
          >
            <IoLogInOutline size={20} />
            Login
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Header;
