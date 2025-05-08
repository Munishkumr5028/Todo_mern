import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import axios from "axios";
import "../App.css";
import InputCom from "./InputCom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", {
        email: formData.email.trim(),
        password: formData.password.trim(),
      });

      // Assuming response contains user data
      if (res.status === 200 || res.status === 201) {
        sessionStorage.setItem("loggedInUser", res.data.email);
        alert("Login successful!");
        navigate("/todo");
      }
    } catch (error) {
      const msg =
        error.response?.data?.message || "Login failed. Please try again.";
      setErrors({ general: msg });
    }
  };

  return (
    <section className="container-forms">
      <div className="form-box">
        <div className="form-content">
          <h2 className="header-color">Login</h2>
          <form onSubmit={handleSubmit}>
            {errors.general && <p className="error-text">{errors.general}</p>}

            <InputCom
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              errors={errors}
            />

            <InputCom
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              errors={errors}
              isPassword={true}
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
              <FaFacebook className="text-blue-700" />
              <span>Login with Facebook</span>
            </button>
            <button className="Google-btn">
              <FaGoogle className="text-red-600" />
              <span>Login with Google</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
