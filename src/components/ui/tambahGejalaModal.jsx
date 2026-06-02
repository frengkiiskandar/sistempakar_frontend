import axios from "axios";
import { useState } from "react";
import { FaLeaf } from "react-icons/fa";

const TambahGejalaModal = ({ setTambahGejala, onSuccess }) => {
  const [namaGejala, setNamaGejala] = useState("");
  const [kategori, setKategori] = useState("");

  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/gejala`,
        {
          nama_gejala: namaGejala,
          kategori,
        },
      );
      // console.log(response.data.msg);
      setMsg(response.data.msg);
      setNamaGejala("");
      setKategori("");
      setTambahGejala(false);
      onSuccess();
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <>
      <div className="fixed inset-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-60">
        <div className="bg-white p-5 shadow-md rounded-lg flex flex-col justify-start items-start gap-5 w-[30rem]">
          {/* judul */}
          <div className="flex justify-between items-center w-full">
            <div className=" w-full">
              <h1 className="font-semibold text-lg flex items-center gap-3">
                <span className="text-green-700">
                  {" "}
                  <FaLeaf size={20} />
                </span>
                Tambah Data Penyakit Baru
              </h1>
            </div>
            <button onClick={() => setTambahGejala(false)}>X</button>
          </div>

          {/* item input */}
          <form
            className="flex flex-col justify-start items-start gap-3 w-full text-sm"
            onSubmit={handleSubmit}
          >
            {/* 1 */}
            <div className="w-full">
              <label htmlFor="" className="font-semibold">
                Nama Gejala
              </label>
              <input
                type="text"
                className="w-full rounded-md outline-none bg-none px-4 py-2 border-2 focus:border-green-600"
                value={namaGejala}
                onChange={(e) => setNamaGejala(e.target.value)}
                required
              />
            </div>
            {/* 1 */}
            <div className="w-full">
              <label htmlFor="" className="font-semibold">
                Kategori
              </label>
              <textarea
                className="w-full min-h-28 rounded-md outline-none bg-none px-4 py-2 border-2 focus:border-green-600"
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                required
              ></textarea>
            </div>
         

            <div className="flex justify-end items-center gap-3 w-full">
              <button className="px-4 py-2 rounded-md hover:bg-green-100 font-medium" onClick={()=>setTambahGejala(false)} >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 transition-colors duration-100 ease-linear text-white"
              >
                Tambah Data
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TambahGejalaModal;
