import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";

// icons
import { MdNavigateNext } from "react-icons/md";
import ModalDelete from "../../components/ui/deleteModal";
import { CiSearch } from "react-icons/ci";
import TambahPenyakitModal from "../../components/ui/tambahPenyakitModal";
import EditPenyakitModal from "../../components/ui/editPenyakitModal";

export default function AdminPenyakit() {
  const [rows, setRows] = useState([]);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [tambahPenyakit, setTambahPenyakit] = useState(false);

  const handleEdit = (id) => {
    setSelectedId(id);
    setModalEdit(true);
  };

  const handleDelete = (id) => {
    setSelectedId(id);
    setModalDelete(true);
  };

  const columns = [
    {
      field: "id",
      headerName: "Id",
      width: 50,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "namaPenyakit",
      headerName: "Nama penyakit",
      width: 200,
      renderCell: (params) => {
        return <span className="text-[16px] font-medium">{params.value}</span>;
      },
    },
    { field: "deskripsi", headerName: "Deskripsi Penyakit", flex: 1 },
    {
      field: "aksi",
      headerName: "Aksi",
      headerAlign: "center",
      width: 200,
      sortable: false,
      renderCell: (params) => {
        return (
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center gap-3  w-full text-white">
              <button
                className="bg-green-700 hover:bg-green-800 w-full rounded-md px-3 py-2"
                onClick={() => handleEdit(params.row.id)}
              >
                Edit
              </button>
              <button
                className="bg-red-700 hover:bg-red-800 w-full rounded-md px-3 py-2"
                onClick={() => handleDelete(params.row.id)}
              >
                Hapus
              </button>
            </div>
          </div>
        );
      },
    },
  ];

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

  const refetchData = () => {
    getPenyakit();
  };

  return (
    <>
      <div className="flex justify-start items-center gap-5 mb-5 ">
        <p>Dashboard</p>
        <MdNavigateNext size={20} />
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

        <button
          className="bg-green-700 rounded-md text-white px-5 py-2 hover:bg-green-800"
          onClick={() => setTambahPenyakit(true)}
        >
          Tambah Penyakit
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
              padding: "12px 16px",
            },
          }}
        />
      </div>

      {/* show modal delete */}
      {tambahPenyakit && (
        <TambahPenyakitModal
          setTambahPenyakit={setTambahPenyakit}
          onSuccess={refetchData}
        />
      )}
      {modalEdit && (
        <EditPenyakitModal
          setModalEdit={setModalEdit}
          onSuccess={refetchData}
          selectedId={selectedId}
        />
      )}
      {modalDelete && (
        <ModalDelete
          setModalDelete={setModalDelete}
          selectedId={selectedId}
          onSuccess={refetchData}
        />
      )}
    </>
  );
}
