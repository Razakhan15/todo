import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "./utils/Loader";
import Tooltip from "./utils/Tooltip";
import api from "../api";
import MainLayout from "../layouts/MainLayout";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const { data } = await api.get("/tasks", {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setTasks(data.tasks);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("logged")) navigate("/");
    fetchTasks();
  }, [tasks]);

  const handleDelete = async (id) => {
    await api.delete(`/tasks/${id}`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
  };

  return (
    <MainLayout>
      <div className="my-2 mx-auto max-w-[700px] py-4">
        {loading ? (
          <Loader />
        ) : (
          <div>
            <div className=" flex items-center justify-center gap-4">
              {tasks.length === 0 && <span>No tasks found</span>}
            </div>
            {tasks.length !== 0 && (
              <h2 className="my-2 ml-2 md:ml-0 text-xl">
                Your tasks ({tasks.length})
              </h2>
            )}
            {tasks.map((task, index) => (
              <div
                key={task._id}
                className="bg-white my-4 p-4 text-gray-600 rounded-md shadow-md"
              >
                <div className="flex">
                  <span className="font-medium">Task #{index + 1}</span>

                  <Tooltip text={"Edit this task"} position={"top"}>
                    <Link
                      to={`/tasks/${task._id}`}
                      className="ml-auto mr-2 text-green-600 cursor-pointer"
                    >
                      <i className="fa-solid fa-pen"></i>
                    </Link>
                  </Tooltip>

                  <Tooltip text={"Delete this task"} position={"top"}>
                    <span
                      className="text-red-500 cursor-pointer"
                      onClick={() => handleDelete(task._id)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </span>
                  </Tooltip>
                </div>
                <div className="whitespace-pre">{task.description}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Tasks;
