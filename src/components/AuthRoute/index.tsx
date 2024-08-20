import { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/user-service";
import NavBar from "./NavBar";

interface AuthRouteProps {
  children: ReactElement;
}

const AuthRoute = ({ children }: AuthRouteProps) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await UserService.getUserDetails();
        setLoading(false);
      } catch (_err) {
        return navigate("/login");
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <i className="fa-solid fa-spinner fa-spin"></i>
      </div>
    );
  }
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default AuthRoute;
