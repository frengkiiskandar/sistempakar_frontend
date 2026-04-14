import { useState } from "react";
import kelengkeng from "../../assets/kelengkeng.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

const Login = () => {
  const bgImageUrl = kelengkeng;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/login`,
        {
          email,
          password,
        },
      );
      console.log(response);
      Cookies.set('token')
      navigate("/admin", { replace: true });
    } catch (error) {
      setErr(error.response.data.msg);
      //   console.error(error.response.data.msg);
    }
  };

  return (
    <div
      className="w-screen h-screen bg-gray-800 relative flex flex-col md:flex-row"
      style={{
        backgroundImage: `url(${bgImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay gelap supaya teks dan form jelas */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Kiri - teks */}
      <div className="relative z-10 flex flex-col justify-center md:w-2/5 pl-32  text-white gap-6 ">
        <h1 className="text-6xl font-extrabold leading-tight ">
          SisPakar Tanaman <span className="text-primary-600">Kelengkeng</span>
        </h1>
        <p className="max-w-md text-gray-300 indent-10 italic">
          SisPakar merupakan sistem aplikasi berbasis web untuk mendiagnosa
          penyakit tanaman kelengkeng berdasarkan dari gejala gejala yang
          dimasukkan dan menggunakan metode dan nilai serta aturan yang telah
          teruji secara ilmiah dan berdasarkan dari ahli
        </p>
      </div>

      {/* Kanan - form glassmorphism */}
      <div className="relative z-10 md:w-3/5 flex items-center justify-center p-10">
        <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-xl shadow-lg p-8 max-w-md w-full text-gray-800 relative">
          {err && (
            <div className="absolute top-3 right-0 left-0 text-center text-red-600">
              {err}
            </div>
          )}

          <div className="py-5 text-white">
            <h2 className=" font-bold text-xl">Silahkan Login ke Akun Anda</h2>
            <p className="text-xs">Welcome back</p>
          </div>

          <form className="flex flex-col gap-5" onSubmit={handleLogin}>
            <div>
              <label className="text-white">Email</label>
              <input
                type="email"
                className="px-3 mt-2 py-2 w-full rounded-md bg-white bg-opacity-20 backdrop-blur-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-white">Password</label>
              <input
                type="password"
                className="px-3 py-2 mt-2 w-full rounded-md bg-white bg-opacity-20 backdrop-blur-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-between items-center text-sm text-gray-200">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-green-500" />
                Remember me
              </label>
              {/* <a href="#" className="text-green-400 hover:underline">
                Forgot Password?
              </a> */}
            </div>

            <button
              type="submit"
              className="my-4 bg-primary-600 hover:bg-primary-700 transition text-white font-medium py-2 rounded-md"
            >
              Login
            </button>
          </form>

          {/* <p className="mt-6 text-center text-gray-300">
            Don't have an account?{" "}
            <a href="#" className="text-green-400 hover:underline">
              Create one
            </a>
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
