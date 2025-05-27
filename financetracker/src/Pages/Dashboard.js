import React, { useState } from "react";
import Header from "../Component/Header";
import { Card, Modal } from "antd";
import IncomeIcon from "../assets/Income.svg";
import BalanceIcon from "../assets/Balance.svg";
import ExpenseIcon from "../assets/Expense.svg";
import TransactionIcon from "../assets/Transaction.svg"
import { motion } from "framer-motion";
import Footer from "../Component/Footer";

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showicon,setshowicon]=useState(false);
  const [modalType, setModalType] = useState(""); // "income" | "expense" | "balance"

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);

  const renderModalContent = () => {
    switch (modalType) {
      case "income":
        return <p>Add your income here...</p>;
      case "expense":
        return <p>Add your expense here...</p>;
      case "balance":
        return <p>Resetting balance...</p>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-inter pt-16">
      <Header className="fixed z-50 " />
      
      <div className="flex flex-col md:flex-row mt-5 md:space-x-6 justify-between px-24">
        <Card
          className="flex flex-col justify-between bg-gray-100"
          title="BALANCE"
          hoverable
          style={{ width: 360, height: 330 }}
        >
          <img src={BalanceIcon} alt="Balance Icon" />
          <p className="text-xl m-2">₹</p>
          <button
            className="flex justify-center items-center w-full text-lg rounded-lg text-white bg-[#ff7bac] shadow-md mt-5 h-10"
            onClick={() => openModal("balance")}
          >
            Reset Balance
          </button>
        </Card>

        <Card
          className="flex flex-col justify-between bg-gray-100"
          title="INCOME"
          hoverable
          variant="borderless"
          style={{ width: 360, height: 330 }}
        >
          <img src={IncomeIcon} alt="Income Icon" className="w-full h-[125px]" />
          <p className="text-xl m-2">₹</p>
          <button
            className="flex justify-center items-center w-full text-lg rounded-lg text-white bg-[#ff7bac] shadow-md mt-5 h-10"
            onClick={() => openModal("income")}
          >
            Add Income
          </button>
        </Card>

        <Card
          title="EXPENSE"
          hoverable
          variant="borderless"
          style={{ width: 360, height: 330 }}
          className="bg-gray-100 flex flex-col items-center"
        >
          <img src={ExpenseIcon} alt="Expense Icon" />
          <p className="text-xl m-2">₹</p>
          <button
            className="flex justify-center items-center w-full text-lg rounded-lg text-white bg-[#ff7bac] shadow-md mt-5 h-10"
            onClick={() => openModal("expense")}
          >
            Add Expense
          </button>
        </Card>
      </div>
      {showicon ? <div className="flex flex-row px-24">
        <div className="h-full w-4/5">
        <p>hi</p>

        </div>
        <div>
          hola

        </div>
      </div> : <div className=" flex flex-col items-center justify-center mt-7 mx-24 p-5 shadow-md rounded-md bg-gray-100 mb-3">
        <img src={TransactionIcon} alt="transaction Icon" className="h-[30%] w-[30%]"></img>
        <motion.p
        className="text-sm sm:text-base md:text-lg text-slate-600 text-center mb-8 sm:mb-10 max-w-2xl px-2 mt-5 ml-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        You have no Transactions currently.
      </motion.p>
      </div> 

} 
        
      {/* Shared Modal */}
      <Modal
        title={
          modalType === "income"
            ? "Add Income"
            : modalType === "expense"
            ? "Add Expense"
            : "Reset Balance"
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closable
      >
        {renderModalContent()}
      </Modal>
      <Footer></Footer>
    </div>
    
  );
}

export default Dashboard;
