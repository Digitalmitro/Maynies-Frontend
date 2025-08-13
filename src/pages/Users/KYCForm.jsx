import { useState } from "react";
import { useNavigate } from "react-router-dom";
const KYCForm = () => {
  const [formData, setFormData] = useState({
    amount: "",
    durationMonths: "",
    reason: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API}/api/employer/loan`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            amount: Number(formData.amount),
            durationMonths: Number(formData.durationMonths),
            reason: formData.reason,
          }),
        }
      );
      if (!response.ok) throw new Error("Submission failed");
      alert("Loan application submitted successfully!");
      setFormData({ amount: "", durationMonths: "", reason: "" });
    } catch (err) {
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white text-[#101C26] p-6  mt-4">
      <h2 className="text-2xl font-semibold text-amber-600 mb-6 text-center">
        Loan Request KYC Form
      </h2>
      <div className="mb-6 text-right">
        <button
          type="button"
          onClick={() => navigate("/dashboard/my-loans")}
          className="bg-orange-100 text-amber-700 px-4 py-2 rounded-full font-medium hover:bg-orange-200 transition"
        >
          📄 View My Loans
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Loan Amount (₹)
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Duration (in Months)
          </label>
          <input
            type="number"
            name="durationMonths"
            value={formData.durationMonths}
            onChange={handleChange}
            placeholder="Enter duration"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>

        {/* Reason */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Purpose / Reason
          </label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            rows={4}
            placeholder="Tell us why you need this loan..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md font-medium text-white transition ${
            loading
              ? "bg-orange-300 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-amber-600 rounded-full animate-spin"></div>
              Submitting...
            </div>
          ) : (
            "Submit Application"
          )}
        </button>
      </form>
    </div>
  );
};

export default KYCForm;
