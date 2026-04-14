import React from "react";
import { FaLeaf } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="px-[20%] py-10  text-gray-500 text-sm">
        <div className="flex justify-between items-start">
          <div className="w-[30rem] ">
            <div className=" flex justify-start items-center gap-2 font-semibold text-black">
              <div className="p-2 rounded-md bg-green-800 text-white">
                <FaLeaf />
              </div>
              SisPakar Kelengkeng
            </div>
            <p className="mt-2 w-[25rem]">
              Sistem Pakar berbasis web untuk mendiagnosis penyakit dan hama
              pada tanaman kelengkeng menggunakan metode Certainty Factor.
            </p>
          </div>

          <div className="w-[25rem]">
            <ul className=" flex flex-col justify-start items-start gap-3 ">
              <li className="text-black font-medium">Navigasi</li>
              <li>Beranda</li>
              <li>Diagnosis</li>
              <li>Basis Pengetahuan</li>
              <li>Tentang Metode</li>
            </ul>
          </div>

          <div className="w-[25rem] flex flex-col justify-start items-start gap-3 ">
            <p className="text-black font-medium">Informasi</p>
            <p>Metode : Certainty Factor ( CF )</p>
            <p>Stack : Javascript React + ExpressJs</p>
          </div>
        </div>

        <div className="my-5 border-b-[1px] border-gray-300 w-full"></div>

        <div className="flex justify-between items-center">
            <p>Dibuat Oleh : Sulistiani Nufus Universitas Pasir Pengaraian</p>
            <p>&copy; 2026 SisPakar Kelengkeng  </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
