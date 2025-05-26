import { FaBell, FaInfoCircle } from "react-icons/fa";

const KYCForm = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl relative">
      {/* Bell Icon */}
      <div className="absolute top-4 right-4 text-orange-500">
        <FaBell />
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h2 className="text-center font-semibold text-lg mb-2">Price Range</h2>
        <div className="flex justify-between text-sm text-gray-600 px-2 mb-1">
          <span>$500</span>
          <span>$25000</span>
          <span>$50000</span>
        </div>
        <input
          type="range"
          min={500}
          max={50000}
          defaultValue={25000}
          className="w-full accent-orange-500"
        />
        <div className="text-center mt-2">
          <span className="font-medium">Amount</span>{" "}
          <input
            type="text"
            value="$25000"
            readOnly
            className="border rounded-md px-2 py-1 w-32 text-center"
          />
        </div>
      </div>

      {/* Personal Info */}
      <div className="mb-6">
        <h3 className="font-semibold text-md mb-2">Personal Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input placeholder="Name" className="bg-gray-100 p-2 rounded" />
          <input placeholder="Surname" className="bg-gray-100 p-2 rounded col-span-2 sm:col-span-1" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <input placeholder="ID/Password Number" className="bg-gray-100 p-2 rounded" />
          <div className="flex gap-4">
            <input placeholder="Email" className="bg-gray-100 p-2 rounded flex-1" />
            <input placeholder="DOB" className="bg-gray-100 p-2 rounded w-1/2" />
          </div>
          <input placeholder="Phone" className="bg-gray-100 p-2 rounded" />
        </div>
        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
          <FaInfoCircle className="text-blue-500" /> Your email will be used for the app’s login.
        </p>
      </div>

      {/* KYC Details */}
      <div className="mb-6">
        <h3 className="font-semibold text-md mb-2">KYC Details</h3>
        <p className="text-sm text-gray-600 mb-4">
          Enter your details as they appear on your identification document.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input placeholder="Full Name" className="bg-gray-100 p-2 rounded" />
          <input placeholder="Phone No." className="bg-gray-100 p-2 rounded" />
          <input placeholder="Nation" className="bg-gray-100 p-2 rounded" />
          <input placeholder="Aadhar No." className="bg-gray-100 p-2 rounded" />
          <input placeholder="Tin Number" className="bg-gray-100 p-2 rounded" />
          <input placeholder="Address" className="bg-gray-100 p-2 rounded" />
          <input placeholder="Postal Code" className="bg-gray-100 p-2 rounded" />
          <input placeholder="City" className="bg-gray-100 p-2 rounded" />
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-500 mb-2">
          Trodion gives you 100% insurance...{" "}
          <span className="text-orange-500 underline cursor-pointer">See why it benefits?</span>
        </p>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md">
          Submit
        </button>
      </div>
    </div>
  );
};

export default KYCForm;
