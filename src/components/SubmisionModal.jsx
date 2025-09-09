import { useEffect, useState } from "react";

function SubmissionModal({ id, mode, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formValues, setFormValues] = useState({});
  const [newFiles, setNewFiles] = useState({}); // Changed to object to track files by field name
  // const []

  useEffect(() => {
    if (!id) return
    setLoading(true)

    fetch(`${import.meta.env.VITE_BACKEND_API}/api/employer/form/submission/${id}`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((resData) => {
        setData(resData.submission)
        const cleanedData = {}
        const originalData = resData.submission?.data || {}

        Object.keys(originalData).forEach((key) => {
          const value = originalData[key]
          // Only include primitive values (string, number, boolean) that can be handled by form inputs
          if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
            cleanedData[key] = value
          }
          // Skip objects and arrays that would become "[object Object]"
        })

        setFormValues(cleanedData)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false); onClose()
      })
  }, [id, onClose])

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Loading submission data...</p>
        </div>
      </div>
    )
  }

  if (!data) {
    onClose()
    return null
  }

  const { formTemplateId, attachments } = {
    formTemplateId: data.formTemplateId,
    attachments: data.attachments || [],
  };

  const isView = mode === "View";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataFile = new FormData();
    formDataFile.append("file", file);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/api/upload/form_receipt`,
        {
          method: "POST",
          body: formDataFile,
          credentials: "include",
        }
      );

      const data = await res.json();
      if (data.file_url) {
        setNewFiles((prev) => ({
          ...prev,
          [fieldName]: {
            name: file.name,
            url: `${import.meta.env.VITE_BACKEND_API}${data.file_url}`,
          },
        }));
      }
    } catch (err) {
      console.error("Upload failed", err);
      alert("File upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Prepare updated attachments - keep original ones unless replaced
      const updatedAttachments = attachments.map((attachment) => {
        // If we have a new file for this field, use it instead
        if (newFiles[attachment.field]) {
          return {
            field: attachment.field,
            name: newFiles[attachment.field].name,
            url: newFiles[attachment.field].url,
          }
        }
        return attachment
      })

      // Add any new files for fields that didn't have attachments before
      Object.keys(newFiles).forEach((fieldName) => {
        if (!updatedAttachments.some((a) => a.field === fieldName)) {
          updatedAttachments.push({
            field: fieldName,
            name: newFiles[fieldName].name,
            url: newFiles[fieldName].url,
          })
        }
      })

      const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/employer/form/form-template/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: formValues, // Now only contains clean form data without objects
          attachments: updatedAttachments,
        }),
      })

      if (!res.ok) throw new Error("Failed to update submission")
      onClose() // Close modal on success
    } catch (err) {
      console.error(err)
      alert("Error updating submission")
    }
  }

  const renderField = (field) => {
    const value = formValues[field.name] || ""
    const currentFile = attachments.find((a) => a.field === field.name)
    const hasNewFile = newFiles[field.name]

    switch (field.type) {
      case "text":
      case "number":
      case "date":
        return (
          <input
            type={field.type}
            name={field.name}
            value={value}
            onChange={handleChange}
            disabled={isView}
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              isView ? "bg-gray-100 cursor-not-allowed" : "bg-white"
            }`}
          />
        )

      case "textarea":
        return (
          <textarea
            name={field.name}
            value={value}
            onChange={handleChange}
            disabled={isView}
            rows={4}
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              isView ? "bg-gray-100 cursor-not-allowed" : "bg-white"
            }`}
          />
        )

      case "dropdown":
        return (
          <select
            name={field.name}
            value={value}
            onChange={handleChange}
            disabled={isView}
            className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              isView ? "bg-gray-100 cursor-not-allowed" : "bg-white"
            }`}
          >
            <option value="">Select an option</option>
            {field.options.map((opt) => (
              <option key={opt._id} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )

      case "file":
        if (isView) {
          return currentFile ? (
            <a
              href={currentFile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              {currentFile.name}
            </a>
          ) : (
            <span className="text-gray-500 italic">No file uploaded</span>
          )
        }

        return (
          <div className="space-y-2">
            {currentFile && !hasNewFile && (
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-2">Current:</span>
                <a
                  href={currentFile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {currentFile.name}
                </a>
              </div>
            )}
            {hasNewFile && (
              <div className="flex items-center text-sm text-green-600">
                <span className="mr-2">New:</span>
                {newFiles[field.name].name}
              </div>
            )}
            <label className="flex flex-col items-center px-4 py-2 bg-white text-blue-600 rounded-lg border border-blue-600 cursor-pointer hover:bg-blue-50 transition-colors">
              <span className="text-sm">Choose File</span>
              <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, field.name)} />
            </label>
          </div>
        )

      default:
        return <span className="text-red-500">Unknown field type</span>
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
    <div className="bg-white w-full max-w-2xl mx-auto rounded-xl shadow-2xl overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">{isView ? "View Submission" : "Edit Submission"}</h2>
        <button
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          onClick={onClose}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 max-h-[70vh] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formTemplateId?.fields?.map((field) => (
            <div key={field._id} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              {renderField(field)}
            </div>
          ))}
        </div>

        {!isView && (
          <div className="flex justify-end mt-8 space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  </div>
  );
}

export default SubmissionModal;
