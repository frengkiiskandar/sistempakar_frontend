import { useEffect, useRef, useState } from "react";
import axios from "axios";
import ProgressBar from "../../components/ui/progressBar";

// icons
import {
  FaAppleAlt,
  FaLeaf,
  FaStethoscope,
  FaTree,
  FaPrint,
} from "react-icons/fa";
import { MdNavigateNext } from "react-icons/md";
import { FaExclamation } from "react-icons/fa6";
import { GiTreeRoots } from "react-icons/gi";
import { FiLayers } from "react-icons/fi";
import { IoFlask } from "react-icons/io5";
import { GoShieldCheck } from "react-icons/go";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const KEYAKINAN_VALUE = {
  mungkin: 0.4,
  cukupyakin: 0.6,
  yakin: 0.8,
  pasti: 1,
};

const Diagnosa = () => {
  const [isActive, setIsActive] = useState("semua");
  const [dataGejala, setDataGejala] = useState([]);
  const [selectedGejala, setSelectedGejala] = useState([]);
  const [keyakinan, setKeyakinan] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [hasilDiagnosis, setHasilDiagnosis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // ✅ FIX #1: Pisahkan toggle gejala dari event keyakinan
  const toggleGejala = (id) => {
    setSelectedGejala((prev) => {
      const sudahAda = prev.includes(id);

      if (sudahAda) {
        // Hapus keyakinan saat gejala di-uncheck
        setKeyakinan((key) => {
          const copy = { ...key };
          delete copy[id];
          return copy;
        });
        return prev.filter((item) => item !== id);
      } else {
        // Default keyakinan saat pertama dipilih
        setKeyakinan((key) => ({ ...key, [id]: "cukupyakin" }));
        return [...prev, id];
      }
    });
  };

  // ✅ FIX #2: Handler keyakinan tidak perlu stopPropagation lagi
  // karena card sudah dipisah dari elemen keyakinan menggunakan div, bukan label
  const pilihTingkatKeyakinan = (id, level) => {
    setKeyakinan((prev) => ({ ...prev, [id]: level }));
  };

  useEffect(() => {
    const getGejala = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/gejala`);
        setDataGejala(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getGejala();
  }, []);

  // print dokumen
  const printRef = useRef();
  const reportPrintRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: reportPrintRef,
    documentTitle: hasilDiagnosis?.hasil?.penyakit
      ? `Laporan-Diagnosis-${hasilDiagnosis.hasil.penyakit}`
      : "Laporan-Diagnosis",
    pageStyle: `
    @page {
      size: A4 portrait;
      margin: 15mm;
    }

    @media print {
      body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }
  `,
  });

  // ✅ FIX #3: handleProses dengan validasi + loading state
  const handleProses = async () => {
    if (selectedGejala.length === 0) {
      alert("Silakan pilih minimal satu gejala terlebih dahulu.");
      return;
    }

    const gejalaPayload = selectedGejala.map((id) => ({
      id: id,
      cf_user: KEYAKINAN_VALUE[keyakinan[id]] ?? 0.6,
    }));

    const payload = { gejala: gejalaPayload };
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/diagnosa`,
        payload,
      );

      setHasilDiagnosis(res.data);
      console.log("hasil diagnosa", res.data);
      setShowModal(true);
    } catch (err) {
      console.error("Gagal memproses diagnosis:", err);
      alert("Terjadi kesalahan saat memproses diagnosis. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-[#f6f8f3] text-gray-600">
        <div className="w-full px-[20%] py-10">
          {/* Breadcrumb */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3 text-green-800">
              <Link to={"/"}> Beranda </Link>
              <MdNavigateNext size={20} />
              <p className="text-gray-600">Diagnosis</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-green-800 text-white">
                <FaStethoscope size={20} />
              </div>
              <p className=" font-bold text-3xl text-black">Diagnosis</p>
            </div>

            <p>
              Pilih gejala yang anda amati untuk mendapatkan diagnosis penyakit
              atau hama pada tanaman kelengkeng anda.
            </p>
          </div>

          {/* Step */}
          <div className="flex flex-col gap-5 py-5">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2 px-4 py-1 bg-green-800 text-white rounded-full font-semibold">
                <p className="bg-green-700 rounded-full w-5 h-5 flex items-center justify-center">
                  1
                </p>
                <p>Pilih Gejala</p>
              </div>
              <MdNavigateNext size={20} />
              <div className="flex items-center gap-2 px-4 py-1 bg-[#dce3d1] text-gray-600 rounded-full font-semibold">
                <p className="w-5 h-5 flex items-center justify-center">2</p>
                <p>Hasil Diagnosis</p>
              </div>
            </div>

            {/* Cara Pengisian */}
            <div className="p-5 flex justify-start items-start gap-3 w-full bg-primary-100 border-[1px] border-primary-200 rounded-md">
              <div className="p-1 rounded-full border border-primary-500 w-fit">
                <FaExclamation size={10} />
              </div>
              <div>
                <p className="font-medium text-black">Cara Pengisian</p>
                <p>
                  Klik pada kartu gejala untuk memilihnya, lalu tentukan tingkat
                  keyakinan Anda. Semakin banyak gejala yang akurat, semakin
                  presisi hasil diagnosisnya.
                </p>
              </div>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-3 p-1 bg-primary-100 rounded-lg">
              {[
                { key: "semua", label: "Semua", icon: <FiLayers /> },
                { key: "daun", label: "Daun", icon: <FaLeaf /> },
                { key: "batang", label: "Batang", icon: <FaTree /> },
                { key: "buah", label: "Buah", icon: <FaAppleAlt /> },
                { key: "akar", label: "Akar", icon: <GiTreeRoots /> },
              ].map((btn) => (
                <button
                  key={btn.key}
                  onClick={() => setIsActive(btn.key)}
                  className={`text-gray-900 p-2 text-sm font-semibold rounded-lg flex items-center gap-1 ${
                    isActive === btn.key ? "bg-gray-100 shadow-md" : ""
                  }`}
                >
                  {btn.icon} {btn.label}
                </button>
              ))}
            </div>

            {/* Daftar Gejala */}
            <div className="flex flex-wrap gap-5 w-full">
              {dataGejala &&
                dataGejala
                  .filter((item) => {
                    if (isActive === "semua") return true;
                    return item.kategori.toLowerCase() === isActive;
                  })
                  .map((item, index) => {
                    const isSelected = selectedGejala.includes(item.id);
                    return (
                      // ✅ FIX: Ganti <label> → <div> agar tidak ada native label-input binding
                      // yang menyebabkan klik di dalam card (termasuk tombol keyakinan) memicu toggle
                      <div
                        key={item.id}
                        onClick={() => toggleGejala(item.id)}
                        className={`w-[calc(50%-10px)] border-[3px] border-primary-300 hover:border-primary-500 rounded-md p-5 cursor-pointer flex flex-col gap-3 ${
                          isSelected ? "bg-primary-100" : ""
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {/* ✅ FIX: Input hanya sebagai visual, onClick di parent div yang handle toggle */}
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {}} // controlled, logic di onClick parent
                            className="appearance-none w-5 h-5 border-2 border-gray-400 rounded-full checked:bg-primary-500 checked:border-primary-500 cursor-pointer flex-shrink-0 mt-1"
                          />
                          <div className="flex flex-col gap-2">
                            <p className="flex items-center gap-2">
                              G0{index + 1}
                              <span className="px-2 py-1 bg-purple-200 text-purple-900 rounded-full text-sm">
                                {item.kategori}
                              </span>
                            </p>
                            <h2>{item.nama_gejala}</h2>
                          </div>
                        </div>

                        {/* Keyakinan — stopPropagation agar klik di sini tidak toggle card */}
                        {isSelected && (
                          <div
                            className="py-2 border-t border-gray-500"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <p className="uppercase font-medium text-sm mb-2">
                              Tingkat Keyakinan
                            </p>
                            <div className="flex justify-between gap-2">
                              {[
                                {
                                  key: "mungkin",
                                  label: "Mungkin",
                                  nilai: "0.4",
                                },
                                {
                                  key: "cukupyakin",
                                  label: "Cukup Yakin",
                                  nilai: "0.6",
                                },
                                { key: "yakin", label: "Yakin", nilai: "0.8" },
                                { key: "pasti", label: "Pasti", nilai: "1.0" },
                              ].map((opt) => {
                                const isChosen = keyakinan[item.id] === opt.key;
                                return (
                                  <button
                                    key={opt.key}
                                    type="button"
                                    onClick={() =>
                                      pilihTingkatKeyakinan(item.id, opt.key)
                                    }
                                    className={`w-full text-sm font-medium p-2 rounded-md border border-primary-500 cursor-pointer transition-colors duration-150 ${
                                      isChosen
                                        ? "bg-green-900 text-white border-green-900"
                                        : "bg-white text-gray-700 hover:bg-primary-50"
                                    }`}
                                  >
                                    <span className="block">{opt.label}</span>
                                    <span className="block text-xs opacity-75">
                                      ({opt.nilai})
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
            </div>

            {/* Counter gejala terpilih */}
            {selectedGejala.length > 0 && (
              <p className="text-sm text-green-800 font-medium">
                {selectedGejala.length} gejala dipilih
              </p>
            )}

            {/* Tombol Proses */}
            <button
              className={`mt-5 px-5 py-2 rounded-md font-semibold flex justify-center items-center gap-3 text-lg transition-opacity ${
                selectedGejala.length === 0 || isLoading
                  ? "bg-green-800/50 text-white cursor-not-allowed"
                  : "bg-green-800 text-white hover:bg-green-700"
              }`}
              onClick={handleProses}
              disabled={selectedGejala.length === 0 || isLoading}
            >
              <IoFlask size={20} />
              {isLoading ? "Memproses..." : "Proses Diagnosis"}
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0  bg-black/50 flex justify-center items-center z-50">
          <div className="w-[60%] shadow-lg border-[3px] bg-white border-primary-700 rounded-2xl overflow-hidden">
            <div ref={printRef}>
              <div className="bg-primary-100 p-5">
                <div className="flex justify-between items-center gap-10 mb-3">
                  <h2 className=" text-lg  text-orange-600 font-medium ">
                    #1 Teratas
                  </h2>
                  <button onClick={handlePrint} className="bg-green-700 rounded-full px-4 py-1 text-white hover:bg-green-800 transition-colors duration-200 ease-linear">
                    <FaPrint />
                  </button>
                </div>

                <div className="flex justify-between items-start">
                  <div className="">
                    <p className="font-bold text-3xl ">
                      {hasilDiagnosis.hasil.penyakit}{" "}
                    </p>
                  </div>

                  <div className="p-3 bg-orange-100 rounded-2xl border border-orange-300 text-orange-600 flex flex-col justify-center items-center gap-0 text-3xl font-bold ">
                    {(hasilDiagnosis.hasil.nilai_cf * 100).toFixed(1)} %
                    <span className="text-sm font-normal">Terindikasi</span>
                  </div>
                </div>
                <div className="">
                  <ProgressBar
                    percent={Math.ceil(hasilDiagnosis.hasil.nilai_cf * 100)}
                  />
                </div>
                <p className="">
                  Niali CF:{" "}
                  <span className="font-semibold">
                    {hasilDiagnosis.hasil.nilai_cf}{" "}
                  </span>
                </p>
              </div>

              {/* section deskripsi */}
              <div className="p-5 bg-white flex justify-start items-start gap-3">
                <div className="p-1 rounded-full border-4 border-primary-600">
                  <FaExclamation size={10} />
                </div>
                <div>
                  <p className="font-semibold "> Deskripsi</p>
                  <span className="text-gray-600">
                    {hasilDiagnosis.hasil.deskripsi}
                  </span>
                </div>
              </div>

              {/* section pencegahan */}
              <div className="p-5 bg-white flex justify-start items-start gap-3">
                <GoShieldCheck size={25} />
                <div>
                  <p className="font-semibold "> Pencegahan</p>
                  <span className="text-gray-600">
                    {hasilDiagnosis.hasil.pencegahan}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-5 flex justify-between items-center gap-5">
              <button
                onClick={() => setShowModal(false)}
                className=" py-2 bg-red-800 hover:bg-red-900 transition-colors duration-150 ease-linear text-white rounded-md w-full"
              >
                Tutup
              </button>
              <button
                className="w-full bg-green-800 hover:bg-green-900 text-white transition-colors duration-150 ease-linear rounded-md py-2"
                onClick={() => window.location.reload()}
              >
                Mulai Ulang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TEMPLATE KHUSUS PRINT */}
      <div
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
        }}
      >
        <div ref={reportPrintRef}>
          <div className="bg-white text-black p-10 min-h-[1123px]">
            {/* Header */}
            <div className="border-b-4 border-green-700 pb-5 mb-8">
              <h1 className="text-3xl font-bold text-green-800">
                SISTEM PAKAR DIAGNOSIS TANAMAN KELENGKENG
              </h1>

              <p className="text-gray-600 mt-2">
                Laporan Hasil Diagnosis Penyakit dan Hama
              </p>
            </div>

            {/* Info */}
            <div className="grid grid-cols-2 gap-5 mb-8">
              <div>
                <p>
                  <span className="font-semibold">Tanggal :</span>{" "}
                  {new Date().toLocaleDateString("id-ID")}
                </p>

                <p>
                  <span className="font-semibold">Waktu :</span>{" "}
                  {new Date().toLocaleTimeString("id-ID")}
                </p>
              </div>

              <div className="text-right">
                <p>
                  <span className="font-semibold">Nomor Diagnosis :</span>
                </p>

                <p>DX-{Date.now()}</p>
              </div>
            </div>

            {/* Ringkasan */}
            <div className="bg-green-50 border border-green-300 rounded-xl p-6 mb-8">
              <h2 className="text-xl font-bold text-green-800 mb-3">
                Hasil Diagnosis
              </h2>

              <p className="text-3xl font-bold">
                {hasilDiagnosis?.hasil?.penyakit}
              </p>

              <div className="mt-5">
                <div className="w-full h-5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-700"
                    style={{
                      width: `${(hasilDiagnosis?.hasil?.nilai_cf || 0) * 100}%`,
                    }}
                  />
                </div>

                <p className="mt-2 font-semibold text-lg">
                  {((hasilDiagnosis?.hasil?.nilai_cf || 0) * 100).toFixed(2)}%
                </p>
              </div>
            </div>

            {/* Gejala */}
            <div className="mb-8">
              <h2 className="text-lg font-bold border-b pb-2 mb-3">
                Gejala Yang Dipilih
              </h2>

              <table className="w-full border-collapse border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-3">No</th>
                    <th className="border p-3">Gejala</th>
                    <th className="border p-3">Keyakinan</th>
                  </tr>
                </thead>

                <tbody>
                  {dataGejala
                    .filter((g) => selectedGejala.includes(g.id))
                    .map((g, index) => (
                      <tr key={g.id}>
                        <td className="border p-3 text-center">{index + 1}</td>

                        <td className="border p-3">{g.nama_gejala}</td>

                        <td className="border p-3 capitalize">
                          {keyakinan[g.id]}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Deskripsi */}
            <div className="mb-8">
              <h2 className="text-lg font-bold border-b pb-2 mb-3">
                Deskripsi Penyakit
              </h2>

              <p className="leading-8 text-justify">
                {hasilDiagnosis?.hasil?.deskripsi}
              </p>
            </div>

            {/* Pencegahan */}
            <div className="mb-8">
              <h2 className="text-lg font-bold border-b pb-2 mb-3">
                Pencegahan dan Penanganan
              </h2>

              <p className="leading-8 text-justify">
                {hasilDiagnosis?.hasil?.pencegahan}
              </p>
            </div>

            {/* Kesimpulan */}
            <div className="mb-10">
              <h2 className="text-lg font-bold border-b pb-2 mb-3">
                Kesimpulan
              </h2>

              <p className="leading-8 text-justify">
                Berdasarkan gejala yang dipilih pengguna dan perhitungan metode
                Certainty Factor (CF), tanaman kelengkeng terindikasi mengalami
                penyakit atau hama
                <span className="font-semibold">
                  {" "}
                  {hasilDiagnosis?.hasil?.penyakit}
                </span>
                dengan tingkat keyakinan sebesar
                <span className="font-semibold">
                  {" "}
                  {((hasilDiagnosis?.hasil?.nilai_cf || 0) * 100).toFixed(2)}%
                </span>
                .
              </p>
            </div>

            {/* Tanda tangan */}
            <div className="mt-24 flex justify-end">
              <div className="text-center">
                <p>{new Date().toLocaleDateString("id-ID")}</p>

                <div className="h-24" />

                <p className="font-semibold">Sistem Pakar Kelengkeng</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Diagnosa;
