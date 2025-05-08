import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import "../App.css";
import InputCom from "./InputCom";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const { name, email, password, confirmPassword } = formData;
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(email.trim()))
      newErrors.email = "Invalid email format";

    if (!password) newErrors.password = "Password is required";
    else if (!passwordRegex.test(password))
      newErrors.password =
        "Password must be 8-15 chars with uppercase, number & special char";

    if (!confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required";
    else if (password !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

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
      const { name, email, password, confirmPassword } = formData;

      const res = await axios.post("http://localhost:4000/api/auth/signup", {
        name: name.trim(),
        email: email.trim(),
        password,
        confirmPassword,
      });

      if (res.status === 200 || res.status === 201) {
        alert("Signup successful!");
        navigate("/");
      }
    } catch (error) {
      const msg =
        error.response?.data?.message || "Signup failed. Please try again.";
      alert(msg);
    }
  };

  return (
    <section className="container-forms">
      <div className="form-box">
        <div className="form-content">
          <h2 className="header-color">Signup</h2>
          <form onSubmit={handleSubmit}>
            <InputCom
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              errors={errors}
            />
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
            />
            <InputCom
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              errors={errors}
              isPassword={true}
            />
            <button type="submit" className="login-button">
              Signup
            </button>
            <p>
              Already have an account? <Link to="/">Login</Link>
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

export default Signup;
