import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validateManyFields from "../validations";
import Input from "./utils/Input";
import Loader from "./utils/Loader";
import { useEffect } from "react";
import { toast } from "react-toastify";
import api from "../api";

const LoginForm = () => {
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateManyFields("login", formData);
    setFormErrors({});
    if (errors.length > 0) {
      setFormErrors(
        errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {})
      );
      return;
    }
    try {
      setLoading(true);
      const { data } = await api.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("logged", true);
      toast.success(data.msg);
      setLoading(false);
      navigate('/tasks');
    } catch (error) {
      const msg = error.response?.data?.msg || error.message;
      console.log(msg);
      toast.error(msg);
      setLoading(false);
    }
  };

  const fieldError = (field) => (
    <p
      className={`mt-1 text-pink-600 text-sm ${
        formErrors[field] ? "block" : "hidden"
      }`}
    >
      <i className="mr-2 fa-solid fa-circle-exclamation"></i>
      {formErrors[field]}
    </p>
  );

  return (
    <>
      <form className="m-auto my-16 max-w-[500px] bg-white p-8 border-2 shadow-md rounded-md">
        {loading ? (
          <Loader />
        ) : (
          <>
            <h2 className="text-center mb-4">
              Welcome user, please login here
            </h2>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="after:content-['*'] after:ml-0.5 after:text-red-500"
              >
                Email
              </label>
              <Input
                type="text"
                name="email"
                id="email"
                value={formData.email}
                placeholder="youremail@domain.com"
                onChange={handleChange}
              />
              {fieldError("email")}
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="after:content-['*'] after:ml-0.5 after:text-red-500"
              >
                Password
              </label>
              <Input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                placeholder="Your password.."
                onChange={handleChange}
              />
              {fieldError("password")}
            </div>

            <button
              className="bg-primary text-white px-4 py-2 font-medium hover:bg-primary-dark"
              onClick={handleSubmit}
            >
              Submit
            </button>

            <div className="pt-4">
              <Link to="/signup" className="text-blue-400">
                Don't have an account? Signup here
              </Link>
            </div>
          </>
        )}
      </form>
    </>
  );
};

export default LoginForm;
