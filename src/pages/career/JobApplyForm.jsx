import React, { useState } from "react";
import {
  FiUpload,
  FiUser,
  FiMail,
  FiPhone,
  FiLinkedin,
  FiFileText,
} from "react-icons/fi";
import { useLocation } from "react-router-dom";

function JobApplyForm() {
  const [formData, setFormData] = useState({
    // fullName: "",
    // email: "",
    // phone: "",
    // linkedin: "",
    cover_letter: "",
    resume_url: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const location = useLocation();
  const jobId = location.state?.job;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      resume_url: e.target.files[0],
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/api/jobs/${jobId}/apply`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cover_letter: formData.cover_letter,
            "resume_url": "https://cdn.exampleghgth.com/uploads/user_cv.pdf"
          }),
        }
        
      );
      if(res.ok){
        console.log("data:",formData);
        setSubmitSuccess(true);
        setIsSubmitting(false);
        setFormData({
          cover_letter: "",
          resume_url: null,
        });
      }
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Job Application
        </h2>
        <p className="text-gray-600">
          Please fill out the form below to apply for this position
        </p>
      </div>

      {submitSuccess && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md border border-green-200">
          Application submitted successfully! We'll get back to you soon.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        {/* <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiUser className="text-gray-400" />
            </div>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`pl-10 w-full px-4 py-2 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500`}
              placeholder="John Doe"
            />
          </div>
          {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
        </div> */}

        {/* Email */}
        {/* <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiMail className="text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`pl-10 w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-blue-500 focus:border-blue-500`}
              placeholder="john@example.com"
            />
          </div>
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div> */}

        {/* Phone */}
        {/* <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiPhone className="text-gray-400" />
            </div>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div> */}

        {/* LinkedIn */}
        {/* <div>
          <label
            htmlFor="linkedin"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            LinkedIn Profile
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiLinkedin className="text-gray-400" />
            </div>
            <input
              type="url"
              id="linkedin"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>
        </div> */}

        {/* Cover Letter */}
        <div>
          <label
            htmlFor="cover_letter"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Cover Letter
          </label>
          <textarea
            id="cover_letter"
            name="cover_letter"
            rows={4}
            value={formData?.cover_letter}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Tell us why you're the perfect candidate for this position..."
            required
          />
        </div>

        {/* resume_url Upload */}
        <div>
          <label
            htmlFor="resume_url"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Upload resume_url <span className="text-red-500">*</span>
          </label>
          <div
            className={`border-2 border-dashed ${
              errors.resume_url ? "border-red-500" : "border-gray-300"
            } rounded-md p-6 text-center`}
          >
            <label htmlFor="resume_url" className="cursor-pointer">
              <div className="flex flex-col items-center justify-center space-y-2">
                <FiUpload className="text-gray-400 text-2xl" />
                <p className="text-sm text-gray-600">
                  {formData.resume_url ? (
                    <span className="font-medium text-blue-600">
                      {formData.resume_url.name}
                    </span>
                  ) : (
                    <>
                      <span className="font-medium text-blue-600">
                        Click to upload
                      </span>{" "}
                      or drag and drop
                    </>
                  )}
                </p>
                <p className="text-xs text-gray-500">
                  PDF, DOC, DOCX (Max. 5MB)
                </p>
              </div>
              <input
                type="file"
                id="resume_url"
                name="resume_url"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
                
              />
            </label>
          </div>
          {errors.resume_url && (
            <p className="mt-1 text-sm text-red-600">{errors.resume_url}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default JobApplyForm;
