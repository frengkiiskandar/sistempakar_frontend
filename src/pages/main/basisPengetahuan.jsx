import { FaBook, FaStethoscope } from "react-icons/fa";
import { MdNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";

// icons
import { IoBook, IoFlask } from "react-icons/io5";
import { FaLeaf, FaBug } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import axios from "axios";

const BasisPengetahuan = () => {
  const [isActive, setIsActive] = useState("semua");
  const [dataPenyakit, setDataPenyakit] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getPenyakit = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/penyakit?namaPenyakit=${search} `,
      );
      console.log(response.data);
      setDataPenyakit(response.data);
    };

    getPenyakit();
  }, []);

  return (
    <>
      <div className="bg-[#f6f8f3] text-gray-600">
        <div className="w-full px-[20%] py-10">
          {/* Breadcrumb */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3 text-green-800">
              <Link to={"/"}> Beranda </Link>
              <MdNavigateNext size={20} />
              <p className="text-gray-600">Basis Pengetahuan</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-green-800 text-white">
                <FaStethoscope size={20} />
              </div>
           <p className=" font-bold text-3xl text-black">Basis Pengetahuan</p>
            </div>

            <p>
              Daftar lengkap penyakit, hama, dan gangguan nutrisi pada tanaman
              kelengkeng beserta gejala, nilai CF Pakar, dan rekomendasi
              penanganan
            </p>
          </div>

          {/* section tabel */}
          <div className="flex flex-col justify-start items-start gap-5 w-full py-5">
            {/* 1 */}
            <div className="flex justify-between items-center gap-5 w-full">
              <div className="p-5 w-full flex-1 flex flex-col justify-center items-center gap-1 border border-primary-300 bg-white rounded-2xl">
                <IoBook size={30} color="515d3f" />
                <p className="text-3xl font-bold">8</p>
                <p>Total Gangguan</p>
              </div>
              <div className="p-5 w-full flex-1 flex flex-col justify-center items-center gap-1 border border-primary-300 bg-white rounded-2xl">
                <FaLeaf size={30} color="515d3f" />
                <p className="text-3xl font-bold">8</p>
                <p>Jenis Penyakit</p>
              </div>
              <div className="p-5 w-full flex-1 flex flex-col justify-center items-center gap-1 border border-primary-300 bg-white rounded-2xl">
                <FaBug size={30} color="515d3f" />
                <p className="text-3xl font-bold">8</p>
                <p>Jenis Hama</p>
              </div>
              <div className="p-5 w-full flex-1 flex flex-col justify-center items-center gap-1 border border-primary-300 bg-white rounded-2xl">
                <IoFlask size={30} color="515d3f" />
                <p className="text-3xl font-bold">8</p>
                <p>Total Gejala</p>
              </div>
            </div>
          </div>

          {/* cari penyakit */}
          <div className="flex justify-center items-center gap-5">
            <div className="w-full flex-1 relative">
              <input
                type="text"
                className=" px-5 py-2 rounded-md outline-none bg-primary-50 border border-primary-400 w-full"
                placeholder="Cari penyakit, hama, atau gejala"
              />
              <div className="absolute top-1/2 transform -translate-y-1/2 right-5">
                <CiSearch size={20} />
              </div>
            </div>

            <div className="w-full flex flex-1 justify-between items-center gap-5 font-medium">
              <button
                className={`${isActive === "semua" ? "bg-green-900 text-white border-none" : ""}  border-2 border-primary-400 px-5 py-2 rounded-lg w-full`}
                onClick={() => setIsActive("semua")}
              >
                semua
              </button>
              <button
                className={`${isActive === "penyakit" ? "bg-green-900 text-white border-none" : ""}  border-2 border-primary-400 px-5 py-2 rounded-lg w-full`}
                onClick={() => setIsActive("penyakit")}
              >
                Penyakit
              </button>
              <button
                className={`${isActive === "hama" ? "bg-green-900 text-white border-none" : ""}  border-2 border-primary-400 px-5 py-2 rounded-lg w-full`}
                onClick={() => setIsActive("hama")}
              >
                Hama
              </button>
              <button
                className={`${isActive === "defisiensi" ? "bg-green-900 text-white border-none" : ""}  border-2 border-primary-400 px-5 py-2 rounded-lg w-full`}
                onClick={() => setIsActive("defisiensi")}
              >
                Defisiensi
              </button>
            </div>
          </div>

          {/* list penyakit */}
          <div className="flex flex-wrap justify-center items-center gap-5 py-10">
            {dataPenyakit &&
              dataPenyakit?.map((value, index) => (
                <div
                  key={index}
                  className="flex-[0_0_calc(50%-0.625rem)] bg-white rounded-2xl border-2 border-primary-300 shadow-md p-5 flex flex-col justify-start items-start gap-5"
                >
                  <div className="flex justify-between items-center w-full">
                    <div className="flex flex-col justify-start items-start gap-2">
                      <div className="flex gap-3">
                        <p>P0{index + 1} </p>
                        <span className="px-3 py-1 border border-red-300 bg-red-200 text-red-800 font-medium text-sm rounded-full">
                          Penyakit
                        </span>
                      </div>
                      <h2 className="font-bold text-2xl ">
                        {value.namaPenyakit}{" "}
                      </h2>
                    </div>
                    <p>icons</p>
                  </div>

                  <p className="text-gray-500">{value.deskripsi} </p>
                  <p className="uppercase font-medium">
                    Semua Gejala & Nilai CF Pakar
                  </p>
                  <div className="flex flex-col flex-wrap justify-start items-start gap-2 min-h-64">
                    {/* disini mau mapping lagi */}
                    {value.penyakit_gejalas?.map((gejala) => (
                      <>
                        <div className="flex justify-between items-center gap-5 w-full px-2 py-1 rounded-md bg-primary-100 text-gray-700">
                          <p className="">
                            {gejala.gejala.nama_gejala}
                          </p>
                          <p className="w-32 text-right text-lg">CF : {gejala.cf_pakar} </p>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BasisPengetahuan;
