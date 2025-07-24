import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function TemplateFormById() {
  const location = useLocation();
  const templateId = location.state?.templateId;
  const [formTemplate, setFormTemplate] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!templateId) return;
  
    const fetchTemplate = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_API}/api/employer/form/template/${templateId}`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        setFormTemplate(data?.data);
        console.log("sdhfgfdef",data?.data)
      } catch (err) {
        console.error("Error fetching template:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchTemplate();
  }, [templateId]);
  

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (name, e) => {
    const file = e.target.files[0];
    const formDataFile = new FormData();
    formDataFile.append("file", file);

    const res = await fetch("/api/upload/file", {
      method: "POST",
      body: formDataFile,
      credentials: "include",
    });
    const data = await res.json();

    if (data.file_url) {
      setFormData((prev) => ({ ...prev, [name]: data.file_url }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);

    // const res = await fetch("/api/employer/form/submit", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   credentials: "include",
    //   body: JSON.stringify({
    //     templateId,
    //     ...formData,
    //   }),
    // });

    // const data = await res.json();
    // if (data.success) {
    //   alert("Form submitted successfully!");
    // } else {
    //   alert("Something went wrong!");
    // }
  };

  if (loading) return <p className="text-center mt-10">Loading form...</p>;
  if (!formTemplate) return <p className="text-center mt-10">Form not found</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 mt-6 rounded shadow">
      <h2 className="text-xl font-bold mb-1 text-center">
        {formTemplate?.title}
      </h2>
      <p className="text-sm text-gray-600 mb-4 text-center">
        {formTemplate?.description}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
      {formTemplate.fields.map((field) => {
  const type = field.type?.toLowerCase();

  switch (type) {
    // 1. Text Inputs
    case "text":
    case "password":
    case "email":
    case "number":
    case "date":
    case "datetime-local":
      return (
        <div key={field.name}>
          <label className="block font-medium mb-1">{field.label}</label>
          <input
            type={type}
            required={field.required}
            min={field.min}
            max={field.max}
            className="w-full border px-3 py-2 rounded"
            value={formData[field.name] || ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
          />
        </div>
      );

    // 2. Dropdown Select
    case "select":
    case "dropdown":
      return (
        <div key={field.name}>
          <label className="block font-medium mb-1">{field.label}</label>
          <select
            required={field.required}
            className="w-full border px-3 py-2 rounded"
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

    // 3. Radio Buttons
    case "radio":
      return (
        <div key={field.name}>
          <label className="block font-medium mb-1">{field.label}</label>
          <div className="flex gap-4">
            {field.options?.map((opt) => (
              <label key={opt} className="flex items-center gap-1">
                <input
                  type="radio"
                  name={field.name}
                  value={opt}
                  required={field.required}
                  checked={formData[field.name] === opt}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      );

    // 4. Checkboxes (multiple selection)
    case "checkbox":
      return (
        <div key={field.name}>
          <label className="block font-medium mb-1">{field.label}</label>
          <div className="flex gap-4 flex-wrap">
            {field.options?.map((opt) => (
              <label key={opt} className="flex items-center gap-1">
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
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      );

    // 5. File Upload
    case "file":
      return (
        <div key={field.name}>
          <label className="block font-medium mb-1">{field.label}</label>
          <input
            type="file"
            accept={field.accept?.join(",")}
            required={field.required}
            className="w-full border px-3 py-2 rounded"
            onChange={(e) => handleFileUpload(field.name, e)}
          />
          {formData[field.name] && (
            <p className="text-xs text-green-600 mt-1">File uploaded</p>
          )}
        </div>
      );

    default:
      return (
        <div key={field.name}>
          <p className="text-red-500 text-sm">Unsupported field type: {field.type}</p>
        </div>
      );
  }
})}


        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default TemplateFormById;
