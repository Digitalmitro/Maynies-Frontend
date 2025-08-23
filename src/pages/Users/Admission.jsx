import React, { useState } from "react";
import { Upload, User, FileText, Bell } from "lucide-react";
import axios from "axios";

const genderOptions = ["male", "female", "other"];
const maritalOptions = ["single", "married", "divorced", "widowed"];

export default function AdmissionForm() {
  const [form, setForm] = useState({
    personal: {
      first_name: "",
      last_name: "",
      dob: "",
      gender: "",
      email: "",
      mobile: "",
      country: "",
      marital_status: "",
    },
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
    },
    academic: {
      institute: "",
      qualification: "",
      grade: "",
      passing_year: "",
    },
    parent: {
      first_name: "",
      last_name: "",
      email: "",
      contact: "",
      address: {
        street: "",
        city: "",
        state: "",
        zip: "",
      },
    },
    documents: [],
  });

  const handleChange = (section, field, value, subfield) => {
    if (subfield) {
      setForm((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: {
            ...prev[section][field],
            [subfield]: value,
          },
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    }
  };

  const handleFileChange = (e, index) => {
    const files = [...form.documents];
    files[index] = e.target.files[0];
    setForm({ ...form, documents: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    const appendNested = (obj, path = "") => {
      Object.entries(obj).forEach(([key, val]) => {
        const fullPath = path ? `${path}.${key}` : key;
        console.log(fullPath, val);
        if (val instanceof File) return;
        if (typeof val === "object" && val !== null) {
          appendNested(val, fullPath);
        } else {
          data.append(fullPath, val);
        }
      });
    };

    appendNested({
      personal: form.personal,
      address: form.address,
      academic: form.academic,
      parent: form.parent,
    });

    form.documents.forEach((file) => {
      if (file) data.append(`documents`, file);
    });

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/api/student/admission`,
        data,
        {
          withCredentials: true,
        }
      );
      if (res.status === 403) {
        alert("You have already submitted the admission once.");
        return;
      }
      alert("Admission submitted successfully!");
    } catch (err) {
      console.error("Submission failed", err);
      alert("Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full min-h-screen p-4 flex justify-center items-start"
    >
      <div className="w-full max-w-6xl bg-white rounded-2xl p-1 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <User className="text-orange-500" />
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
                Admission Form
              </h2>
              <p className="text-sm text-gray-500">
                Drop your file here or{" "}
                <span className="text-orange-500">browser</span>
              </p>
            </div>
          </div>
        </div>

        {/* Student Details */}
        <h3 className="text-base sm:text-lg font-semibold text-orange-600">
          Student Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ["first_name", "First Name"],
            ["last_name", "Last Name"],
            ["dob", "Date of Birth"],
            ["email", "Email"],
            ["mobile", "Mobile"],
            ["country", "Country"],
          ].map(([field, label]) => (
            <input
              key={field}
              type={
                field === "dob" ? "date" : field === "email" ? "email" : "text"
              }
              placeholder={label}
              value={form.personal[field]}
              onChange={(e) => handleChange("personal", field, e.target.value)}
              className="border border-gray-300 py-2 px-4 rounded w-full text-sm"
              required
            />
          ))}

          <select
            value={form.personal.gender}
            onChange={(e) => handleChange("personal", "gender", e.target.value)}
            className="border border-gray-300 py-2 px-4 rounded w-full text-sm"
            required
          >
            <option value="">Select Gender</option>
            {genderOptions.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>

          <select
            value={form.personal.marital_status}
            onChange={(e) =>
              handleChange("personal", "marital_status", e.target.value)
            }
            className="border border-gray-300 py-2 px-4 rounded w-full text-sm"
            required
          >
            <option value="">Marital Status</option>
            {maritalOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Address */}
        <textarea
          placeholder="Street Address"
          value={form.address.street}
          onChange={(e) => handleChange("address", "street", e.target.value)}
          className="w-full border border-gray-300 py-2 px-4 rounded text-sm"
          rows={2}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {["city", "state", "zip"].map((field) => (
            <input
              key={field}
              type="text"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form.address[field]}
              onChange={(e) => handleChange("address", field, e.target.value)}
              className="border border-gray-300 py-2 px-4 rounded w-full text-sm"
            />
          ))}
        </div>

        {/* Academic Details */}
        <h3 className="text-base sm:text-lg font-semibold text-orange-600">
          Academic Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ["institute", "Institute"],
            ["qualification", "Qualification"],
            ["grade", "Grade"],
            ["passing_year", "Passing Year"],
          ].map(([field, label]) => (
            <input
              key={field}
              type={field === "passing_year" ? "number" : "text"}
              placeholder={label}
              value={form.academic[field]}
              onChange={(e) => handleChange("academic", field, e.target.value)}
              className="border border-gray-300 py-2 px-4 rounded w-full text-sm"
            />
          ))}
        </div>

        {/* Parent / Guardian */}
        <h3 className="text-base sm:text-lg font-semibold text-orange-600">
          Parent / Guardian Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ["first_name", "First Name"],
            ["last_name", "Last Name"],
            ["email", "Email"],
            ["contact", "Contact"],
          ].map(([field, label]) => (
            <input
              key={field}
              type={field === "email" ? "email" : "text"}
              placeholder={label}
              value={form.parent[field]}
              onChange={(e) => handleChange("parent", field, e.target.value)}
              className="border border-gray-300 py-2 px-4 rounded w-full text-sm"
            />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {["street", "city", "state", "zip"].map((field) => (
            <input
              key={field}
              type="text"
              placeholder={`Parent ${field}`}
              value={form.parent.address[field]}
              onChange={(e) =>
                handleChange("parent", "address", e.target.value, field)
              }
              className="border border-gray-300 py-2 px-4 rounded w-full text-sm"
            />
          ))}
        </div>

        {/* Documents */}
        <h3 className="text-base sm:text-lg font-semibold text-orange-600">
          Documents
        </h3>
        <div className="space-y-3">
          {["DOC 1", "DOC 2", "DOC 3"].map((label, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
            >
              <span className="text-sm font-medium">{label}</span>
              <div className="flex gap-2 items-center w-full sm:w-auto">
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e, index)}
                  accept=".pdf,.doc,.docx"
                  className="text-sm"
                />
                <Upload className="text-orange-500 cursor-pointer" />
                <FileText className="text-gray-500 cursor-pointer" />
              </div>
            </div>
          ))}
        </div>

        {/* Submit */}
        <div className="text-center mt-6">
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded text-sm sm:text-base font-semibold"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
