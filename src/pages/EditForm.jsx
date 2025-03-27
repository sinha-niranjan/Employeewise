import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const API_BASE_URL = "https://reqres.in/api";

const EditForm = () => {
  const params = useParams();
  const userId = params.userId;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/users/${userId}`);
        const data = res?.data?.data;
        if (data) {
          setFirstName(data?.first_name);
          setLastName(data?.last_name);
          setEmail(data?.email);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  const updateHandler = async () => {
    try {
      setLoading(true);
      const res = await axios.put(`${API_BASE_URL}/users/${userId}`, {
        first_name: firstName,
        last_name: lastName,
        email: email,
      });
      console.log("update user ", res.data);
      setLoading(false);
      navigate("/users");
    } catch (error) {
      console.log(error);
    }
  };

  if (Loading) return <Spinner />;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="bg-white p-6 rounded shadow-md space-y-6 w-4/5 sm:w-3/5 md:w-1/3">
        <h2 className="w-full flex items-center justify-center text-2xl font-bold mb-6">
          Edit User
        </h2>

        <div className="flex gap-2">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            className="w-full mb-2 p-2 border-2  focus:outline-none rounded-lg"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className="w-full mb-2 p-2 border-2  focus:outline-none rounded-lg"
          />
        </div>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className="w-full mb-2 p-2 border-2 focus:outline-none rounded-lg "
        />

        <button
          onClick={() => updateHandler()}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EditForm;
