import { Link, Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Main() {
  return (
    <div style={{ minWidth: 450, maxWidth: 1800 }} className="mx-auto">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Main;
