import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";
import toastOptions from "../utils/toastOptions";
import { backendURL } from "../utils/URL";
const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formData = (data) => {
    console.log(data);
    login(data);
  };

  const login = async (data) => {
    try {
      const res = await fetch(`${backendURL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const jsonRes = await res.json();

      // console.log(jsonRes);

      if (jsonRes.error) {
        throw new Error(jsonRes.error);
      }

      toast.success(jsonRes.message, toastOptions);

      navigate("/");
    } catch (error) {
      toast.error(error.message, toastOptions);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(formData)}>
        <div className="form-header">Login</div>
        <div>
          <label>Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </div>

        <button type="submit">Submit</button>
        <div>
          <p style={{ marginTop: "10px" }}>
            Don't have an account? <Link to="/signup">sign up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;