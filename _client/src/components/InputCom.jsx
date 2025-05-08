import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function InputCom({
  type,
  name,
  value,
  placeholder,
  onChange,
  errors = {},
  isPassword = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    isPassword && !showPassword ? "password" : isPassword ? "text" : type;

  return (
    <div className="field">
      <div className="input-div">
        <input
          type={inputType}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete="off"
          className={`input-field ${errors[name] ? "input-error" : ""}`}
        />
        {isPassword && (
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
            style={{ cursor: "pointer", marginLeft: "8px" }}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        )}
      </div>
      {errors[name] && <p className="error">{errors[name]}</p>}
    </div>
  );
}

export default InputCom;
