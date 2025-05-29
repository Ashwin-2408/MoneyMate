import React, { useEffect, useState } from "react";
import Header from "../Component/Header";
import { Card, Modal } from "antd";
import IncomeIcon from "../assets/Income.svg";
import BalanceIcon from "../assets/Balance.svg";
import ExpenseIcon from "../assets/Expense.svg";
import PieIcon from "../assets/pie.svg";
import TransactionIcon from "../assets/Transaction.svg";
import { motion } from "framer-motion";
import Footer from "../Component/Footer";
import IncomeForm from "../Component/IncomeForm";
import ExpenseForm from "../Component/ExpenseForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

function Dashboard() {
  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const [user] = useAuthState(auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showicon, setshowicon] = useState(false);
  const [modalType, setModalType] = useState("");
  const [showexpense, setshowexpense] = useState(false);
  async function render_transaction() {
    const transactionref = collection(db, "Users", user.uid, "Transactions");
    const transactiondata = await getDocs(transactionref);
  }
  useEffect(() => {
    if (!user) {
      setshowicon(false);
      return;
    }

    const transactionRef = collection(db, "Users", user.uid, "Transactions");

    const unsubscribe = onSnapshot(transactionRef, (snapshot) => {
      if (!snapshot.empty) {
        setshowicon(true);
        let expenseFound = false;
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.type === "Expense") {
            expenseFound = true;
          }
        });
        setshowexpense(expenseFound);
      } else {
        setshowicon(false);
      }
    });

    return () => unsubscribe();
  }, [user]);

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleCancel = () => setIsModalOpen(false);

  const renderModalContent = () => {
    switch (modalType) {
      case "income":
        return <IncomeForm />;
      case "expense":
        return <ExpenseForm />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 justify-center font-inter pt-16 p-5 items-center md:items-stretch">
      <Header />

      <div className="flex flex-col items-center justify-normal md:flex-row mx-2 md:items-stretch md:justify-between gap-6 mt-5 px-4 mb-5 md:mb-0">
        <Card
          className="flex flex-col justify-between bg-white w-full max-w-[380px]"
          title="BALANCE"
          hoverable
          style={{ height: 330 }}
        >
          <img
            src={BalanceIcon}
            alt="Balance Icon"
            className="w-full h-[125px]"
          />
          <p className="text-xl m-2">₹</p>
          <button className="flex justify-center items-center w-full text-lg rounded-lg text-white bg-[#ff7bac] shadow-md mt-5 h-10 px-3">
            Reset Balance
          </button>
        </Card>

        <Card
          className="flex flex-col justify-between bg-white w-full max-w-[380px]"
          title="INCOME"
          hoverable
          style={{ height: 330 }}
        >
          <img
            src={IncomeIcon}
            alt="Income Icon"
            className="w-full h-[125px]"
          />
          <p className="text-xl m-2">₹</p>
          <button
            className="flex justify-center items-center w-full text-lg rounded-lg text-white bg-[#ff7bac] shadow-md mt-5 h-10 px-3"
            onClick={() => openModal("income")}
          >
            Add Income
          </button>
        </Card>

        <Card
          className="flex flex-col justify-between bg-white w-full max-w-[380px]"
          title="EXPENSE"
          hoverable
          style={{ height: 330 }}
        >
          <img
            src={ExpenseIcon}
            alt="Expense Icon"
            className="w-full h-[125px]"
          />
          <p className="text-xl m-2">₹</p>
          <button
            className="flex justify-center items-center w-full text-lg rounded-lg text-white bg-[#ff7bac] shadow-md mt-5 h-10 px-3"
            onClick={() => openModal("expense")}
          >
            Add Expense
          </button>
        </Card>
      </div>

      {showicon ? (
        <div className="flex flex-col-reverse w-full md:space-y-0 gap-6 items-center h-96 justify-normal md:flex-row mx-4 md:items-stretch md:justify-between mt-16 md:mt-8 px-4">
          {/* Left Section */}
          <div className="w-full flex flex-col md:w-[70%] bg-white rounded-md p-4 mx-4">
            <h1>Financial Statistics</h1>
          </div>

          {/* Right Section */}
          {showexpense ? (
            <div className="flex mx-4 mt-10  md:mt-0 w-full md:w-[30%] justify-center items-center">
              <Card
                className="flex flex-col  bg-white w-full max-w-[380px] flex-grow justify-center items-center"
                title="Your Spending"
                hoverable
                style={{ height: 370 }}
              >
                <PieChart
                  width={250}
                  height={250}
                
                >
                  <Pie
                   
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label="hi"
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  
                </PieChart>
              </Card>
            </div>
          ) : (
            <div className="flex mx-4 px-4 w-full md:w-[30%] justify-center items-center">
              <Card
                className="flex flex-col  justify-center items-center bg-white w-full max-w-[380px] flex-grow text-center"
                title="You haven't spent anything yet"
                hoverable
                style={{ height: 350 }}
              >
                <img
                  src={PieIcon}
                  alt="Income Icon"
                  className="w-full h-[190px] "
                />
              </Card>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-7 mx-4 p-5 shadow-md rounded-md bg-white mb-3">
          <img
            src={TransactionIcon}
            alt="transaction Icon"
            className="h-[30%] w-[30%] max-w-xs"
          />
          <motion.p
            className="text-sm sm:text-base md:text-lg text-slate-600 text-center mb-8 sm:mb-10 max-w-2xl px-2 mt-5 ml-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            You have no Transactions currently.
          </motion.p>
        </div>
      )}

      <Modal
        title={
          <span style={{ color: "#ff7bac" }}>
            {modalType === "income" ? "Add Income" : "Add Expense"}
          </span>
        }
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
        closable
      >
        {renderModalContent()}
      </Modal>

      <Footer />
    </div>
  );
}

export default Dashboard;
