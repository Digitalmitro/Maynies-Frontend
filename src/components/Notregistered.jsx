import { useNavigate } from "react-router-dom";

function NotRegistered() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
      <p className="text-lg text-gray-700 mb-6">
        You are not registered to access this system. Please contact the administrator for assistance.
      </p>
      <button
        onClick={() => navigate("/login")}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
      >
        Go to Login
      </button>
    </div>
  );
}

export default NotRegistered;
