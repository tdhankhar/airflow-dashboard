import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import UserService from "../../../services/user-service";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleConfirmedPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmedPassword(e.target.value);
  };
  const handleSignup = async () => {
    if (username.length < 3) {
      return alert("Username is invalid.");
    }
    if (password.length < 3 || password !== confirmedPassword) {
      return alert("Password is invalid.");
    }
    setLoading(true);
    try {
      await UserService.signup(username, password);
      alert("User created successfully.");
      navigate("/login");
    } catch (_err) {
      setLoading(false);
      return alert("Something went wrong.");
    }
  };

  return (
    <div className="auth">
      <div className="box border">
        <div className="container">
          <h1>Sign up</h1>
          <p>Create a new account to access Airflow.</p>
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
          <div className="field">
            <div className="label">Confirm Password</div>
            <input
              className="border"
              placeholder="Enter password again"
              type="password"
              value={confirmedPassword}
              onChange={handleConfirmedPasswordChange}
            />
          </div>
        </div>
        <div className="container">
          <button className="btn dark-button" onClick={handleSignup}>
            {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Sign up"}
          </button>
          <p>
            Already have an account? <a href="/login">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
