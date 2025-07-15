import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function SuccessPage() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionId) {
      setStatus("failed");
      return;
    }

    // Call your confirm-session endpoint
    fetch(
      `${
        import.meta.env.VITE_BACKEND_API
      }/api/payment/confirm-session?session_id=${sessionId}`,
      {
        credentials: "include",
      }
    )
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setStatus("success");
          // 2s ke baad home redirect kar do
          setTimeout(() => navigate("/", { replace: true }), 2000);
        } else {
          setStatus("pending");
        }
      })
      .catch(() => setStatus("failed"));
  }, [sessionId, navigate]);

  // Render UI based on status
  if (status === "loading") return <div>Verifying…</div>;
  if (status === "pending")
    return <div>Payment pending. Please wait—or contact support.</div>;
  if (status === "failed")
    return <div>Oops! No session or something went wrong.</div>;

  // status === 'success'
  return <div>Payment successful! Redirecting to home…</div>;
}
