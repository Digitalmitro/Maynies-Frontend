import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function SuccessPage() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();
  const retryCount = useRef(0);
  const MAX_RETRIES = 3;

  const verifyPayment = () => {
    if (!sessionId) {
      setStatus("failed");
      return;
    }

    fetch(`${import.meta.env.VITE_BACKEND_API}/api/payment/confirm-session?session_id=${sessionId}`, {
      credentials: "include",
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setStatus("success");
          setTimeout(() => navigate("/", { replace: true }), 2000);
        } else if (retryCount.current < MAX_RETRIES) {
          setStatus("verifying");
          retryCount.current += 1;
          setTimeout(verifyPayment, 2000); // Retry after 2s
        } else {
          setStatus("pending");
        }
      })
      .catch(() => setStatus("failed"));
  };

  useEffect(() => {
    verifyPayment();
  }, [sessionId]);

  // UI Rendering
  if (status === "loading") return <div>⏳ Loading your payment session…</div>;
  if (status === "verifying") return <div>🔄 Verifying payment… Please wait.</div>;
  if (status === "pending")
    return (
      <div>
        ⚠️ Payment still pending. This might take a few minutes.
        <br />
        <button onClick={verifyPayment}>🔁 Retry Now</button>
        <br />
        <a href="/contact">📞 Contact Support</a>
      </div>
    );
  if (status === "failed")
    return (
      <div>
        ❌ Oops! Payment session not found or something went wrong.
        <br />
        <button onClick={() => navigate("/", { replace: true })}>🏠 Go Home</button>
      </div>
    );
  return <div>✅ Payment successful! Redirecting to home…</div>;
}
