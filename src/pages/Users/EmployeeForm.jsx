import React, { useState, useEffect } from "react";
import { FaFileAlt, FaDownload, FaUpload } from "react-icons/fa";

const EmployeeProfile = () => {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_API}/api/employer`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        console.log(data?.data);
        setEmployee(data?.data);
      } catch (err) {
        console.error("Failed to fetch employee data:", err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (field, value) => {
    setEmployee((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLocationChange = (field, value) => {
    setEmployee((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [field]: value,
      },
    }));
  };

  const handleProfileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/api/upload/employer_profile`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const data = await res.json();
      if (data?.file_url) {
        console.log(data?.file_url);
        setEmployee((prev) => ({
          ...prev,
          avatar_url: `${import.meta.env.VITE_BACKEND_API}${data.file_url}`,
        }));
        alert("Profile image uploaded successfully!");
        
      } else {
        alert("Upload failed: " + data.message || "Unknown error");
      }
    } catch (err) {
      console.error("Profile upload failed:", err);
      alert("Profile upload failed.");
    }
  };

  const handleDocumentUpload = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedDocs = [];

    for (let file of files) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_API}/api/upload/employer_document`,
          {
            method: "POST",
            credentials: "include",
            body: formData,
          }
        );

        const data = await res.json();
        console.log(data);
        if (data?.file_url) {
          console.log(data?.file_url);
          uploadedDocs.push({
            name: file.name,
            file_url: `${import.meta.env.VITE_BACKEND_API}${data.file_url}`,
          });
          setEmployee((prev) => ({
            ...prev,
            documents: [...(prev.documents || []), ...uploadedDocs],
          }));
        } else {
          alert(`Failed to upload ${file.name}`);
        }
      } catch (err) {
        console.error("Upload failed:", err);
        alert(`Error uploading ${file.name}`);
      }
    }

    setUploadedDocuments((prev) => [...prev, ...uploadedDocs]);
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/api/employer`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...employee,
            date_of_joining: new Date(employee.date_of_joining).toISOString(),
            bio: "",
          }),
        }
      );
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      if (data.success) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile: " + data.message);
      }
    } catch (err) {
      alert("Failed to update profile.");
      console.error(err);
    }
  };

  if (!employee) return <p>Loading...</p>;

  return (
    <div className="bg-white p-6 max-w-4xl mx-auto rounded-xl  relative">
      {/* Notification Icon */}

      {/* Profile */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6 relative">
        <div className="relative">
          <img
            src={employee.avatar_url}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border border-gray-300"
          />
          <label className="absolute bottom-0 right-0 bg-orange-500 p-1 rounded-full cursor-pointer">
            <FaUpload className="text-white text-xs" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfileUpload}
            />
          </label>
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-lg font-semibold">
            {employee.first_name} {employee.last_name}
          </h2>
          <p className="text-sm text-gray-600 max-w-md">{employee.bio}</p>
        </div>
      </div>

      {/* Personal Information */}
      <div className="mb-6">
        <h3 className="font-semibold text-md mb-2">Personal Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Editable Fields */}
          <InputField
            label="First Name"
            value={employee?.first_name}
            onChange={(val) => handleChange("first_name", val)}
          />
          <InputField
            label="Last Name"
            value={employee?.last_name}
            onChange={(val) => handleChange("last_name", val)}
          />
          <InputField
            label="Designation"
            value={employee?.designation}
            onChange={(val) => handleChange("designation", val)}
          />
          <InputField
            label="Date of Joining"
            type="date"
            value={employee?.date_of_joining?.slice(0, 10)}
            onChange={(val) => handleChange("date_of_joining", val)}
          />
          <InputField
            label="Contact No."
            value={employee?.contact_number}
            onChange={(val) => handleChange("contact_number", val)}
          />
          <InputField
            label="Work Number"
            value={employee?.work_number}
            onChange={(val) => handleChange("work_number", val)}
          />
          <InputField
            label="City"
            value={employee?.location?.city}
            onChange={(val) => handleLocationChange("city", val)}
          />
          <InputField
            label="Country"
            value={employee?.location?.country}
            onChange={(val) => handleLocationChange("country", val)}
          />
        </div>
      </div>

      {/* Documents */}
      <div className="mb-6">
        <h3 className="font-semibold text-md mb-2">Documents Submitted</h3>

        {employee?.documents?.length > 0 ? (
          <div className="flex flex-col gap-3">
            {employee.documents.map((doc, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 p-3 rounded-lg bg-gray-100 shadow-sm"
              >
                <span className="text-sm truncate">{doc.name}</span>
                <a
                  href={doc.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-fit items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  {/* <FaFileAlt />
                  <FaDownload /> */}
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-sm mb-2">
            No documents uploaded yet.
          </div>
        )}

        {/* Upload Field */}
        <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.jpg,.png"
          onChange={handleDocumentUpload}
          className="bg-gray-100 px-3 py-2 rounded-md mt-4 w-full text-sm file:mr-3 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-orange-500 file:text-white hover:file:bg-orange-600"
        />
      </div>

      {/* Submit Button */}
      <div className="text-center mt-4">
        <button
          onClick={handleSubmit}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

// Reusable InputField component
const InputField = ({ label, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-sm text-gray-600 mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-gray-100 rounded-md h-8 outline-blue-100 px-4"
    />
  </div>
);

export default EmployeeProfile;
