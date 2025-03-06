import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { UsersContext } from "../../contexts/UsersContext";
import { ThemeContext, themes } from "../../contexts/ThemeContext";
import { toast } from "react-toastify";
import { useCookies, CookiesProvider } from "react-cookie";
import userApi from "../../utils/userApi";
import errorApi from "../../utils/errorApi";

function Main() {
  const userData = useLoaderData();
  const navigate = useNavigate();
  const [user, setUser] = useState(userData.response);
  const [theme, setTheme] = useState("light");
  const [cookies, setCookie, removeCookie] = useCookies([]);

  const [searchParams] = useSearchParams();
  const code = searchParams.getAll("code");

  useEffect(() => {
    code.length != 0 &&
      errorApi
        .getPermissions(code[0])
        .then((res) => {
          res.status == "success" &&
            setCookie("permissions", res, { maxAge: 3600 });
        })
        .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (userData.status == "success") {
      setUser(userData.response);
    } else if (
      userData.status == "error" &&
      userData.message == "Invalid token."
    ) {
      userApi
        .logoutUser()
        .then(() => {
          toast.error(userData.message);
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  }, [userData]);

  return (
    <UsersContext.Provider value={{ user }}>
      <ThemeContext.Provider value={themes[theme]}>
        <CookiesProvider defaultSetOptions={{ path: "/" }}>
          <div style={{ minWidth: 375, maxWidth: 1500 }} className="mx-auto">
            <Header
              theme={theme}
              setTheme={setTheme}
              removeCookie={removeCookie}
            />
            <Outlet />
            <Footer cookies={cookies} />
          </div>
        </CookiesProvider>
      </ThemeContext.Provider>
    </UsersContext.Provider>
  );
}

export default Main;
