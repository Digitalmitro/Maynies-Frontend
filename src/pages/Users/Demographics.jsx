import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SubmissionModal from "../../components/SubmisionModal";

function Demographics() {
  const [activeTab, setActiveTab] = useState("templates");

  const [templates, setTemplates] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  const [loadingTemplates, setLoadingTemplates] = useState(false);
  const [loadingSubmissions, setLoadingSubmissions] = useState(false);
  const [modalState, setModalState] = useState(null);
  const [submissionId, setSubmissionId] = useState(null);
  const navigate = useNavigate();

  // Fetch Templates
  const fetchTemplates = async () => {
    try {
      setLoadingTemplates(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/api/employer/form/templates`,
        { credentials: "include" }
      );
      const data = await response.json();
      setTemplates(data?.data || []);
    } catch (err) {
      console.error("Error fetching templates:", err);
    } finally {
      setLoadingTemplates(false);
    }
  };

  // Fetch Submissions
  const fetchSubmissions = async () => {
    try {
      setLoadingSubmissions(true);
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/api/employer/form/submissions`,
        { credentials: "include" }
      );
      const data = await res.json();
      setSubmissions(data?.submissions || []);
    } catch (err) {
      console.error("Error fetching submissions:", err);
    } finally {
      setLoadingSubmissions(false);
    }
  };

  // Load data on tab change
  useEffect(() => {
    if (activeTab === "templates") {
      fetchTemplates();
    } else {
      fetchSubmissions();
    }
  }, [activeTab]);

  function handleView(submissionId) {
    setModalState("View");
    setSubmissionId(submissionId);
  }

  function handleEdit(submissionId) {
    setModalState("Edit");
    setSubmissionId(submissionId);
  }

  // async function handleDelete(submissionId) {
  //   if (!window.confirm("Are you sure you want to delete this submission?")) {
  //     return;
  //   }

  //   try {
  //     const res = await fetch(
  //       `${
  //         import.meta.env.VITE_BACKEND_API
  //       }/api/employer/form/form-template/${submissionId}`,
  //       {
  //         method: "DELETE",
  //         credentials: "include",
  //       }
  //     );

  //     if (!res.ok) {
  //       throw new Error("Failed to delete submission");
  //     }

  //     // UI update: filter out deleted submission
  //     setSubmissions((prev) =>
  //       prev.filter((submission) => submission._id !== submissionId)
  //     );

  //     alert("Submission deleted successfully ✅");
  //   } catch (err) {
  //     console.error("Delete error:", err);
  //     alert("Error deleting submission ❌");
  //   }
  // }

  return (
    <div className='p-6'>
      <div className='flex space-x-4 border-b mb-6'>
        <button
          onClick={() => setActiveTab("templates")}
          className={`px-4 py-2 font-medium ${
            activeTab === "templates"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
        >
          Form Templates
        </button>
        <button
          onClick={() => setActiveTab("submissions")}
          className={`px-4 py-2 font-medium ${
            activeTab === "submissions"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
        >
          Form Submissions
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "templates" ? (
        <div>
          {loadingTemplates ? (
            <div className='flex justify-center items-center h-40'>
              <div className='w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin'></div>
              <span className='ml-3 text-blue-600 font-medium'>Loading...</span>
            </div>
          ) : templates.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
              {templates.map((template) => (
                <div
                  key={template._id}
                  className='bg-white shadow-md rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition'
                >
                  <h3 className='text-lg font-semibold text-gray-800'>
                    {template?.title}
                  </h3>
                  <p className='text-sm text-gray-600 mt-2 line-clamp-2'>
                    {template?.description}
                  </p>
                  <button
                    className='mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 w-full'
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
          ) : (
            <p className='text-gray-500 text-center'>No templates available</p>
          )}
        </div>
      ) : (
        <div>
          {loadingSubmissions ? (
            <div className='flex justify-center items-center h-40'>
              <div className='w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin'></div>
              <span className='ml-3 text-green-600 font-medium'>
                Loading Submissions...
              </span>
            </div>
          ) : submissions.length > 0 ? (
            <div className='space-y-3'>
              {submissions.map((submission) => (
                <div
                  key={submission._id}
                  className='bg-gray-50 p-4 rounded-lg border border-gray-200 flex justify-between items-center hover:bg-gray-100 transition'
                >
                  {/* Left Side (Title + Status) */}
                  <div>
                    <h3 className='font-medium text-gray-800'>
                      {submission.title}
                    </h3>
                    <div className='flex items-center mt-1'>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          submission.status?.toLowerCase() === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {submission.status}
                      </span>
                    </div>
                  </div>

                  {/* Right Side (Buttons) */}
                  <div className='flex gap-2'>
                    {submission.status === "Pending" && (
                      <>
                        <button
                          className='px-3 py-1.5 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition'
                          onClick={() => handleEdit(submission._id)}
                        >
                          Edit
                        </button>

                        {/* <button
                          className='px-3 py-1.5 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition'
                          onClick={() => handleDelete(submission._id)}
                        >
                          Delete
                        </button> */}
                      </>
                    )}

                    <button
                      className='px-3 py-1.5 bg-gray-200 text-gray-800 rounded-md text-sm font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition'
                      onClick={() => handleView(submission._id)}
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='text-center py-6 text-gray-500'>
              No submissions yet
            </div>
          )}
        </div>
      )}

      {modalState && (
        <SubmissionModal
          id={submissionId}
          mode={modalState}
          onClose={() => setModalState(false)}
        />
      )}
    </div>
  );
}

export default Demographics;
