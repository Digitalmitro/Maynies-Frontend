import { FaBell, FaFileAlt, FaDownload, FaUser } from "react-icons/fa";

const EmployeeProfile = () => {
  return (
    <div className="bg-white p-6 max-w-4xl mx-auto rounded-xl shadow-lg relative">
      {/* Notification Icon */}
      <div className="absolute top-4 right-4 text-orange-500">
        <FaBell />
      </div>

      {/* Profile */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-6">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div className="text-center sm:text-left">
          <h2 className="text-lg font-semibold">Employee Name</h2>
          <p className="text-sm text-gray-600 max-w-md">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout...
          </p>
        </div>
      </div>

      {/* Personal Information */}
      <div className="mb-6">
        <h3 className="font-semibold text-md mb-2">Personal Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            "ID",
            "First Name",
            "Last Name",
            "Designation",
            "Date of Joining",
            "Mobile Number",
            "Work Number",
            "Location",
          ].map((label, idx) => (
            <div key={idx}>
              <label className="block text-sm text-gray-600 mb-1">{label}</label>
              <input type="text" className="w-full bg-gray-100 rounded-md h-8 outline-blue-100 px-4" />
              
            </div>
          ))}
        </div>
      </div>

      {/* Documents */}
      <div className="mb-6">
        <h3 className="font-semibold text-md mb-2">Document Submitted</h3>

        <div className="flex flex-col gap-2">
          {[
            { name: "DOC 1", active: true },
            { name: "DOC 2" },
            { name: "DOC 3" },
          ].map((doc, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between p-2 rounded-md ${
                doc.active ? "bg-orange-500 text-white" : "bg-gray-200"
              }`}
            >
              <span>{doc.name}</span>
              <div className="flex items-center gap-2">
                <FaFileAlt />
                {!doc.active && <FaDownload />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Button */}
      <div className="text-center">
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm">
          Explore More Files
        </button>
      </div>
    </div>
  );
};

export default EmployeeProfile;
