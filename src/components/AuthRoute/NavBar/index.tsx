import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import UserService from "../../../services/user-service";

const NavBar = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await UserService.logout();
      navigate("/login");
    } catch (_err) {
      setLoading(false);
      return alert("Something went wrong.");
    }
  };

  return (
    <div className="nav-bar">
      <div className="logo" onClick={() => navigate("/")}>
        <i className="fa-solid fa-cubes"></i>Airflow
      </div>
      <div className="logout" onClick={handleLogout}>
        {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-right-from-bracket"></i>}
      </div>
    </div>
  );
};

export default NavBar;
