import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaLeaf } from "react-icons/fa";

const GejalaPenyakitModal = ({
  setTambahRelasiModal,
  selectedId,
  onSuccess,
}) => {
  // selected id adalah id dari penyakit nya
  const [dataGejala, setDataGejala] = useState([]);
  const [gejala, setGejala] = useState();
  const [cf, setCf] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/penyakitGejala`,
        {
          penyakit_id: Number(selectedId),
          gejala_id: Number(gejala),
          cf_pakar: Number(cf),
        },
      );
      setGejala();
      setCf();
      toast.success("data berhasil ditambahkan");
      setTambahRelasiModal(false);
      onSuccess();
      //   console.log(response.data.msg);
    } catch (error) {
      //   console.log(error.response.data.msg);
      toast.error(error.response.data.msg);
    }
  };

  useEffect(() => {
    const getDataGejala = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/gejala`,
      );
      console.log(response.data);
      setDataGejala(response.data);
    };
    getDataGejala();
  }, []);
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
                Tambah Gejala Baru
              </h1>
            </div>
            <button onClick={() => setTambahRelasiModal(false)}>X</button>
          </div>

          {/* inputan */}
          <form
            className="flex flex-col justify-start items-start gap-5 w-full text-sm"
            onSubmit={handleSubmit}
          >
            <div className="w-full ">
              <label>Pilih Gejala</label>
              <select
                required
                className="w-full border px-3 py-2 rounded-md"
                value={gejala || ""}
                onChange={(e) => setGejala(e.target.value)}
              >
                <option value="">-- Pilih Gejala --</option>

                {dataGejala.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nama_gejala}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <label>CF Pakar</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded-md"
                value={cf}
                onChange={(e) => setCf(e.target.value)}
                required
              />
            </div>

            <div className="w-full flex justify-end items-center gap-3">
              <button
                className="font-medium hover:bg-green-100 px-4 py-2 rounded-md"
                onClick={() => setTambahRelasiModal(false)}
              >
                Batal
              </button>
              <button
                type="submit"
                className="font-medium bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded-md"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default GejalaPenyakitModal;
