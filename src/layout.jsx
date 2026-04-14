import { Outlet } from "react-router-dom";
import Header from "./components/ui/header";
import Footer from "./components/ui/footer";

export default function Layout() {
  return (
    <div>
      <div className="w-full ">
        <Header />
      </div>

      <main className="">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
