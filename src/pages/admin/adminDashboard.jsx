import { DataGrid } from "@mui/x-data-grid";
// icons
import axios from "axios";
import { useEffect, useState } from "react";
import { FaLeaf } from "react-icons/fa6";
import { HiOutlineExclamationCircle } from "react-icons/hi2";


const AdminDashboard = () => {
  const [penyakit, setPenyakit] = useState();
  const [gejala, setGejala] = useState();
  const [relasi, setRelasi] = useState();

  const [rows, setRows] = useState([]);
  // data penyakit
  const getPenyakit = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/penyakit`,
    );
    setRows(response.data);
    setPenyakit(response.data.length);
  };
  // data gejala
  const getGejala = async () => {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/gejala`);
    setGejala(response.data.length);
  };
  // data relasi
  const getRelasi = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/penyakitGejala`,
    );
    setRelasi(response.data.length);
  };

  useEffect(() => {
    getPenyakit();
    getGejala();
    getRelasi();
  });

  // data tables
  const columns = [
    {
      field: "namaPenyakit",
      headerName: "Penyakit",
      width: 200,
      renderCell: (params) => {
        return <span className="text-sm text-gray-500 font-medium">{params.value}</span>;
      },
    },
  ];

  return (
    <>
      <div>
        <div className="bg-gradient-to-r from-green-700 to-green-500 flexflex-1 flex-col justify-start items-start gap-2 rounded-3xl text-white p-10">
          <p>Sistem Pakar</p>
          <h2 className="text-3xl font-bold">Diagnosa Penyakit Kelengkeng</h2>
          <p>
            Kelola basis pengethauan penyakit, gejala , dan relasi untuk
            mendukung diagnosa yang akurat
          </p>
        </div>

        {/* tabel umum */}
        <div className="flex justify-center items-center gap-5 w-full">
          <div className="flex flex-1 flex-col justify-start items-start gap-5 bg-white rounded-xl border shadow-sm px-5 py-10 my-5">
            <div className="text-green-600">
              <FaLeaf size={30} />
            </div>
            <p className="font-bold text-3xl">{penyakit} </p>
            <p className="text-gray-700 ">Total Penyakit</p>
          </div>

          <div className="flex flex-1 flex-col justify-start items-start gap-5 bg-white rounded-xl border shadow-sm px-5 py-10 my-5">
            <div className="text-green-600">
              <FaLeaf size={30} />
            </div>
            <p className="font-bold text-3xl">{gejala}</p>
            <p className="text-gray-700 ">Total Gejala</p>
          </div>
          <div className="flex flex-1 flex-col justify-start items-start gap-5 bg-white rounded-xl border shadow-sm px-5 py-10 my-5">
            <div className="text-green-600">
              <FaLeaf size={30} />
            </div>
            <p className="font-bold text-3xl">{relasi} </p>
            <p className="text-gray-700 ">Relasi Aktif</p>
          </div>
        </div>
        <div className="flex justify-start items-start gap-5">
          <div style={{ height: 500, width: "50%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSizeOptions={[5, 10]}
              getRowHeight={() => "auto"}
              sx={{
                borderRadius: "14px", // = 2xl
                overflow: "hidden", // penting biar sudutnya keliatan
                "& .MuiDataGrid-cell": {
                  padding: "12px 16px",
                },
              }}
            />
          </div>
          <div className="flex flex-col flex-1 justify-start items-start gap-10  bg-white px-5 py-10 rounded-xl border shadow-sm">
            <div className="flex items-center gap-2 font-semibold">
              <div className="text-green-800">
                <HiOutlineExclamationCircle size={20}/>
              </div>
              <p>Informasi Sistem</p>
            </div>

            <div className="flex flex-col justify-start items-start gap-3 w-full h-full text-gray-500">
              <div className="flex justify-between items-center border-b-2 border-gray-200 py-2 w-full">
                Stack Aplikasi
                <p>NodeJs, React, Express, MySql </p>
              </div>
              <div className="flex justify-between items-center border-b-2 border-gray-200 py-2 w-full">
                Metode
                <p>Certainty Factor</p>
              </div>
              <div className="flex justify-between items-center border-b-2 border-gray-200 py-2 w-full">
                Basis Pengetahuan
                <p>{penyakit} Penyakit </p>
              </div>
              <div className="flex justify-between items-center py-2 w-full">
                Status Sistem
                <p className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-100">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Aktif
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
