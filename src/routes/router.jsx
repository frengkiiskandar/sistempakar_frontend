import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout";
import Home from "../pages/main/home";
import Diagnosa from "../pages/main/diagnosa";
import BasisPengetahuan from "../pages/main/basisPengetahuan";
import Login from "../pages/login/login";
import AdminLayout from "../pages/admin/adminLayout";
import AdminDashboard from "../pages/admin/adminDashboard";
import AdminPenyakit from "../pages/admin/adminPenyakit";
import ProtectedRoute from "../components/protectedRoute";
import AdminPenyakitRelasi from "../pages/admin/adminPenyakitRelasi";
import Tentang from "../pages/main/tentang";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/diagnosa",
        element: <Diagnosa />,
      },
      {
        path: "/basispengetahuan",
        element: <BasisPengetahuan />,
      },
      {
        path: "/tentang",
        element: <Tentang />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <AdminDashboard />,
      },
      {
        path: "penyakit",
        element: <AdminPenyakit />,
      },
      {
        path: "penyakitRelasi",
        element: <AdminPenyakitRelasi />,
      },
    ],
  },
]);

export default router;
