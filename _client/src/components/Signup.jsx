import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import "../App.css";
import InputCom from "./InputCom";

function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

  const { email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const generateUserId = () => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Extract existing user IDs
    let existingIds = users
      .map((user) => parseInt(user.id.replace("AA", ""), 10))
      .sort((a, b) => a - b);

    // Find the first missing ID
    let newId = 1;
    for (let i = 0; i < existingIds.length; i++) {
      if (existingIds[i] !== newId) break;
      newId++;
    }

    return `AA${newId}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!email) {
      validationErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      validationErrors.email = "Invalid email format";
    }

    if (!password) {
      validationErrors.password = "Password is required";
    } else if (!passwordRegex.test(password)) {
      validationErrors.password =
        "Password must be 8-15 characters, with 1 uppercase, 1 number, and 1 special character";
    }

    if (!confirmPassword) {
      validationErrors.confirmPassword = "Confirm Password is required";
    } else if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      let users = JSON.parse(localStorage.getItem("users")) || [];

      const userExists = users.some((user) => user.email === email);
      if (userExists) {
        alert("User with this email already exists! Try logging in.");
        return;
      }

      const userId = generateUserId();

      users.push({ id: userId, email, password });

      localStorage.setItem("users", JSON.stringify(users));

      alert(`Signup successful!`);
      navigate("/");
    }
  };

  return (
    <section className="container-forms">
      <div className="form-box">
        <div className="form-content">
          <h2 className="header-color">Signup</h2>
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
            />
            <InputCom
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleChange}
              errors={errors}
              isConfirmPassword={true}
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
              <span>
                <FaFacebook className="text-blue-700" />
              </span>
              Login with Facebook
            </button>
            <button className="Google-btn">
              <span>
                <FaGoogle className="text-red-600" />
              </span>
              Login with Google
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
