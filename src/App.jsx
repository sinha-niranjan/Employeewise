import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import EditForm from "./pages/EditForm";

const API_BASE_URL = "https://reqres.in/api";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Protected Route  */}
        <Route element={<ProtectedRoute />}>
          <Route path="/users" element={<Home />} />
          <Route path="/users/:userId" element={<EditForm />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
