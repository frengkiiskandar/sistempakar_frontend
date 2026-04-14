import axios from "axios";
import React from "react";

const ModalDelete = ({ setModalDelete, selectedId, onSuccess }) => {
  const handleDelete = async (e) => {
    e.preventDefault();
    const response = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/penyakit/${selectedId}`,
    );
    console.log(response.data);
    setModalDelete(false);
    onSuccess();
  };
  return (
    <>
      <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center">
        <div className="max-w-80 p-10 rounded-xl shadow-md bg-white flex flex-col justify-start items-start gap-3">
          <h2 className="font-bold text-xl">Hapus Data</h2>
          <p className="text-sm">
            Yakin ingin hapus data ini? Tindakan ini tidak bisa di pulihkan
          </p>
          <div className="w-full flex justify-end items-center gap-3">
            <button
              className="hover:bg-gray-200 px-5 py-2 rounded-md border"
              onClick={() => setModalDelete(false)}
            >
              Cancel
            </button>
            <button
              className="text-white bg-red-700 hover:bg-red-800 px-5 py-2 rounded-md"
              onClick={handleDelete}
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalDelete;
