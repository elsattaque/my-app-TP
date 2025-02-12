import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import "./App.css";
import { GetUser } from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <GetUser>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </GetUser>
  );
}
