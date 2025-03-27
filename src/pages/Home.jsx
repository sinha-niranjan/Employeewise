import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "https://reqres.in/api";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/login");
    axios
      .get(`${API_BASE_URL}/users?page=${page}`)
      .then((res) => setUsers(res.data.data));
  }, [page, token, navigate]);

  const handleDelete = async (id) => {
    await axios.delete(`${API_BASE_URL}/users/${id}`);
    setUsers(users.filter((user) => user.id !== id));
  };
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <div className="grid grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user.id} className="bg-white p-4 shadow rounded">
            <img
              src={user.avatar}
              alt={user.first_name}
              className="w-16 h-16 rounded-full mx-auto"
            />
            <h3 className="text-lg text-center">
              {user.first_name} {user.last_name}
            </h3>
            <button
              onClick={() => handleDelete(user.id)}
              className="mt-2 w-full bg-red-500 text-white p-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
