import React from 'react';

function Job() {
  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8 items-center justify-evenly">
        {/* Left Box */}
        <div className="w-fit h-fit  border border-green-600 rounded-md p-6 space-y-4">
          <div>
            <p className="text-sm font-semibold text-[#FE9900]">Location</p>
            <p className="text-base text-gray-800">Florida</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#FE9900]">Engagement</p>
            <p className="text-base text-gray-800">Full-time</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#FE9900]">Role</p>
            <p className="text-base text-gray-800">Faculty</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#FE9900]">Deadline</p>
            <p className="text-base text-gray-800">Saturday, 31 MAY 2025</p>
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:w-2/3 w-full space-y-6">
          <h2 className="text-green-600 font-semibold">Job Opportunities</h2>
          <h1 className="text-2xl font-bold text-gray-900">Faculty Positions in History</h1>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget magna vel lorem ultrices tincidunt sed sit amet felis. Proin vel justo lorem. Quisque nec risus eget nisl efficitur tempus. Etiam in tincidunt orci.
          </p>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget purus non lorem blandit tincidunt. Integer nec tincidunt nulla. Suspendisse potenti. Vivamus fermentum vehicula lorem vel porttitor.
          </p>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">Requirements</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2">
              <li>Experience in research or one of the areas listed above</li>
              <li>Ability to mentor undergraduate students</li>
              <li>Strong communication and presentation skills</li>
              <li>Appropriate degree in a related discipline</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">Application Procedure</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 mt-2">
              <li>Email your application to <strong>facultypositions@edu.edu</strong></li>
              <li>Include a cover letter, resume, and two recommendation letters</li>
              <li>Complete the attached faculty application form</li>
              <li>Use subject line: <code>Faculty Application – History</code></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">Resources</h3>
            <a href="#" className="text-orange-600 hover:underline">📄 Information Summary Sheet</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Job;
