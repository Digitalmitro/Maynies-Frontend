import React from "react";

const StudentProgress = () => {
  const progressData = [
    { course: "Mathematics", grade: "A", gpa: 4.0 },
    { course: "Physics", grade: "B+", gpa: 3.6 },
    { course: "Chemistry", grade: "A-", gpa: 3.7 },
    { course: "History", grade: "B", gpa: 3.0 },
    { course: "Biology", grade: "A", gpa: 3.9 },
    { course: "Computer Science", grade: "A+", gpa: 4.0 },
    { course: "English", grade: "B+", gpa: 3.6 },
    { course: "Economics", grade: "A", gpa: 3.8 },
    { course: "Geography", grade: "B", gpa: 3.2 },
    { course: "Philosophy", grade: "A-", gpa: 3.7 },
  ];

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Student Progress</h1>
      <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-6">Progress Overview</h2>
      
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-orange-400 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Course</th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Grade</th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">GPA</th>
              <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Progress</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {progressData.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.course}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.grade}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.gpa}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-orange-400 h-2.5 rounded-full" 
                      style={{ width: `${(item.gpa / 4) * 100}%` }}
                    ></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <button className="px-6 py-1 border border-orange-600  rounded  transition-colors">
          Download Report
        </button>
      </div>
    </div>
  );
};

export default StudentProgress;