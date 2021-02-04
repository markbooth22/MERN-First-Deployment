import React from "react";
import "./Utils.css";

const InputGroup = (props) => {
  const { label, value, type, handleChange, name, errorMessage } = props;

  return (
    <div className="InputGroup">
      <div className="label-input">
        <label htmlFor={name}>{label}</label>
        <input
          name={name}
          id={name}
          type={type}
          value={value}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="error">{errorMessage}</div>
    </div>
  );
};

const Button = ({ children, className, ...props }) => {
  return (
    <button className={`Button ${className}`} {...props}>
      {children}
    </button>
  );
};

export { InputGroup, Button };
