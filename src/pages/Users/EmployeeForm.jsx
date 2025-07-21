import React, { useState, useEffect } from "react";
import {  FaFileAlt, FaDownload } from "react-icons/fa";

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
            bio:"",
            avatar_url:"https://chatgpt.com/c/687e3582-07f8-8003-bdd1-09786276e48d",
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
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6">
        <img
          src={employee.profile_picture}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover"
        />
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
        <div className="flex flex-col gap-2">
          {employee?.documents?.map((doc, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2 rounded-md bg-gray-200"
            >
              <span>{doc.name}</span>
              <a
                href={doc.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-500"
              >
                <FaFileAlt />
                <FaDownload />
              </a>
            </div>
          ))}
        </div>
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
