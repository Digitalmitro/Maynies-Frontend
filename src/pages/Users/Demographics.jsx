import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Demographics() {
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_API}/api/employer/form/templates`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setTemplates(data?.data);
          console.log(data?.data);
        } else {
          console.error("Failed to fetch templates:", data.message);
        }
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };
    fetchTemplates();
  }, []);
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Form Templates</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates?.map((template) => (
          <div
            key={template._id}
            className="bg-white shadow-md rounded-2xl p-4 border hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {template?.title}
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              {template?.description}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              onClick={() =>
                navigate(`/dashboard/users/form/${template.title}`, {
                  state: { templateId: template._id },
                })
              }
            >
              Open Form
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Demographics;
