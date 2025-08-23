import React, { useState, useEffect } from "react";

function StudentDemographic() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    birthDate: "",
    country: "",
    mothers_name: "",
    gender: "",
    race: "",
    state: "",
    city: "",
    avatarUrl: "",
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchDemographics = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_API}/api/student/demographics`,
          {
            credentials: "include",
          }
        );
        if (!res.ok) throw new Error("Failed to fetch demographics");
  
        const data = await res.json();
        setFormData(data?.data);
        console.log(data?.data)
        const avatarUrl = data?.data?.avatar_url;
        
        setPreview(
          avatarUrl 
            ? avatarUrl.startsWith('http') 
              ? avatarUrl 
              : `${import.meta.env.VITE_BACKEND_API}${avatarUrl}`
            : null
        );
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
  
    fetchDemographics();
  }, []);

  const handleImageUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
  
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/api/upload/student_profile`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );
  
      if (!res.ok) throw new Error("Image upload failed");
  
      const data = await res.json();
      console.log("Image uploaded:", data?.file_url);
      
      // Construct full URL by combining base URL and file_url
      const fullImageUrl = `${import.meta.env.VITE_BACKEND_API}${data.file_url}`;
      console.log("Image uploaded:", fullImageUrl);
      return fullImageUrl;
      
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image");
      return null;
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const preparePayload = (data) => ({
      firstName: data.first_name,
      lastName: data.last_name,
      birthDate: data.birthDate,
      country: data.country,
      mothers_name: data.mothers_name,
      gender: data.gender,
      race: data.race,
      state: data.state,
      city: data.city,
      avatarUrl: data.avatarUrl,
    });

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/api/student/demographics`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(preparePayload(formData)),
        }
      );

      if (!res.ok) throw new Error("Failed to update profile");

      const data = await res.json();
      console.log("Updated:", data);
      alert("Profile updated successfully");
    } catch (err) {
      console.error("PATCH error:", err);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="mx-auto md:p-6 p-1 bg-white rounded-lg">
      {/* File Upload Section */}
      <div className="flex items-center space-x-4">
        <div className="w-14 h-14 bg-gray-100 rounded-full overflow-hidden flex items-center justify-center">
          {preview ? (
            <img
              src={preview}
              alt="Avatar"
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-2xl">👤</span>
          )}
        </div>
        <div>
          <label className="text-gray-600 cursor-pointer">
            Drop your file here or{" "}
            <span className="text-green-600 font-medium underline">
              Select a file
            </span>
            <input
              type="file"
              accept="image/jpeg, image/jpg, image/png"
              onChange={async (e) => {
                const file = e.target.files[0];
                if (file && file.size <= 3 * 1024 * 1024 && /image\/(jpeg|png|jpg)/.test(file.type)) {
                  // Create preview
                  const reader = new FileReader();
                  reader.onloadend = () => setPreview(reader.result);
                  reader.readAsDataURL(file);
                  
                  // Upload image and update form data with full URL
                  const imageUrl = await handleImageUpload(file);
                  if (imageUrl) {
                    setFormData(prev => ({
                      ...prev,
                      avatarUrl: imageUrl
                    }));
                  }
                } else {
                  alert("Only JPG, JPEG & PNG under 3MB allowed.");
                }
              }}
              className="hidden"
            />
          </label>
          <p className="text-xs text-gray-400">
            Only jpg, jpeg & png are allowed up to 3MB in size.
          </p>
        </div>
      </div>

      {/* Form Title */}
      <h2 className="text-xl font-semibold mt-10 text-gray-800 mb-4">
        Personal Data
      </h2>
      <p className="text-sm text-gray-600 mb-6">Fields with * are mandatory.</p>

      {/* Form Fields */}
      <form
        onSubmit={handleSubmit}
        className=" space-y-6 mx-auto md:p-6 p-2 bg-white rounded-lg"
      >
        {/* Full Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={(e) => handleChange("first_name", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md "
              placeholder="Enter your first name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name *
            </label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={(e) => handleChange("last_name", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md "
              placeholder="Enter your last name"
            />
          </div>
        </div>

        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Birthdate *
            </label>
            <input
              type="date"
              value={formData.birthDate}
              onChange={(e) => handleChange("birthDate", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md "
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country *
            </label>
            <select
              value={formData.country}
              onChange={(e) => handleChange("country", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md "
            >
              <option value="">Select country</option>
              <option value="India">India</option>
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
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
            value={formData.mothers_name}
            onChange={(e) => handleChange("mothers_name", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md "
            placeholder="Enter mother's name"
          />
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender *
            </label>
            <select
              value={formData.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md "
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color or Race *
            </label>
            <input
              type="text"
              value={formData.race}
              onChange={(e) => handleChange("race", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md "
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
              value={formData?.address?.state}
              onChange={(e) => handleChange("state", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md "
              placeholder="Enter state"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City *
            </label>
            <input
              type="text"
              value={formData?.address?.city}
              onChange={(e) => handleChange("city", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md "
              placeholder="Enter city"
            />
          </div>
        </div>

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

export default StudentDemographic;
