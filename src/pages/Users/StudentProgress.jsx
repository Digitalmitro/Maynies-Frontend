import React, { useEffect, useState } from "react";

const StudentProgress = () => {
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true); // ⬅️ loading state

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_API}/api/student/progress`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProgressData(data?.data);
        console.log("Progress data fetched successfully:", data?.data);
      } catch (error) {
        console.error("Failed to fetch progress data:", error);
      } finally {
        setLoading(false); // ⬅️ set loading to false when done
      }
    };
    fetchProgressData();
  }, []);

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
        Student Progress
      </h1>
      <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-6">
        Progress Overview
      </h2>

      {loading ? (
        <div className="text-center text-gray-500 py-20">Loading progress data...</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-orange-400 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  GPA
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Progress
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {progressData.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item?.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item?.grade}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item?.gpa}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-orange-400 h-2.5 rounded-full"
                        style={{
                          width: `${(item?.gpa / 5) * 100}%`,
                          transition: "width 0.5s ease-in-out",
                        }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentProgress;
