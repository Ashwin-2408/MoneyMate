// Dashboard.tsx
import React from 'react';

const Dashboard = () => {
  return (
    <div
      className="bg-black text-white min-h-screen p-8"
      style={{ overflow: 'hidden' }} // Hide overflow to remove the scrollbar
    >
      {/* Overview Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Overview</h1>
        <div className="grid grid-cols-3 gap-6">
          {/* Income */}
          <div className="bg-[#08080a] p-4 rounded-lg">
            <p className="text-green-500">Income</p>
            <h2 className="text-2xl font-bold">¥170</h2>
          </div>
          {/* Expense */}
          <div className="bg-[#08080a] p-4 rounded-lg">
            <p className="text-red-500">Expense</p>
            <h2 className="text-2xl font-bold">¥600</h2>
          </div>
          {/* Balance */}
          <div className="bg-[#08080a] p-4 rounded-lg">
            <p className="text-purple-500">Balance</p>
            <h2 className="text-2xl font-bold">-¥430</h2>
          </div>
        </div>
      </div>

      {/* Incomes and Expenses by Category */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Incomes by Category */}
        <div className="bg-[#08080a] p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Incomes by Category</h3>
          {/* YouTube */}
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <p>🎥 YouTube</p>
              <p>¥120 (71%)</p>
            </div>
            <div className="h-2 bg-[#0a8080a] rounded-full">
              <div className="bg-green-500 h-full rounded-full" style={{ width: '71%' }}></div>
            </div>
          </div>
          {/* Salary */}
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <p>💰 Salary</p>
              <p>¥50 (29%)</p>
            </div>
            <div className="h-2 bg-[#08080a] rounded-full">
              <div className="bg-green-500 h-full rounded-full" style={{ width: '29%' }}></div>
            </div>
          </div>
        </div>

        {/* Expenses by Category */}
        <div className="bg-[#08080a] p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Expenses by Category</h3>
          {/* Housing */}
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <p>🏠 Housing</p>
              <p>¥600 (100%)</p>
            </div>
            <div className="h-2 bg-[#08080a] rounded-full">
              <div className="bg-red-500 h-full rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="bg-[#08080a] p-4 rounded-lg">
        <h3 className="text-xl font-bold mb-4">History</h3>
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <select className="bg-[#08080a] text-white p-2 rounded-lg">
              <option>Year</option>
              <option>2024</option>
            </select>
            <select className="bg-[#08080a] text-white p-2 rounded-lg">
              <option>Month</option>
              <option>April</option>
            </select>
          </div>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <input type="radio" id="income" name="type" className="mr-2" />
              <label htmlFor="income">Income</label>
            </div>
            <div className="flex items-center">
              <input type="radio" id="expense" name="type" className="mr-2" />
              <label htmlFor="expense">Expense</label>
            </div>
          </div>
        </div>
        <div className="bg-[#08080a] h-40 text-center flex items-center justify-center">
          {/* Placeholder for Chart */}
          <p>CHART</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
