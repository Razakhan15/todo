import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Textarea } from "../components/utils/Input";
import Loader from "../components/utils/Loader";
import MainLayout from "../layouts/MainLayout";
import validateManyFields from "../validations";
import api from "../api";

const Task = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { taskId } = useParams();
  const mode = taskId === undefined ? "add" : "update";
  // const [task, setTask] = useState(null);
  const [formData, setFormData] = useState({
    description: "",
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (!localStorage.getItem("logged")) navigate("/");
    document.title = mode === "add" ? "Add task" : "Update Task";
  }, [mode]);

  useEffect(() => {
    fetchTasks();
  }, [mode, taskId]);

  const fetchTasks = async () => {
    if (mode === "update") {
      setLoading(true);
      try {
        const { data } = await api.get(`/tasks/${taskId}`, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        // setTask(data.task);
        setFormData({ description: data.task.description });
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = (e) => {
    e.preventDefault();
    setFormData({
      description: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateManyFields("task", formData);
    setFormErrors({});

    if (errors.length > 0) {
      setFormErrors(
        errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {})
      );
      return;
    }
    try {
      if (mode === "add") {
        await api.post("/tasks", formData, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        navigate("/tasks");
      } else {
        await api.put(`/tasks/${taskId}`, formData, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        navigate("/tasks");
      }
    } catch (error) {
      console.log(error);
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
      <MainLayout>
        <form className="m-auto my-16 max-w-[1000px] bg-white p-8 border-2 shadow-md rounded-md">
          {loading ? (
            <Loader />
          ) : (
            <>
              <h2 className="text-center mb-4">
                {mode === "add" ? "Add New Task" : "Edit Task"}
              </h2>
              <div className="mb-4">
                <label htmlFor="description">Description</label>
                <Textarea
                  type="description"
                  name="description"
                  id="description"
                  value={formData.description}
                  placeholder="Write here.."
                  onChange={handleChange}
                />
                {fieldError("description")}
              </div>

              <button
                className="bg-primary text-white px-4 py-2 font-medium hover:bg-primary-dark"
                onClick={handleSubmit}
              >
                {mode === "add" ? "Add task" : "Update Task"}
              </button>
              <button
                className="ml-4 bg-red-500 text-white px-4 py-2 font-medium"
                onClick={() => navigate("/tasks")}
              >
                Cancel
              </button>
              {mode === "update" && (
                <button
                  className="ml-4 bg-blue-500 text-white px-4 py-2 font-medium hover:bg-blue-600"
                  onClick={handleReset}
                >
                  Reset
                </button>
              )}
            </>
          )}
        </form>
      </MainLayout>
    </>
  );
};

export default Task;
