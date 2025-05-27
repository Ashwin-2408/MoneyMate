import React, { useState } from "react";
import Header from "../Component/Header";
import { Card, Modal } from "antd";
import IncomeIcon from "../assets/Income.svg";
import BalanceIcon from "../assets/Balance.svg";
import ExpenseIcon from "../assets/Expense.svg";

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    <div className="flex flex-col min-h-screen bg-[#f8fafc] font-inter">
      <Header />
      
      <div className="flex flex-col md:flex-row mt-5 md:space-x-6 justify-between px-24">
        <Card
          className="flex flex-col p-3 bg-gray-100"
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
    </div>
  );
}

export default Dashboard;
