import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { motion } from 'framer-motion';

const sampleData = [
  { month: 'Jan', income: 2200, expense: 900 },
  { month: 'Feb', income: 2400, expense: 1100 },
  { month: 'Mar', income: 2000, expense: 1200 },
  { month: 'Apr', income: 2800, expense: 1500 },
  { month: 'May', income: 3000, expense: 1400 },
];

const dataWithBalance = sampleData.map(item => ({
  ...item,
  balance: item.income - item.expense,
}));

const pieData = [
  { name: 'Income', value: sampleData.reduce((acc, cur) => acc + cur.income, 0) },
  { name: 'Expense', value: sampleData.reduce((acc, cur) => acc + cur.expense, 0) },
];

const COLORS = ['#14b8a6', '#6366f1'];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 640); // Tailwind 'sm' breakpoint
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isMobile;
}

const WelcomePanel = () => {
  const isMobile = useIsMobile();

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 flex flex-col justify-center items-center font-inter">
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black mb-3 text-center leading-tight"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 80 }}
      >
        Save money, <br className="md:hidden" />
        without thinking about it.
      </motion.h1>

      <motion.p
        className="text-sm sm:text-base md:text-lg text-slate-600 text-center mb-8 sm:mb-10 max-w-2xl px-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        MoneyMate analyzes your spending and automatically saves the perfect amount every day,
        so you don’t have to think about it.
      </motion.p>

      <div className="w-full max-w-4xl h-[380px] md:h-[300px] bg-white rounded-2xl shadow-xl  p-2 md:p-6">
        <h2 className="text-md md:text-xl pt-1 font-semibold mb-4 text-black">Income vs Expense Overview</h2>

        {isMobile ? (
          <ResponsiveContainer width="90%" height="90%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}  // <-- makes it a donut chart
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="90%" height="90%">
            <LineChart data={dataWithBalance} margin={{ top: 10, right: 20, bottom: 0, left: -10 }}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  borderRadius: 10,
                  backgroundColor: '#f9fafb',
                  border: '1px solid #e5e7eb',
                }}
              />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#14b8a6"
                strokeWidth={3}
                dot={{ r: 4 }}
                animationDuration={800}
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#6366f1"
                strokeWidth={3}
                dot={{ r: 4 }}
                animationDuration={800}
              />
              <Line
                type="monotone"
                dataKey="balance"
                stroke="#8b5cf6"
                strokeDasharray="5 5"
                strokeWidth={2}
                dot={{ r: 2 }}
                animationDuration={800}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default WelcomePanel;
