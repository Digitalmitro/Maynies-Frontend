import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function TemplateFormById() {
  const location = useLocation();
  const templateId = location.state?.templateId;
  const [formTemplate, setFormTemplate] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!templateId) return;

    const fetchTemplate = async () => {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_BACKEND_API
          }/api/employer/form/template/${templateId}`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        setFormTemplate(data?.data);
        console.log("sdhfgfdef", data?.data);
      } catch (err) {
        console.error("Error fetching template:", err);
      } finally {
        setLoading(false);
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
    fetchTemplate();
  }, [templateId]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const formDataFile = new FormData();
    formDataFile.append("file", file);
    console.log("firstname", file);
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_API}/api/upload/form_receipt`,
      {
        method: "POST",
        body: formDataFile,
        credentials: "include",
      }
    );
    const data = await res.json();
    console.log("data", data);
    if (data.file_url) {
      setFormData((prev) => ({
        ...prev,
        receipt: `${import.meta.env.VITE_BACKEND_API}${data.file_url}`,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);

    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_API}/api/employer/form/submit`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formTemplateId: templateId,
          data: {
            ...formData,
            amount: Number(formData.amount),
          },
        }),
      }
    );

    const data = await res.json();
    if (data.success) {
      alert("Form submitted successfully!");
    } else {
      alert("Something went wrong!");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading form...</p>;
  if (!formTemplate) return <p className="text-center mt-10">Form not found</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 ">
  {/* Form Header */}
  <div className="mb-8 text-center">
    <h2 className="text-2xl font-semibold text-gray-800">
      {formTemplate?.title}
    </h2>
    <p className="text-gray-500 mt-2">
      {formTemplate?.description}
    </p>
  </div>

  {/* Form Fields */}
  <form onSubmit={handleSubmit} className="space-y-6">
    {formTemplate.fields.map((field) => {
      const type = field.type?.toLowerCase();

      switch (type) {
        // Text Inputs
        case "text":
        case "password":
        case "email":
        case "number":
        case "date":
        case "datetime-local":
          return (
            <div key={field.name} className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              <input
                type={type}
                required={field.required}
                min={field.min}
                max={field.max}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                value={formData[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
              />
            </div>
          );

        // Dropdown Select
        case "select":
        case "dropdown":
          return (
            <div key={field.name} className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              <select
                required={field.required}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                value={formData[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
              >
                <option value="">Select an option</option>
                {field.options?.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          );

        // Radio Buttons
        case "radio":
          return (
            <div key={field.name} className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              <div className="flex flex-wrap gap-4 mt-2">
                {field.options?.map((opt) => (
                  <label key={opt} className="inline-flex items-center">
                    <input
                      type="radio"
                      name={field.name}
                      value={opt}
                      required={field.required}
                      checked={formData[field.name] === opt}
                      onChange={(e) =>
                        handleChange(field.name, e.target.value)
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-gray-700">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          );

        // Checkboxes
        case "checkbox":
          return (
            <div key={field.name} className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              <div className="flex flex-wrap gap-4 mt-2">
                {field.options?.map((opt) => (
                  <label key={opt} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name={field.name}
                      value={opt}
                      checked={formData[field.name]?.includes(opt)}
                      onChange={(e) => {
                        const valueArray = formData[field.name] || [];
                        if (e.target.checked) {
                          handleChange(field.name, [...valueArray, opt]);
                        } else {
                          handleChange(
                            field.name,
                            valueArray.filter((v) => v !== opt)
                          );
                        }
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-gray-700">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          );

        // File Upload
        case "file":
          return (
            <div key={field.name} className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              <div className="mt-1 flex items-center">
                <label className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Choose File
                  <input
                    type="file"
                    accept={field.accept?.join(",")}
                    required={field.required}
                    className="sr-only"
                    onChange={(e) => handleFileUpload(e)}
                  />
                </label>
                <span className="ml-2 text-sm text-gray-500">
                  {formData[field.name]?.name || "No file chosen"}
                </span>
              </div>
            </div>
          );

        default:
          return (
            <div key={field.name}>
              <p className="text-red-500 text-sm">
                Unsupported field type: {field.type}
              </p>
            </div>
          );
      }
    })}

    {/* Submit Button */}
    <div className="pt-4">
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Submit
      </button>
    </div>
  </form>

  {/* Form Submissions Section */}
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
            <button
              className="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
              onClick={() => alert(`View Submission ID: ${submission._id}`)}
            >
              View
            </button>
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

export default TemplateFormById;
