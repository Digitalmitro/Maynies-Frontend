import { motion } from "framer-motion";
import banner from "../../assets/about/about-banner.png";
import { useState } from "react";
import { FiUploadCloud, FiX } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
function Portalpage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [uploadedFile, setUploadedFile] = useState(null);
  const [filePreviewURL, setFilePreviewURL] = useState(null);

  const onFileSelect = (e) => {
    const chosenFile = e.target.files[0];
    if (!chosenFile) return;
    setUploadedFile(chosenFile);

    const fileReader = new FileReader();
    fileReader.onloadend = () => setFilePreviewURL(fileReader.result);
    fileReader.readAsDataURL(chosenFile);
  };

  const clearFile = () => {
    setUploadedFile(null);
    setFilePreviewURL(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreview(null);
  };

  return (
    <div>
      <div className="relative w-full">
        <motion.img
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1 }}
          src={banner}
          alt=""
          className="w-full h-auto brightness-75"
        />
        <div className="absolute inset-0 bg-white/50 z-10" />
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false, amount: 0.5 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                font-semibold text-[40px] z-20 text-center"
        >
          Employee Portal
        </motion.h2>
      </div>

      <motion.div
        className="lg:px-20 px-4 py-15"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.4 }}
      >
        <div className="flex justify-end gap-4 ">
          <button className="bg-[#D9D9D9] rounded px-4 py-1 font-semibold  mt-4">
            Delete
          </button>
          <button className="bg-[#FE9900] rounded px-4 font-semibold py-1 text-white mt-4">
            Save
          </button>
        </div>
        <div>
          {/* First Row */}
          <div
            className="flex justify-between w-full pt-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <input
              type="text"
              placeholder="First Name"
              className="outline-1 outline-gray-500 px-4 w-[45%] py-2 rounded"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="outline-1 outline-gray-500 px-4 w-[45%] py-2 rounded"
            />
          </div>

          <div className="flex justify-between w-full pt-4">
            <input
              type="text"
              placeholder="Phone"
              className="outline-1 outline-gray-500 px-4 w-full py-2 rounded"
            />
          </div>
          <div
            className="flex justify-between w-full pt-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <input
              type="text"
              placeholder="Email"
              className="outline-1 outline-gray-500 px-4 w-full py-2 rounded"
            />
          </div>

          {/* Textarea */}
          <div
            className="flex justify-between w-full pt-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <textarea
              rows={6}
              placeholder="Address"
              className="outline-1 outline-gray-500 px-4 w-full py-2 rounded"
            />
          </div>
          <div
            className="flex justify-between w-full pt-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <input
              type="text"
              placeholder="Bank Account Number"
              className="outline-1 outline-gray-500 px-4 w-full py-2 rounded"
            />
          </div>
          <div
            className="flex justify-between w-full pt-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <input
              type="text"
              placeholder="Sort Code"
              className="outline-1 outline-gray-500 px-4 w-full py-2 rounded"
            />
          </div>
          <div
            className="flex justify-between w-full pt-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <input
              type="text"
              placeholder="Social Security"
              className="outline-1 outline-gray-500 px-4 w-full py-2 rounded"
            />
          </div>
          <div
            className="w-full pt-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {preview && (
              <div className="relative border border-gray-300 rounded-md p-4 flex flex-col items-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-full mb-2"
                />
                <p className="text-sm text-gray-600">{selectedFile.name}</p>
                <button
                  onClick={handleRemove}
                  className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
                >
                  <FiX size={18} />
                </button>
              </div>
            )}

            {!preview && (
              <label
                htmlFor="photo-upload"
                className="border  p-6 rounded-md flex flex-col items-center cursor-pointer text-gray-500 "
              >
                {/* <FiUploadCloud size={40} /> */}
                {/* <p className="mt-2">Drag and drop your file</p>
                 */}
                <div className="flex flex-col justify-center space-y-2 items-center py-6">
                  <FaUserCircle size={60} color="#FE9900" />
                  <p className="text-sm text-green-600">
                    Select a photo to upload
                  </p>
                </div>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            )}
          </div>
          <div
            className="w-full pt-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {filePreviewURL && uploadedFile?.type?.startsWith("image/") ? (
              <div className="relative border border-gray-300 rounded-md p-4 flex flex-col items-center">
                <img
                  src={filePreviewURL}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-full mb-2"
                />
                <p className="text-sm text-gray-600">{uploadedFile.name}</p>
                <button
                  onClick={clearFile}
                  className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
                >
                  <FiX size={18} />
                </button>
              </div>
            ) : uploadedFile ? (
              <div className="relative border border-gray-300 rounded-md p-4 flex flex-col items-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                  <FiUploadCloud size={32} />
                </div>
                <p className="text-sm text-gray-600">{uploadedFile.name}</p>
                <button
                  onClick={clearFile}
                  className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
                >
                  <FiX size={18} />
                </button>
              </div>
            ) : (
              <label
                htmlFor="file-upload"
                className="border border-dashed space-y-2 border-gray-400 p-6 rounded-md flex flex-col items-center cursor-pointer text-gray-500 "
              >
                <FiUploadCloud size={40} />
                <p className="mt-2 font-bold text-black">
                  Drag and drop your file
                </p>
                <p className="text-sm text-green-600">
                  Select a file to upload
                </p>
                <p className="text-sm">from your computer</p>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={onFileSelect}
                />
              </label>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Portalpage;
