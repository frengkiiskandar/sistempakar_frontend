import {
  FaStethoscope,
  FaBookmark,
  FaBug,
  FaLeaf,
  FaBook,
  FaListUl,
} from "react-icons/fa";
import { IoFlask } from "react-icons/io5";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineNavigateNext } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [penyakit, setPenyakit] = useState(0);
  const [gejala, setGejala] = useState(0);

  useEffect(() => {
    const getPenyakit = async () => {
      try {
        const data = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/penyakit`,
        );
        setPenyakit(data.data.length);
        // console.log(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getGejala = async () => {
      try {
        const data = await axios.get(`${import.meta.env.VITE_BASE_URL}/gejala`);
        setGejala(data.data.length);
        // console.log(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getGejala();
    getPenyakit();
  }, []);

  return (
    <>
      <div className=" text-gray-600">
        <div className="px-[10%] h-screen bg-gradient-to-br from-primary-200 to-orange-50">
          <div className="px-[20%] flex flex-col justify-center items-start gap-5 w-full h-full">
            <p className="px-2 py-1 text-xs font-medium bg-primary-200 text-green-800  border border-primary-300 rounded-md ">
              Sistem Pakar Pertanian
            </p>

            <h2 className="font-extrabold text-black text-6xl">
              Diagnosis Penyakit{" "}
              <span className="text-green-800">Tanaman Kelengkeng</span> Lebih
              Cepat dan Akurat
            </h2>
            <p className="text-gray-500 text-lg">
              SisPakar ( Sistem Pakar ) ini menggunakan metode Certainty Factor
              ( CF ) untuk membantu petani mendiagnosis penyakit, hama , dan
              masalah nutrisi pada tanaman kelengkeng secara cepat dan akurat
            </p>

            <div className="flex justify-start items-center gap-5">
              <button className="px-5 py-2 bg-green-800 hover:bg-green-900 transition-colors duration-150 ease-linear rounded-md text-white font-semibold flex justify-center items-center gap-3">
                <FaStethoscope />
                Mulai Diagnosa
              </button>
              <button className="px-5 py-2 border border-green-800 rounded-md text-black font-semibold flex justify-center items-center gap-3">
                <FaBookmark />
                Lihat Basis Pengetahuan
              </button>
            </div>
          </div>
        </div>

        {/* section start */}
        <div className="p-10 flex justify-center items-center gap-32 border-y border-green-100">
          <div className="flex flex-col justify-center items-center gap-3">
            <div className="p-3 rounded-md bg-green-50">
              <FaBug size={25} className="text-green-800" />
            </div>
            <p className="font-bold text-4xl text-black">{penyakit}</p>
            <p>Jenis Penyakit & Hama</p>
          </div>

          <div className="flex flex-col justify-center items-center gap-3">
            <div className="p-3 rounded-md bg-green-50">
              <FaLeaf size={25} className="text-green-800" />
            </div>
            <p className="font-bold text-4xl text-black">{gejala} </p>
            <p>Gejala Terindikasi</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <div className="p-3 rounded-md bg-green-50">
              <FaBook size={25} className="text-green-800" />
            </div>
            <p className="font-bold text-4xl text-black">32</p>
            <p>Aturan Produksi</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <div className="p-3 rounded-md bg-green-50">
              <IoFlask size={25} className="text-green-800" />
            </div>
            <p className="font-bold text-4xl text-black">CF</p>
            <p>Meteode Certainty Factor</p>
          </div>
        </div>
        {/* section end */}

        {/* section 3 langkah mudah */}
        <div className="py-10 bg-gray-100 flex flex-col justify-center items-center gap-5">
          <p className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800  border border-gray-500 rounded-md ">
            Cara Kerja
          </p>
          <h2 className="text-black font-bold text-4xl">Tiga Langkah Mudah</h2>
          <p>
            Proses diagnosis yang sederhana namun menggunakan algoritma yang
            telah teruji secara ilmiah
          </p>

          <div className="py-5 flex justify-center items-center gap-10">
            <div className=" flex flex-col justify-center items-center gap-5">
              <div className="bg-green-800 rounded-md p-7">
                <FaListUl size={50} color="#ffffff" />
              </div>
              <p className="text-black font-semibold text-2xl">Pilih Gejala</p>
              <p className="w-[25rem] text-center">
                Amati kondisi tanaman kelengkeng anda dan tandai gejala-gejala
                yang terlihat pada daun, batang, buah atau akar.
              </p>
            </div>

            <div className=" flex flex-col justify-center items-center gap-5">
              <div className="bg-green-800 rounded-md p-7">
                <IoFlask size={50} color="#ffffff" />
              </div>
              <p className="text-black font-semibold text-2xl">
                Tentukan Keyakinan
              </p>
              <p className="w-[25rem] text-center">
                Untuk setiap gejala yang dipilih, tentukan tingkat keyakinan
                anda mulai dari yang "Mugkin" hingga "Pasti" untuk hasil yang
                lebih akurat.
              </p>
            </div>

            <div className=" flex flex-col justify-center items-center gap-5">
              <div className="bg-green-800 rounded-md p-7">
                <IoMdCheckmarkCircleOutline size={50} color="#ffffff" />
              </div>
              <p className="text-black font-semibold text-2xl">
                Dapatkan Hasil
              </p>
              <p className="w-[25rem] text-center">
                Sistem akan menghitung nilai Certainty Factor dan menampilkan
                hasil diagnosis beserta rekomendasi penanganan yang tepat.
              </p>
            </div>
          </div>
          <button className="bg-green-800 text-white font-medium px-5 py-2 rounded-md flex justify-center items-center gap-1 hover:bg-green-700 transition-colors duration-200 ease-linear">
            Coba Sekarang
            <MdOutlineNavigateNext size={25} />
          </button>
        </div>
        {/* section end */}

        {/* section mengapa sispakar */}
        <div className="py-20 px-[10%] bg-gradient-to-br from-primary-100 to-white flex flex-col justify-center items-center gap-5">
          <h2 className="text-black font-bold text-4xl">Mengapa SisPakar ?</h2>
          <p className="w-[40rem] text-center">
            Dirancang Khusus untuk membantu petani dan penyuluh pertanian
            mendapatkan diagnosis penyakit yang tepat
          </p>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            <div className="shadow-md bg-white rounded-md p-5 w-[25rem] min-h-[15rem] flex flex-col justify-start items-start gap-3 ">
              <div className="p-2 rounded-md bg-green-100">
                <IoFlask size={20} />
              </div>
              <h3 className="text-black font-bold text-2xl">
                Diagnosis Akurat
              </h3>
              <p className="text-sm">
                Menggunakan metode certianty factor ( CF ) yang diakui secara
                ilmiah untuk memberikan hasil diagnosis yang dapat di percaya
                berdasarkan gejala yang anda amati
              </p>
            </div>
            <div className="shadow-md bg-white rounded-md p-5 w-[25rem] min-h-[15rem] flex flex-col justify-start items-start gap-3 ">
              <div className="p-2 rounded-md bg-green-100">
                <IoFlask size={20} />
              </div>
              <h3 className="text-black font-bold text-2xl">
                Basis Pengetahuan Lengkap
              </h3>
              <p className="text-sm">
                Mencakup 8 jenis penyakit, hama, dan defisiensi nutrisi yang
                umum menyerang tanaman kelengkeng dengan 18 gejala dan 32 aturan
                produksi
              </p>
            </div>
            <div className="shadow-md bg-white rounded-md p-5 w-[25rem] min-h-[15rem] flex flex-col justify-start items-start gap-3 ">
              <div className="p-2 rounded-md bg-green-100">
                <IoFlask size={20} />
              </div>
              <h3 className="text-black font-bold text-2xl">
                Rekomendasi Penanganan
              </h3>
              <p className="text-sm">
                Setiap hasil diagnosis disertai dengan solusi penanganan dan
                langkah-langkah pencegahan yang praktis dan mudah diterapkan
                oleh petani
              </p>
            </div>
            <div className="shadow-md bg-white rounded-md p-5 w-[25rem] min-h-[15rem] flex flex-col justify-start items-start gap-3 ">
              <div className="p-2 rounded-md bg-green-100">
                <IoFlask size={20} />
              </div>
              <h3 className="text-black font-bold text-2xl">
                Cepat & Mudah Digunakan
              </h3>
              <p className="text-sm">
                Antarmuka yang intuitif memungkinkan petani maupun penyuluh
                pertanian untuk mendapatkan hasil diagnosis hanya dalam hitungan
                menit
              </p>
            </div>
            <div className="shadow-md bg-white rounded-md p-5 w-[25rem] min-h-[15rem] flex flex-col justify-start items-start gap-3 ">
              <div className="p-2 rounded-md bg-green-100">
                <IoFlask size={20} />
              </div>
              <h3 className="text-black font-bold text-2xl">
                Tingkat Kepercayaan
              </h3>
              <p className="text-sm">
                Hasil diagnosis dilengkapi dengan nilai persentase Certainty
                Factor sehingga Anda dapat mengetahui seberapa kuat indikasi
                suatu penyakit
              </p>
            </div>
            <div className="shadow-md bg-white rounded-md p-5 w-[25rem] min-h-[15rem] flex flex-col justify-start items-start gap-3 ">
              <div className="p-2 rounded-md bg-green-100">
                <IoFlask size={20} />
              </div>
              <h3 className="text-black font-bold text-2xl">
                Khusus Kelengkeng
              </h3>
              <p className="text-sm">
                Dirancang khusus untuk tanaman kelengkeng (Dimocarpus longan)
                dengan pengetahuan dari pakar pertanian yang berpengalaman
              </p>
            </div>
          </div>
        </div>
        {/* section end */}

        {/* section start */}
          <div className="bg-green-900 py-20 flex flex-col justify-center items-center gap-5 text-white text-center">
            <div>
              <FaLeaf size={60}/>
            </div>

            <h2 className="font-bold text-4xl">Siap Mendiagnosis Tanaman Anda ?</h2>
            <p className="w-[30rem] font-medium text-gray-300 ">Mulai diagosis dan dapatkan rekomendasi penanganan yang tepa untuk tanaman kelengkeng anda secara gratis</p>
            <button className="flex justify-between items-center gap-5 px-5 py-2 rounded-md bg-yellow-600 text-black font-semibold hover:bg-yellow-700">
              <FaStethoscope size={15}/>
              Mulai diagnosis Gratis
              <MdOutlineNavigateNext size={25}/>
            </button>
          </div>
        {/* section end */}
      </div>
    </>
  );
};

export default Home;
