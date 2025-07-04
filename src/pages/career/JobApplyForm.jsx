import React, { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

const JobApplyForm = () => {
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeUrl, setResumeUrl] = useState("");
  const navigate=useNavigate();
  const location = useLocation();
  const jobId = location.state?.job;


  // ✅ Handle resume file upload
  const handleResumeChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setResumeFile(file);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/api/upload/student_resume`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );
      if (!res.ok) throw new Error("Resume upload failed");
      const data = await res.json();

      console.log("Uploaded Resume URL:", data.file_url);
      setResumeUrl(data.file_url);
    } catch (err) {
      console.error("Error uploading resume:", err);
      alert("Failed to upload resume. Try again.");
    }
  };

  // ✅ Handle form submit
  const handleSubmit = async () => {
    if (!resumeUrl || !coverLetter) {
      alert("Please upload your resume and fill out the cover letter.");
      return;
    }

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
            cover_letter: coverLetter,
            resume_url: resumeUrl,
          }),
        }
      );

      if (!res.ok) throw new Error("Application submission failed");
      const data = await res.json();
      console.log("Application submitted:", data);
      alert("Application submitted successfully!");
      navigate("/jobs ");
    } catch (err) {
      console.error("Error submitting application:", err);
      alert("Failed to submit application. Try again.");
    }

    console.log(resumeUrl, coverLetter);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-3xl space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Apply for this Job
        </h2>

        {/* Cover Letter */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Cover Letter
          </label>
          <textarea
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            placeholder="Write your cover letter here..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-blue-100"
            rows={6}
          />
        </div>

        {/* Resume Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-800">
            Upload Resume
          </label>
          <div className="relative border-2 border-dashed border-green-300 rounded-xl p-6 text-center cursor-pointer hover:bg-green-50 transition">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <FiUploadCloud className="mx-auto text-4xl text-green-500" />
            <p className="text-sm text-gray-600 mt-2">
              {resumeFile ? resumeFile.name : "Click to upload your Resume"}
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
            onClick={handleSubmit}
          >
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobApplyForm;
