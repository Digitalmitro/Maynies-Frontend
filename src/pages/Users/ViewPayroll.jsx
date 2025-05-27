function ViewPayroll() {
  return (
    <div className=" min-h-screen flex items-center justify-center p-4">
      <div className="bg-white  md:p-10 rounded-lg w-full max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Employee"
              className="rounded-full w-12 h-12"
            />
            <div>
              <p className="font-semibold text-orange-500">
                1001 Employee Name
              </p>
              <p className="text-gray-500 text-sm">Director</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="bg-gray-200 px-2 py-1 rounded">&lt;</button>
            <button className="bg-green-500 text-white px-2 py-1 rounded">
              &gt;
            </button>
          </div>
        </div>

        <hr className="mb-6" />

        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-orange-100 p-4 rounded text-center">
            <p className="text-xl font-semibold">50,000</p>
            <p className="text-gray-600 text-sm">Total Earning</p>
          </div>
          <div className="bg-gray-100 p-4 rounded text-center">
            <p className="text-xl font-semibold">5,000</p>
            <p className="text-gray-600 text-sm">Total Deduction</p>
          </div>
          <div className="bg-gray-100 p-4 rounded text-center">
            <p className="text-xl font-semibold">45,000</p>
            <p className="text-gray-600 text-sm">Netpay (Rounded)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-100 p-4 rounded text-center">
            <p className="text-xl font-semibold">May 2024</p>
            <p className="text-gray-600 text-sm">Period Name</p>
          </div>
          <div className="bg-gray-100 p-4 rounded text-center">
            <p className="text-xl font-semibold">May 10, 2024</p>
            <p className="text-gray-600 text-sm">Pay Date</p>
          </div>
          <div className="bg-gray-100 p-4 rounded text-center">
            <p className="text-xl font-semibold">45,000</p>
            <p className="text-gray-600 text-sm">Currency Name</p>
          </div>
        </div>

        {/* Table */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-lg mb-2">Earnings</h3>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Basic Pay</span>
                <span>16,666.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Dearness Allowance</span>
                <span>16,666.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>House Rent Allowance</span>
                <span>16,667.00</span>
              </div>
              <div className="flex justify-between font-medium mt-2">
                <span>Total Earnings</span>
                <span>50,000.00</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Deductions</h3>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Professional Tax</span>
                <span>5.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Provident Fund</span>
                <span>3,000.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Other Deduction</span>
                <span>1,995.00</span>
              </div>
              <div className="flex justify-between font-medium mt-2">
                <span>Total Deductions</span>
                <span>5,000.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Netpay */}
        <div className="text-right mt-6 font-semibold">Netpay: 45,000</div>
      </div>
    </div>
  );
}

export default ViewPayroll;
