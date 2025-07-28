import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function LoanDetails() {
    const { state } = useLocation();
  const Id = state?.loanList[0]?.employeeId;
    useEffect(() => {
    const fetchLoanDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_API}/api/employer/loan/${Id}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch loan details");
        const data = await response.json();
        console.log("Fetched loan details:", data);
      } catch (error) {
        console.error("Error fetching loan details:", error);
      }
    };
    fetchLoanDetails(Id);
    }, []);
  return (
    <div>LoanDetails</div>
  )
}

export default LoanDetails