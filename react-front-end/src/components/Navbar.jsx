import { useNavigate } from "react-router-dom";
// import logo from "../icons/Logo.png";
import LogoutButton from './components/LogoutButton';

export const Navbar = () => {
  const navigate = useNavigate();

  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  function logOut() {
    userDetails === null
      ? navigate("/Registration")
      : localStorage.removeItem("userDetails");
    navigate("/Registration");
  }

  return (
    <nav>
      <div style={{ display: "flex", gap: "5px" }}>
        <div style={{ display: "flex" }}>
          {/* <NavLink to="/">
            <img
              src={logo}
              alt="Logo"
              style={{ height: "50px", width: "50px" }}
            />
          </NavLink> */}
            <LogoutButton token={token} setToken={setTokenFunction} /><br />
        </div>
      </div>
    </nav>
  );
};
