import { Link, Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Main() {
  return (
    <div style={{ minWidth: 375, maxWidth: 1500 }} className="mx-auto">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Main;
