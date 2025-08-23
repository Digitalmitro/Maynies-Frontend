import React, { useEffect, useState } from 'react';

const PaymentPlans = () => {
  const [selectedOption, setSelectedOption] = useState('One-Time');
  const [amount, setAmount] = useState('');
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [outstandingBalance, setOutstandingBalance] = useState(0);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/api/payment/history`, {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch payment history');
        }

        const data = await response.json();
        const history = data?.data || [];

        setPaymentHistory(history);

        const totalPaid = history
          .filter((item) => item.status.toLowerCase() === 'succeeded')
          .reduce((acc, item) => acc + item.amount, 0);

        const totalDue = 5000; // Set your total due here
        setOutstandingBalance(totalDue - totalPaid);
        console.log('Payment history fetched successfully:', history);
      } catch (error) {
        console.error('Error fetching payment history:', error);
      }
    };

    fetchPaymentHistory();
  }, []);

  return (
    <div className="mx-auto bg-white p-4 rounded-lg mt-6">
      <h2 className="text-center font-semibold text-lg mb-6">
        Payment & Payment Plans
      </h2>

      {/* Payment Options */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded border font-medium ${
            selectedOption === 'One-Time'
              ? 'bg-orange-500 text-white'
              : 'border-orange-500 text-orange-500'
          }`}
          onClick={() => setSelectedOption('One-Time')}
        >
          One-Time
        </button>
        <button
          className={`px-4 py-2 rounded border font-medium ${
            selectedOption === 'Installments'
              ? 'bg-orange-500 text-white'
              : 'border-orange-500 text-orange-500'
          }`}
          onClick={() => setSelectedOption('Installments')}
        >
          Installments
        </button>
      </div>

      {/* Amount Input */}
      <input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full px-3 py-2 border rounded mb-4 mt-4"
      />

      {/* Proceed Button */}
      <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded mt-4 font-medium mb-8">
        Proceed to Pay
      </button>

      {/* Payment History */}
      <div>
        <h3 className="font-medium mb-6">Payment History</h3>
        <div className="grid grid-cols-3 bg-orange-500 text-white text-sm font-semibold py-2 px-2 rounded-t">
          <div>Date</div>
          <div>Amount</div>
          <div>Status</div>
        </div>

        {paymentHistory.length === 0 ? (
          <div className="text-sm text-center py-4 text-gray-500">
            No payment history available.
          </div>
        ) : (
          paymentHistory.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-3 border-t border-gray-200 text-sm px-2 py-2"
            >
              <div>{new Date(item.date).toLocaleDateString()}</div>
              <div>₹{item.amount.toFixed(2)}</div>
              <div className={item.status === 'succeeded' ? 'text-green-600' : 'text-red-500'}>
                {item.status}
              </div>
            </div>
          ))
        )}

        <div className="text-right font-medium text-sm mt-2">
          Outstanding Balance:{' '}
          <span className="text-orange-500">₹{outstandingBalance.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentPlans;
