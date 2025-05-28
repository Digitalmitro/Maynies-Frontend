import React from "react";

function Demographics() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
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
        <span className="text-orange-500 text-2xl">🔔</span>
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold mb-1">Personal Data</h2>
      <p className="text-sm text-gray-500 mb-4">Fields with * are mandatory.</p>

      {/* Form */}
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        <input
          type="text"
          placeholder="Full Name"
          className="border rounded-md px-4 py-2 w-full outline-orange-400"
        />

       
       
          <input
            type="date"
            className="border rounded-md px-4 py-2 w-full text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
       

        <select className="border rounded-md px-4 py-2 w-full text-gray-600">
          <option>*Country</option>
        </select>

        <input
          type="text"
          placeholder="Mother's Name"
          className="border rounded-md px-4 py-2 w-full outline-orange-400"
        />

        <input
          type="text"
          placeholder="Gender"
          className="border rounded-md px-4 py-2 w-full"
        />

        <select className="border rounded-md px-4 py-2 w-full text-gray-600">
          <option>Color or Race</option>
        </select>

        <select className="border rounded-md px-4 py-2 w-full text-gray-600">
          <option>Marital Status</option>
        </select>

        <select className="border rounded-md px-4 py-2 w-full text-gray-600">
          <option>Special Needs</option>
        </select>

        <select className="border rounded-md px-4 py-2 w-full text-gray-600">
          <option>*State</option>
        </select>

        <select className="border rounded-md px-4 py-2 w-full text-gray-600">
          <option>*City</option>
        </select>

        {/* Buttons */}
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
      </form>
    </div>
  );
}

export default Demographics;
