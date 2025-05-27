import React, { useState } from "react";
import Header from "../Component/Header";
import { Card, Modal } from "antd";
import IncomeIcon from "../assets/Income.svg";
import BalanceIcon from "../assets/Balance.svg";
import ExpenseIcon from "../assets/Expense.svg";
import TransactionIcon from "../assets/Transaction.svg";
import { motion } from "framer-motion";
import Footer from "../Component/Footer";

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showicon, setshowicon] = useState(false);
  const [modalType, setModalType] = useState("");

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
    <div className="flex flex-col min-h-screen bg-white font-inter pt-16 items-center md:items-stretch">
      <Header />

      <div className="flex flex-col gap-6 md:flex-row mt-5 md:space-x-6 justify-center px-4 sm:px-12 md:px-24 lg:px-24">
        <Card
          className="flex flex-col justify-between bg-primary w-full max-w-sm"
          title="BALANCE"
          hoverable
          style={{ height: 330, width:370 }}
        >
          <img src={BalanceIcon} alt="Balance Icon" className="w-full h-[125px]" />
          <p className="text-xl m-2">₹</p>
          <button
            className="flex justify-center items-center w-full text-lg rounded-lg text-white bg-[#ff7bac] shadow-md mt-5 h-10"
            onClick={() => openModal("balance")}
          >
            Reset Balance
          </button>
        </Card>

        <Card
          className="flex flex-col justify-between bg-primary w-full max-w-sm"
          title="INCOME"
          hoverable
          variant="borderless"
          style={{ height: 330,width:370 }}
        >
          <img
            src={IncomeIcon}
            alt="Income Icon"
            className="w-full h-[125px] "
          />
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
          style={{ height: 330,width:370 }}
          className="bg-primary flex flex-col  w-full max-w-sm"
        >
          <img src={ExpenseIcon} alt="Expense Icon" className="w-full h-[125px]" />
          <p className="text-xl m-2">₹</p>
          <button
            className="flex justify-center items-center w-full text-lg rounded-lg text-white bg-[#ff7bac] shadow-md mt-5 h-10"
            onClick={() => openModal("expense")}
          >
            Add Expense
          </button>
        </Card>
      </div>

      {showicon ? (
        <div className="flex flex-col sm:flex-row gap-6 px-4 sm:px-12 md:px-20 lg:px-24 mt-6">
          <div className="w-full sm:w-4/5">
            <p>hi</p>
          </div>
          <div className="w-full">hola</div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-7 mx-4 sm:mx-12 md:mx-20 lg:mx-24 p-5 shadow-md rounded-md bg-primary mb-3">
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
      <Footer />
    </div>
  );
}

export default Dashboard;
