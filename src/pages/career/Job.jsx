import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Job() {
  const [job, setJob] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state?.job;

  const fetchJobsById = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/jobs/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch job details");
      }
      const data = await response.json();
      setJob(data?.data);
      console.log("first", data?.data);
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  };

  useEffect(() => {
    fetchJobsById(id);
  }, [id]);

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8 items-center justify-evenly">
        {/* Left Box */}
        <div className="w-fit h-fit border border-green-600 rounded-md p-6 space-y-4">
          <div>
            <p className="text-sm font-semibold text-[#FE9900]">Location</p>
            <p className="text-base text-gray-800">{job?.location}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#FE9900]">Engagement</p>
            <p className="text-base text-gray-800 capitalize">
              {job?.job_type?.replace("-", " ")}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#FE9900]">Role</p>
            <p className="text-base text-gray-800 w-[200px]">{job?.title}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#FE9900]">Experience</p>
            <p className="text-base text-gray-800">{job?.experience}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#FE9900]">Openings</p>
            <p className="text-base text-gray-800">{job?.openings}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#FE9900]">Salary Range</p>
            <p className="text-base text-gray-800">
              {job?.salary_range?.min && job?.salary_range?.max
                ? `${job.salary_range.min.toLocaleString()} - ${job.salary_range.max.toLocaleString()} ${
                    job.salary_range.currency
                  }`
                : "Not specified"}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#FE9900]">Deadline</p>
            <p className="text-base text-gray-800">
              {job?.expires_at
                ? new Date(job.expires_at).toLocaleDateString()
                : "Not specified"}
            </p>
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:w-2/3 w-full space-y-6">
          <h2 className="text-green-600 font-semibold">Job Opportunities</h2>
          <h1 className="text-2xl font-bold text-gray-900">{job?.title}</h1>
          <p className="text-gray-700">{job?.short_description}</p>
          <p className="text-gray-700">{job?.description}</p>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Requirements
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2">
              {job?.requirements?.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Application Procedure
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2">
              <li>{job?.application_instructions}</li>
              {job?.attachment_url && (
                <li>
                  Download and review the job details document:{" "}
                  <a
                    href={job.attachment_url}
                    className="text-orange-600 hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Job Details PDF
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Additional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <p className="font-medium text-gray-700">Job Status:</p>
                <p className="text-gray-600">
                  {job?.is_active ? "Active" : "Inactive"}
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Posted On:</p>
                <p className="text-gray-600">
                  {job?.created_at
                    ? new Date(job.created_at).toLocaleDateString()
                    : "Not available"}
                </p>
              </div>
            </div>
          </div>

          <button
            className="bg-[#FE9900] hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded"
            onClick={() => navigate(`/apply/${job?.slug}`, { state: { job: job?._id } })}
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Job;
