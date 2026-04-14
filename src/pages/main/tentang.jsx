// icons
import { FaCircleExclamation } from "react-icons/fa6";
import { FaBook, FaShareAlt, FaChartBar } from "react-icons/fa";
import { IoFlask } from "react-icons/io5";
import { MdNavigateNext, MdCalculate,MdOutlineNavigateNext } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

import { NavLink } from "react-router-dom";

const Tentang = () => {
  return (
    <>
      <div className="bg-[#f6f8f3] text-gray-600">
        <div className="w-full px-[20%] py-10">
          {/* Breadcrumb */}
          <div className="flex flex-col gap-5">
            {/* 1 */}
            <div className="flex items-center gap-3 text-green-800">
              <NavLink to={"/"}> Beranda </NavLink>
              <MdNavigateNext size={20} />
              <p className="text-gray-600">Tentang Metode</p>
            </div>
            {/* 2 */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-green-800 text-white">
                <FaCircleExclamation size={20} />
              </div>
              <p className=" font-bold text-3xl text-black">
                Tentang Metode CF
              </p>
            </div>
            {/* 3 */}
            <p className="w-[50rem] ">
              Penjelasan mengeneai metode{" "}
              <span className="italic">Certainty Factor</span> yang digunakan
              dalam sistem pakar SisPakar Kelengkeng berserta cara kerja dan
              basis pengetahuannya.
            </p>
            {/* 4 */}
            <div className="text-black font-bold text-2xl flex items-center gap-3">
              <span className="text-green-800">
                {" "}
                <IoFlask />
              </span>
              <h2>Apa itu Certainty Factor ?</h2>
            </div>
            {/* 5 */}
            <div className="p-5 border shadow-sm rounded-xl bg-white">
              <p>
                <span className="font-semibold">Certainty Factor</span> adalah
                metode yang dikembangkan oleh Shortliffe dan Buchanan pada tahun
                1975 dalam sistem pakar MYCIN untuk menangani ketidakpastian
                dalam proses diagnosis medis. Metode ini kemudian diadaptasi
                secara luas untuk berbagai sistem pakar, termasuk di bidang
                pertanian
              </p>
              <p className="mt-2">
                CF mengukur seberapa yakin seorang pakar terhadap suatu
                hipotesis (H) berdasarkan bukti (E) yang diberikan. Nilai CF
                berkisar antara -1 hingga +1, di mana nilai positif menunjukkan
                kepercayaan dan nilai negatif menunjukkan ketidakpercayaan
                terhadap hipotesis
              </p>
              <div className="flex justify-center items-center gap-3 mt-5">
                <div className="p-4 flex-1 flex flex-col justify-start items-start gap-2 border border-primary-400 rounded-xl bg-primary-50">
                  <p>MB ( Measure of Belief )</p>
                  <p>
                    Ukuran kepercayaan bahwa hipotesis benar berdasarkan bukti
                  </p>
                  <p className="px-3 py-1 rounded-xl text-black bg-primary-200">
                    0 - 1
                  </p>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-start items-start gap-2 border border-primary-400 rounded-xl bg-primary-50">
                  <p>MD ( Measure of Disbelief )</p>
                  <p>
                    Ukuran ketidakpercayaan bahwa hipotesis benar berdasarkan
                    bukti
                  </p>
                  <p className="px-3 py-1 rounded-xl text-black bg-primary-200">
                    0 - 1
                  </p>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-start items-start gap-2 border border-primary-400 rounded-xl bg-primary-50">
                  <p>CF ( Certainty Factor )</p>
                  <p>
                    Selisih antara MB dan MD yang mencerminkan kepastian bersih
                  </p>
                  <p className="px-3 py-1 rounded-xl text-black bg-primary-200">
                    -1 - 1
                  </p>
                </div>
              </div>
            </div>
            {/* 6 */}
            <div>
              <div className="text-black font-bold text-2xl flex items-center gap-3">
                <span className="text-green-800">
                  {" "}
                  <MdCalculate size={30} />
                </span>
                <h2>Cara Kerja Perhitungan CF</h2>
              </div>
              {/* langkah 1 */}
              <div className="flex items-start gap-3 my-5 px-5 py-10 bg-white rounded-xl border border-primary-200 shadow-sm text-black">
                <div className="text-green-900">
                  <FaBook size={30} />
                </div>
                <div className="w-full flex flex-col justify-start items-start gap-3">
                  <div className="flex gap-3">
                    <p className="px-2 py-1 rounded-md bg-primary-200 border border-primary-300 text-xs">
                      Langkah 1
                    </p>
                    <span className="font-semibold">Nilai CF Pakar</span>
                  </div>
                  <p className="bg-primary-100 px-3 py-1 rounded-md w-full font-semibold">
                    CF = MB - MD
                  </p>
                  <p className="text-sm text-gray-500">
                    Setiap aturan dalam basis pengetetahuan memiliki nilai
                    Measure of Belief (MB) dan Measure of Disbelief ( MD ) uang
                    ditetapkan oleh ahli pakar. Selisih dari kedua nilai itu
                    menghasilkan nilai CF Pakar.
                  </p>
                  <p className="px-2 py-1 bg-orange-50 rounded-md w-full border border-orange-200 text-sm font-medium">
                    Contoh : Bercak Daun = MB : 0.8, MD : 0.2, maka = 0.8 - 0.2
                    = CF Pakar 0.6
                  </p>
                </div>
              </div>
              {/* langkah 2 */}
              <div className="flex items-start gap-3 my-5 px-5 py-10 bg-white rounded-xl border border-primary-200 shadow-sm text-black">
                <div className="text-green-900">
                  <MdCalculate size={30} />
                </div>
                <div className="w-full flex flex-col justify-start items-start gap-3">
                  <div className="flex gap-3">
                    <p className="px-2 py-1 rounded-md bg-primary-200 border border-primary-300 text-xs">
                      Langkah 2
                    </p>
                    <span className="font-semibold">
                      CF Berdasarkan Bukti Pengguna
                    </span>
                  </div>
                  <p className="bg-primary-100 px-3 py-1 rounded-md w-full font-semibold">
                    CF User = CF Pakar x CF User
                  </p>
                  <p className="text-sm text-gray-500">
                    Nilai CF pakar dikalikan dengan tingkat keyakinan yang
                    dimasukkan pengguna (0.4 – 1.0). Ini mencerminkan kepastian
                    pengguna terhadap gejala yang diamati.
                  </p>
                  <p className="px-2 py-1 bg-orange-50 rounded-md w-full border border-orange-200 text-sm font-medium">
                    CF pakar = 0.7, CF user = 0.8 → CF evidence = 0.56
                  </p>
                </div>
              </div>
              {/* langkah 3 */}
              <div className="flex items-start gap-3 my-5 px-5 py-10 bg-white rounded-xl border border-primary-200 shadow-sm text-black">
                <div className="text-green-900">
                  <FaShareAlt size={30} />
                </div>
                <div className="w-full flex flex-col justify-start items-start gap-3">
                  <div className="flex gap-3">
                    <p className="px-2 py-1 rounded-md bg-primary-200 border border-primary-300 text-xs">
                      Langkah 3
                    </p>
                    <span className="font-semibold">Kombinasi Nilai CF</span>
                  </div>
                  <p className="bg-primary-100 px-3 py-1 rounded-md w-full font-semibold">
                    CF₁ + CF₂ × (1 − CF₁)
                  </p>
                  <p className="text-sm text-gray-500">
                    Ketika ada beberapa gejala yang cocok, nilai CF
                    dikombinasikan secara berurutan menggunakan rumus kombinasi.
                    Ada tiga variasi rumus tergantung tanda nilai CF.
                  </p>
                  <p className="px-2 py-1 bg-orange-50 rounded-md w-full border border-orange-200 text-sm font-medium">
                    CF₁ = 0.56, CF₂ = 0.48 → CF kombinasi = 0.56 + 0.48 × (1 −
                    0.56) = 0.77
                  </p>
                </div>
              </div>
              {/* langkah 4 */}
              <div className="flex items-start gap-3 my-5 px-5 py-10 bg-white rounded-xl border border-primary-200 shadow-sm text-black">
                <div className="text-green-900">
                  <FaChartBar size={30} />
                </div>
                <div className="w-full flex flex-col justify-start items-start gap-3">
                  <div className="flex gap-3">
                    <p className="px-2 py-1 rounded-md bg-primary-200 border border-primary-300 text-xs">
                      Langkah 4
                    </p>
                    <span className="font-semibold">Interpretasi Hasil</span>
                  </div>
                  <p className="bg-primary-100 px-3 py-1 rounded-md w-full font-semibold">
                    CF₁ + CF₂ × (1 − CF₁)
                  </p>
                  <p className="text-sm text-gray-500">
                    Ketika ada beberapa gejala yang cocok, nilai CF
                    dikombinasikan secara berurutan menggunakan rumus kombinasi.
                    Ada tiga variasi rumus tergantung tanda nilai CF.
                  </p>
                  <p className="px-2 py-1 bg-orange-50 rounded-md w-full border border-orange-200 text-sm font-medium">
                    CF₁ = 0.56, CF₂ = 0.48 → CF kombinasi = 0.56 + 0.48 × (1 −
                    0.56) = 0.77
                  </p>
                </div>
              </div>
            </div>
            {/* 7 */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md text-green-800">
                <FaShareAlt size={30} />
              </div>
              <p className=" font-bold text-3xl text-black">
                Rumus Kombinasi CF
              </p>
            </div>
            <p>
              Ketika terdapat lebih dari satu bukti gejala yang mendukung
              hipotesis, nilia-nilai CF akan di kombinasikan secarra berurutan
              menggunakan rumus berikut :{" "}
            </p>
            <div className="p-5 bg-green-50 border border-green-100 text-green-800 font-semibold">
              CF = CF₁ + CF₂ × (1 − CF₁)
            </div>
            <div className="p-4 border shadow-sm rounded-xl w-full font-medium text-black bg-gray-100">
              <p className="mb-3 font-semibold">
                Level Keyakinan Pengguna (CF User)
              </p>

              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="p-2 border">Keterangan</th>
                    <th className="p-2 border">Nilai CF</th>
                    <th className="p-2 border">Deskripsi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border">Tidak</td>
                    <td className="p-2 border text-green-600 font-semibold">
                      0.0
                    </td>
                    <td className="p-2 border text-gray-500 text-sm font-normal">
                      Gejala tidak ada atau tidak terlihat sama sekali
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border">Mungkin</td>
                    <td className="p-2 border text-green-600 font-semibold">
                      0.4
                    </td>
                    <td className="p-2 border text-gray-500 text-sm font-normal">
                      Gejala mungkin ada, masih ragu-ragu
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border">Cukup Yakin</td>
                    <td className="p-2 border text-green-600 font-semibold">
                      0.6
                    </td>
                    <td className="p-2 border text-gray-500 text-sm font-normal">
                      Gejala cukup terlihat dengan jelas
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border">Yakin</td>
                    <td className="p-2 border text-green-600 font-semibold">
                      0.8
                    </td>
                    <td className="p-2 border text-gray-500 text-sm font-normal">
                      Gejala jelas terlihat dan dapat dikonfirmasi
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border">Pasti</td>
                    <td className="p-2 border text-green-600 font-semibold">
                      1.0
                    </td>
                    <td className="p-2 border text-gray-500 text-sm font-normal">
                      Gejala sudah pasti ada, sangat jelas
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 8 */}
            <div className="p-5 flex justify-start items-start gap-5 bg-yellow-50 border border-orange-200 rounded-2xl">
              <div className="text-orange-500">
                <IoMdCheckmarkCircleOutline size={25} />
              </div>
              <div className="flex flex-col justify-start items-start gap-2">
                <p className="font-medium text-orange-900">Catatan Penting</p>
                <p className="text-orange-700 text-sm">
                  Sistem pakar ini bersifat sebagai alat bantu diagnosis awal
                  dan referensi pengetahuan. Hasil yang diberikan bergantung
                  pada gejala dan tingkat keyakinan yang dimasukkan pengguna.
                  Untuk diagnosis dan penanganan yang lebih akurat dan tepat,
                  disarankan untuk selalu berkonsultasi dengan{" "}
                  <span className="font-semibold">penyuluh pertanian</span> atau{" "}
                  <span className="font-semibold">ahli pertanian</span>{" "}
                  setempat.
                </p>
              </div>
            </div>
            {/* last 9 */}
            <div className=" w-full flex justify-center items-center my-5">
              <NavLink
                to="/diagnosa"
                className={({ isActive }) =>
                  `px-5 py-2 text-white rounded-md flex justify-center items-end gap-3 font-semibold text-center bg-green-800 hover:bg-green-900 transition-colors duration-200 ease-linear w-fit`
                }
              >
                Coba Diagnosis Sekarang{" "}
                <MdOutlineNavigateNext size={20}/>
              </NavLink>
            </div>
            {/* end */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Tentang;
