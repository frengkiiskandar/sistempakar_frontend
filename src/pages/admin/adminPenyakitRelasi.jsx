import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";

// icons
import { MdOutlineNavigateNext, MdOutlineEdit } from "react-icons/md";
import ModalDelete from "../../components/ui/deleteModal";
import { FaCheck } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import GejalaPenyakitModal from "../../components/ui/gejalaPenyakitModal";

export default function AdminPenyakitRelasi() {
  const [rows, setRows] = useState([]);
  const [modalDelete, setModalDelete] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [tambahRelasiModal, setTambahRelasiModal] = useState(false);


  const handleDelete = (id) => {
    setSelectedId(id);
    setModalDelete(true);
  };

  const handleDeleteGejalaFromPenyakit = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/penyakitGejala/${id}`,
      );
      // console.log(response);
      getPenyakit();
    } catch (error) {
      console.log(error.response);
    }
  };

  const getPenyakit = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/penyakit`,
      );
      // console.log(response.data);
      setRows(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getPenyakit();
  }, []);

  const refetchData =()=>{
    getPenyakit()
  }

  const columns = [
    {
      field: "id",
      headerName: "Id",
      width: 50,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "namaPenyakit",
      headerName: "Nama penyakit",
      width: 200,
      renderCell: (params) => {
        return <span className="text-[16px] font-medium">{params.value}</span>;
      },
    },
    {
      field: "gejala",
      headerName: "Gejala Penyakit",
      flex: 1,
      renderCell: (params) => {
        const data = params.row.penyakit_gejalas || [];
        // console.log("row:", data);
        return (
          <div className="flex flex-wrap gap-2 ">
            {data.map((value, index) => (
              <div
                key={index}
                className="bg-green-100 text-green-900 rounded-full text-xs px-2 py-1 flex justify-start items-center gap-2 border border-green-300"
              >
                {value.gejala.nama_gejala}
                <button
                  className="w-5 h-5 rounded-full bg-red-200 hover:bg-red-300 bg-opacity-65 border border-red-300 flex justify-center items-center"
                  onClick={() => handleDeleteGejalaFromPenyakit(value.id)}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        );
      },
    },
    {
      field: "aksi",
      headerName: "Aksi",
      headerAlign: "center",
      width: 200,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center gap-3  w-full text-white ">
              <button
                className="bg-green-100 text-green-800 hover:bg-green-200 w-full rounded-md px-3 py-2 flex justify-center items-center gap-2"
                onClick={()=>{setTambahRelasiModal(true) ; setSelectedId(params.row.id)}}
              >
                <FaPlus size={15}/>
                Tambah
              </button>
              {/* <button
                className="bg-red-100 hover:bg-red-200 text-red-700 w-full rounded-md px-3 py-2 flex justify-center items-center gap-2"
                onClick={() => handleDelete(params.row.id)}
              >
                <GoTrash size={20} />
                Hapus
              </button> */}
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="flex justify-start items-center gap-5 mb-5 ">
        <p>Dashboard</p>
        <MdOutlineNavigateNext size={20} />
        <p>Penyakit</p>
      </div>

      {/* tambah data */}
      <div className="flex justify-between items-center px-5 py-7 rounded-xl border shadow-md mb-5 bg-white">
        <div className="relative">
          <input
            type="text"
            className="px-8 py-2 rounded-md bg-white outline-none border shadow-sm min-w-96"
            placeholder="Cari Penyakit..."
          />
          <span className="absolute top-1/2 transform -translate-y-1/2 right-5">
            <CiSearch size={20} />
          </span>
        </div>

        <button className="bg-green-700 rounded-md text-white px-5 py-2 hover:bg-green-800">
          Tambah Relasi Baru
        </button>
      </div>
      <div style={{ height: 820, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          getRowHeight={() => "auto"}
          sx={{
            "& .MuiDataGrid-cell": {
              padding: "12px 16px", // ⬅️ padding dalam cell
            },
          }}
        />
      </div>

      {/* show modal delete */}
      {tambahRelasiModal && <GejalaPenyakitModal  setTambahRelasiModal={setTambahRelasiModal} selectedId={selectedId} onSuccess={refetchData} />}
      {modalDelete && <ModalDelete setModalDelete={setModalDelete} />}
    </>
  );
}
