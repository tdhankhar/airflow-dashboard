import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import UserService from "../../../services/user-service";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleLogin = async () => {
    if (username.length < 3) {
      return alert("Username is invalid.");
    }
    if (password.length < 3) {
      return alert("Password is invalid.");
    }
    setLoading(true);
    try {
      await UserService.login(username, password);
      navigate("/");
    } catch (_err) {
      setLoading(false);
      return alert("Something went wrong.");
    }
  };

  return (
    <div className="auth">
      <div className="box border">
        <div className="container">
          <h1>Log in</h1>
          <p>Verify password to access your account.</p>
        </div>
        <div className="container">
          <div className="field">
            <div className="label">Username</div>
            <input className="border" placeholder="Enter your username" value={username} onChange={handleUsernameChange} />
          </div>
          <div className="field">
            <div className="label">Password</div>
            <input
              className="border"
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
        </div>
        <div className="container">
          <button className="btn dark-button" onClick={handleLogin}>
            {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Log in"}
          </button>
          <p>
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
