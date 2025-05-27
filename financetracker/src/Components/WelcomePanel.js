import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
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

const WelcomePanel = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center    font-inter">
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-black mb-2 text-center"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 80 }}
      >
        Save money, <br className="md:hidden" />
        without thinking about it.
      </motion.h1>

      <motion.p
        className="text-md md:text-lg text-slate-600 text-center mb-10 max-w-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        MoneyMate analyzes your spending and automatically saves the perfect amount every day,
        so you don’t have to think about it.
      </motion.p>

      <div className="w-full  h-[350px] bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-xl font-semibold mb-4 text-black">Income vs Expense Overview</h2>
        <ResponsiveContainer width="90%" height="90%">
          <LineChart data={dataWithBalance} margin={{ top: 20, right: 30, bottom: 0, left: 0 }}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              contentStyle={{ borderRadius: 10, backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}
            />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#14b8a6" // teal
              strokeWidth={3}
              dot={{ r: 4 }}
              animationDuration={800}
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#6366f1" // indigo
              strokeWidth={3}
              dot={{ r: 4 }}
              animationDuration={800}
            />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#8b5cf6" // violet
              strokeDasharray="5 5"
              strokeWidth={2}
              dot={{ r: 2 }}
              animationDuration={800}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WelcomePanel;
