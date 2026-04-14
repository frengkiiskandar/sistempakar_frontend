import React from "react";
import toast from "react-hot-toast";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate()

  const logout = ()=>{
    toast.success('berhasil logout')
    setTimeout(() => {
      navigate('/')
    }, 1000);
  }

  return (
    <div className="flex min-h-screen bg-green-50">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-green-900 text-green-50 shadow-md fixed left-0 top-0 h-full flex flex-col border-r">
        {/* Logo / Header */}
        <div className="p-6 text-2xl font-bold text-green-600 border-b-2 border-green-600">
          SisPakar Admin
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-4 py-5">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/admin"
                end
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-md text-sm font-semibold 
                  ${
                    isActive
                      ? "bg-green-500 text-white"
                      : "text-white hover:bg-green-700"
                  }`
                }
              >
                Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/penyakit"
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-md text-sm font-semibold 
                  ${
                    isActive
                      ? "bg-green-500 text-white"
                      : "text-white hover:bg-green-700"
                  }`
                }
              >
                Data Penyakit
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/penyakitRelasi"
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-md text-sm font-semibold 
                  ${
                    isActive
                      ? "bg-green-500 text-white"
                      : "text-white hover:bg-green-700"
                  }`
                }
              >
                Data Gejala Penyakit
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/user"
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-md text-sm font-semibold 
                  ${
                    isActive
                      ? "bg-green-500 text-white"
                      : "text-white hover:bg-green-700"
                  }`
                }
              >
                User Management
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Footer / Logout */}
        <div className="p-4 border-t">
          <button className="w-full py-2 text-sm bg-gradient-to-b from-slate-600 to-slate-900 text-white rounded-md " onClick={logout}>
            Logout
          </button>
        </div>
      </aside>

      {/* ================= CONTENT (OUTLET) ================= */}
      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
