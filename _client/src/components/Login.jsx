import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import "../App.css";
import InputCom from "./InputCom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((user) => user.email === email);

    if (!email) {
      validationErrors.email = "Email is required";
    } else if (!user) {
      validationErrors.email = "Email not found";
    }

    if (!password) {
      validationErrors.password = "Password is required";
    } else if (!user || user.password !== password) {
      validationErrors.password = "Incorrect password";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      sessionStorage.setItem("loggedInUser", user.email);
      navigate("/todo");
    }
  };

  return (
    <section className="container-forms">
      <div className="form-box">
        <div className="form-content">
          <h2 className="header-color">Login</h2>
          <form onSubmit={handleSubmit}>
            <InputCom
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
              errors={errors}
            />

            <InputCom
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              errors={errors}
              isPasswordField={true}
            />

            <button type="submit" className="login-button">
              Login
            </button>
            <p>
              Don't have an account? <Link to="/signup">Signup</Link>
            </p>
          </form>
          <div className="divider">or</div>
          <div className="social-buttons">
            <button className="facebook-btn">
              <span>
                <FaFacebook className="text-blue-700" />
              </span>
              Login with Facebook
            </button>
            <button className="Google-btn">
              <span>
                <FaGoogle className="text-red-600 " />
              </span>
              Login with Google
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
