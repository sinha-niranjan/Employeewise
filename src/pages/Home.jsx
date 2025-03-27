import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const API_BASE_URL = "https://reqres.in/api";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [nextUsers, setNextUsers] = useState([]);
  const [page, setPage] = useState(1);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      try {
        if (!token) navigate("/login");
        setLoading(true);

        const res = await axios.get(`${API_BASE_URL}/users?page=${page}`);
        setUsers(res.data.data);

        const next_res = await axios.get(
          `${API_BASE_URL}/users?page=${page + 1}`
        );
        setNextUsers(next_res.data.data);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [page, token, navigate]);

  const handleDelete = async (id) => {
    await axios.delete(`${API_BASE_URL}/users/${id}`);
    setUsers(users.filter((user) => user.id !== id));
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-6 gap-4 ">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white p-4 shadow rounded hover:shadow-lg hover:-translate-y-1 transition ease-in-out duration-75 border-2 hover:border-gray-300"
          >
            <img
              src={user.avatar}
              alt={user.first_name}
              className="w-16 h-16 rounded-full mx-auto"
            />
            <h3 className="text-lg text-center">
              {user.first_name} {user.last_name}
            </h3>
            <div className="flex gap-4">
              <button
                onClick={() => navigate(`/users/${user.id}`)}
                className="mt-2 w-full bg-green-500 text-white p-2 rounded"
              >
                Edit
              </button>{" "}
              <button
                onClick={() => handleDelete(user.id)}
                className="mt-2 w-full bg-red-500 text-white p-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setPage(Math.max(page - 1, 1))}
          disabled={page === 1}
          className="bg-gray-500 text-white px-4 py-2 rounded mr-2 disabled:cursor-default disabled:bg-gray-200"
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={nextUsers.length === 0}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:cursor-default disabled:bg-blue-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
