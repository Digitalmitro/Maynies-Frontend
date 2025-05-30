import React from "react";
import { Upload, User, FileText, Bell } from "lucide-react";

export default function AdmissionForm() {
  return (
    <div className="w-full min-h-screen  p-4 flex justify-center items-start">
      <div className="w-full  bg-white rounded-2xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <User className="text-orange-500" />
            <div>
              <h2 className="text-xl font-semibold">Admission Form</h2>
              <p className="text-sm text-gray-500">
                Drop your file here or{" "}
                <span className="text-orange-500">browse</span>
              </p>
            </div>
          </div>
          <Bell className="text-orange-500" />
        </div>

        {/* Student Details */}
        <h3 className="text-lg font-semibold text-orange-600 mb-4">
          Student Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input type="text" placeholder="First Name" className="input-style border border-gray-300 py-2 px-4 rounded" />
          <input type="text" placeholder="Last Name" className="input-style border border-gray-300 py-2 px-4 rounded" />
          <input type="text" placeholder="Country" className="input-style border border-gray-300 py-2 px-4 rounded" />
          <input type="text" placeholder="DOB" className="input-style border border-gray-300 py-2 px-4 rounded" />
          <input type="text" placeholder="Phone No." className="input-style border border-gray-300 py-2 px-4 rounded" />
          <input type="text" placeholder="Email" className="input-style border border-gray-300 py-2 px-4 rounded" />
          <input type="text" placeholder="State" className="input-style border border-gray-300 py-2 px-4 rounded" />
          <input type="text" placeholder="City" className="input-style border border-gray-300 py-2 px-4 rounded" />
        </div>
        <textarea
          placeholder="Address"
          className="input-style w-full mb-6 border border-gray-300 py-2 px-4 rounded"
          rows={3}
        ></textarea>

        {/* Parent Details */}
        <h3 className="text-lg font-semibold text-orange-600 mb-4">
          Parent Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input type="text" placeholder="First Name" className="input-style border border-gray-300 py-2 px-4 rounded" />
          <input type="text" placeholder="Last Name" className="input-style border border-gray-300 py-2 px-4 rounded" />
          <input type="text" placeholder="Email" className="input-styl border border-gray-300 py-2 px-4 rounded" />
          <input type="text" placeholder="Phone No." className="input-style border border-gray-300 py-2 px-4 rounded" />
        </div>
        <textarea
          placeholder="Address"
          className="input-style w-full mb-6 border border-gray-300 py-2 px-4 rounded"
          rows={3}
        ></textarea>

        {/* Document Upload */}
        <h3 className="text-lg font-semibold text-orange-600 mb-4">
          Document Submitted
        </h3>
        <div className="space-y-2">
          {["DOC 1", "DOC 2", "DOC 3"].map((doc, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-xl p-2 flex items-center justify-between"
            >
              <span>{doc}</span>
              <div className="flex gap-2">
                <Upload className="text-orange-500 cursor-pointer" />
                <FileText className="text-gray-500 cursor-pointer" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <button className="border-orange-500 border hover:border-orange-600 text-orange-500 px-6 py-1 rounded">
            Explore More Files
          </button>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-6">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-1 rounded text-lg font-semibold">
            Submit
          </button>
        </div>

        {/* Footer Progress */}
        {/* <div className="flex justify-between items-center text-sm text-gray-600 mt-6">
         <input type="range" />
        </div> */}
      </div>
    </div>
  );
}
