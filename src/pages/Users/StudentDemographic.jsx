import React from "react";

function StudentDemographic() {
  return (
    <div className=" mx-auto p-6 bg-white rounded-lg ">
      {/* File Upload Section */}
      <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">👤</span>
          </div>
          <div>
            <p className="text-gray-600">
              Drop your file here or{" "}
              <span className="text-green-600 font-medium cursor-pointer">
                Select a file
              </span>
            </p>
            <p className="text-xs text-gray-400">
              Only jpg, jpeg & png are allowed up to 3mb in size.
            </p>
          </div>
        </div>

      {/* Form Title */}
      <h2 className="text-xl font-semibold mt-10 text-gray-800 mb-4">
        Personal Data
      </h2>
      <p className="text-sm text-gray-600 mb-6">Fields with * are mandatory.</p>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your full name"
          />
        </div>

        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Birthdate *
            </label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country *
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">Select country</option>
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
              {/* Add more countries as needed */}
            </select>
          </div>
        </div>

        {/* Mother's Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mother's Name *
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter mother's name"
          />
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender *
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color or Race *
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter color or race"
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State *
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter state"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City *
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter city"
            />
          </div>
        </div>

        <div className="md:col-span-2 flex justify-end space-x-4 mt-4">
          <button
            type="button"
            className="px-6 py-2 border border-orange-400 text-orange-500 rounded-md hover:bg-orange-50"
          >
            Edit
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentDemographic;
