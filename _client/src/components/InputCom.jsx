import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function InputCom({
  type,
  name,
  value,
  placeholder,
  onChange,
  errors,
  isPasswordField,
  isConfirmPassword,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="field password-field">
     
     <div className="input-div">
     
      <input
        type={
          isPasswordField || isConfirmPassword
            ? showPassword
              ? "text"
              : "password"
            : type
        }
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {(isPasswordField || isConfirmPassword) && (
        <span onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </span>
      )}
     </div> 
      {errors[name] && <p className="error">{errors[name]}</p>}
    </div>
  );
}

export default InputCom;

