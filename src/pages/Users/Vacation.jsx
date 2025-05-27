import React from "react";
import { FaBell, FaCalendarAlt } from "react-icons/fa";

function Vacation() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-6 relative">
      {/* Notification Icon */}
      <div className="absolute top-4 right-4 text-orange-500 text-xl">
        <FaBell />
      </div>

      {/* Card Container */}
      <div className="bg-white  rounded-xl w-full max-w-md p-6">
        <h2 className="text-center text-lg font-semibold mb-6">
          Leave Request
        </h2>

        {/* Leave Type Dropdown */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Leave Type</label>
          <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option>Annual Leave</option>
            <option>Privilege Leave</option>
            <option>Sick Leave</option>
            <option>Casual Leave</option>
          </select>
        </div>

        {/* Remember me */}
        <div className="mb-4 flex items-center gap-2 text-xs text-gray-800 font-semibold">
          <input type="checkbox" />
          <label htmlFor="">Remember me</label>
        </div>

        {/* Dates Field */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Dates</label>
          <div className="relative">
            <input
              type="date"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm pr-10 focus:outline-none"
            />
            
          </div>
        </div>

        {/* About Field */}
        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium">About</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none"
            placeholder="Optional"
          />
        </div>

        {/* Leave Summary Box */}
        <div className="border border-gray-300 rounded p-4 text-sm mb-6">
          <p className="font-medium mb-2">Your Available Leaves</p>
          <div className="flex justify-between">
            <div>
              <p>
                <strong>PL</strong> Privilege Leave
              </p>
              <p>
                <strong>SL</strong> Sick Leave
              </p>
              <p>
                <strong>CL</strong> Casual Leave
              </p>
              <p>
                <strong>ML</strong> Maternity Leave
              </p>
            </div>
            <div className="text-right">
              <p>15</p>
              <p>18</p>
              <p>01</p>
              <p className="text-gray-400">N/A</p>
            </div>
          </div>
          <hr className="my-2" />
          <p className="font-semibold">34 Days of Annual Leave</p>
          <p className="text-sm text-gray-600">9 Days Remaining</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 text-sm w-full">
            Submit
          </button>
          <button className="bg-gray-300 text-black px-6 py-2 rounded hover:bg-gray-400 text-sm w-full">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Vacation;
