import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Demographics() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  // useEffect(() => {
  //     if (!templateId) return;
  
  //     const fetchTemplate = async () => {
  //       try {
  //         const res = await fetch(
  //           `${
  //             import.meta.env.VITE_BACKEND_API
  //           }/api/employer/form/template/${templateId}`,
  //           {
  //             credentials: "include",
  //           }
  //         );
  //         const data = await res.json();
  //         setFormTemplate(data?.data);
  //         console.log("sdhfgfdef", data?.data);
  //       } catch (err) {
  //         console.error("Error fetching template:", err);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
     
  //     fetchTemplate();
  //   }, [templateId]);
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoading(true); // Start loader
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
        } else {
          console.error("Failed to fetch templates:", data.message);
        }
      } catch (error) {
        console.error("Error fetching templates:", error);
      } finally {
        setLoading(false); // Stop loader
      }
    };
     const fetchData = async () => {
        try {
          const res = await fetch(
            `${
              import.meta.env.VITE_BACKEND_API
            }/api/employer/form/submissions`,
            {
              credentials: "include",
            }
          );
          const data = await res.json();
          setData(data?.submissions);
          console.log("this data", data?.submissions);
        } catch (err) {
          console.error("Error fetching template:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    fetchTemplates();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Form Templates</h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 text-green-600 font-medium">Loading...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates?.length > 0 ? (
            templates.map((template) => (
              <div
                key={template._id}
                className="bg-white shadow-md rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {template?.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  {template?.description}
                </p>
                <button
                  className="mt-4 px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                  onClick={() =>
                    navigate(`/dashboard/users/form/${template.title}`, {
                      state: { templateId: template._id },
                    })
                  }
                >
                  Open Form
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No templates available
            </p>
          )}
        </div>
      )}

        <div className="mt-12">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Form Submissions</h2>

    <div className="space-y-3">
      {data?.length > 0 ? (
        data.map((submission) => (
          <div
            key={submission._id}
            className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex justify-between items-center hover:bg-gray-100 transition"
          >
            <div>
              <h3 className="font-medium text-gray-800">{submission.title}</h3>
              <div className="flex items-center mt-1">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  submission.status === 'completed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {submission.status}
                </span>
              
              </div>
            </div>

            {submission.status!=='Pending' && <button
              className="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
              onClick={() => alert(`View Submission ID: ${submission._id}`)}
            >
              Download
            </button>}
            
          </div>
        ))
      ) : (
        <div className="text-center py-6 text-gray-500">
          No submissions yet
        </div>
      )}
    </div>
  </div>
    </div>
  );
}

export default Demographics;
