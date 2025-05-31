import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Header from "../Component/Header";
import { Card, Modal } from "antd";
import IncomeIcon from "../assets/Income.svg";
import BalanceIcon from "../assets/Balance.svg";
import ExpenseIcon from "../assets/Expense.svg";
import PieIcon from "../assets/pie.svg";
import TransactionIcon from "../assets/Transaction.svg";
import { motion } from "framer-motion";

import { Table, Button, Space } from "antd";
import {
  DollarOutlined,
  CalendarOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  StopOutlined,
} from "@ant-design/icons";
import Footer from "../Component/Footer";
import IncomeForm from "../Component/IncomeForm";
import ExpenseForm from "../Component/ExpenseForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { collection } from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const [user] = useAuthState(auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showicon, setshowicon] = useState(false);
  const [modalType, setModalType] = useState("");
  const [showexpense, setshowexpense] = useState(false);
  const [linechartdata, setlinechartdata] = useState([]);
  const [income, setincome] = useState();
  const [expense, setexpense] = useState();
  const [balance, setbalance] = useState();
  const [Transactions, setTransactions] = useState([]);
  const [expensesByTag, setExpensesByTag] = useState([]);
  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];
  const [sortedInfo, setSortedInfo] = useState({
    columnKey: null,
    order: null,
  });

  const handleSort = (columnKey) => {
    const order =
      sortedInfo.columnKey === columnKey && sortedInfo.order === "ascend"
        ? "descend"
        : "ascend";
    setSortedInfo({ columnKey, order });
  };
  const handleClearSort = () => {
    setSortedInfo({ columnKey: null, order: null });
  };
  const columns = [
    {
      title: "Title",
      dataIndex: "Title",
      key: "Title",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      filters: [
        { text: "Expense", value: "Expense" },
        { text: "Income", value: "Income" },
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: "Tag",
      dataIndex: "Tag",
      key: "tag",
    },
    {
      title: "Amount(in Rs)",
      dataIndex: "Amount",
      key: "amount",
      sorter: (a, b) => a.Amount - b.Amount,
      sortOrder: sortedInfo.columnKey === "amount" ? sortedInfo.order : null,
    },
    {
      title: "Date",
      dataIndex: "Date",
      key: "Date",
      sorter: (a, b) => new Date(a.Date) - new Date(b.Date),
      sortOrder: sortedInfo.columnKey === "date" ? sortedInfo.order : null,
    },
  ];

  useEffect(() => {
    if (!user || !user.uid) {
      setTransactions([]); // Clear if no user
      return;
    }

    const transactionRef = collection(db, "Users", user.uid, "Transactions");

    const unsubscribe = onSnapshot(
      transactionRef,
      (snapshot) => {
        const transactionsArray = snapshot.docs.map((doc, index) => {
          const { type, Amount, Date, Tag, Title } = doc.data();
          return { key: index + 1, type, Amount, Tag, Title, Date };
        });
        setTransactions(transactionsArray);
        const expenses = transactionsArray.filter(
          (tx) => tx.type === "Expense"
        );
        let income = 0;
        let expense = 0;
        for (const trans of transactionsArray) {
          if (trans.type === "Income") {
            income += Number(trans.Amount);
          } else {
            expense += Number(trans.Amount);
          }
        }
        setincome(income);
        setexpense(expense);
        setbalance(income - expense);
        console.log(transactionsArray);

        const expenseByTagObj = expenses.reduce((acc, curr) => {
          const type = curr.Tag || "Unknown";
          const value = Number(curr.Amount) || 0;
          acc[type] = (acc[type] || 0) + value;
          return acc;
        }, {});

        const linechartobj = transactionsArray.reduce((acc, curr) => {
          const month = dayjs(curr.Date).format("MMM");

          if (!acc[month]) {
            acc[month] = {
              Month: month,
              Expense: 0,
              Income: 0,
              Balance: 0,
            };
          }
          if (curr.type === "Income") {
            acc[month].Income += curr.Amount;
            acc[month].Balance += curr.Amount;
          } else {
            acc[month].Expense += curr.Amount;
            acc[month].Balance -= curr.Amount;
          }
          return acc;
        }, {});
        const linechartArray = Object.values(linechartobj);
        const monthOrder = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        linechartArray.sort(
          (a, b) => monthOrder.indexOf(a.Month) - monthOrder.indexOf(b.Month)
        );
        const completeData = monthOrder.map((month) => {
          return (
            linechartArray.find((entry) => entry.Month === month) || {
              Month: month,
              Income: 0,
              Expense: 0,
              Balance: 0,
            }
          );
        });
        setlinechartdata(completeData);

        console.log(linechartArray);

        const expenseByTagArray = Object.entries(expenseByTagObj).map(
          ([type, value]) => ({
            type,
            value,
          })
        );
        console.log(expenseByTagArray);
        setExpensesByTag(expenseByTagArray);
      },
      (error) => {
        console.error("Error fetching transactions: ", error);
        setTransactions([]);
      }
    );

    return () => unsubscribe();
  }, [user]);

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
    <div className="flex flex-col min-h-screen overflow-x-hidden w-full bg-gray-100 justify-center font-inter pt-16  items-center md:items-stretch">
      <Header />

      <div className="flex flex-col items-center p-4 justify-normal md:flex-row mx-2 md:items-stretch md:justify-between gap-6 mt-5 px-4 md:px-10 mb-2 md:mb-0">
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
          <p className="text-xl m-2">₹:{balance}</p>
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
          <p className="text-xl m-2">₹:{income}</p>
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
          <p className="text-xl m-2">₹:{expense}</p>
          <button
            className="flex justify-center items-center w-full text-lg rounded-lg text-white bg-[#ff7bac] shadow-md mt-5 h-10 px-3"
            onClick={() => openModal("expense")}
          >
            Add Expense
          </button>
        </Card>
      </div>

      {showicon ? (
        <div className="flex  p-4 flex-col-reverse w-full md:space-y-0 gap-6 items-center  justify-normal md:flex-row mx-4 md:items-stretch md:justify-between mt-0 md:mt-8 px-4 mb-0">
          {/* Left Section */}
          <div
            className="w-full min-h-[400px] md:min-h-[300px] md:h-full flex flex-col md:w-[70%] bg-white rounded-lg p-0 md:p-4 mx-4  hover:shadow-2xl transition-all duration-300
          "
          >
            <h1 className="font-inter text-center font-extrabold text-xl mb-1 m-2 md:m-0">
              Financial Statistics
            </h1>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart
                data={linechartdata}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />

                <XAxis
                  dataKey="Month"
                  label={{
                    value: "Month",
                    position: "insideBottomRight",
                    offset: -10,
                  }}
                />

                <YAxis
                  tickFormatter={(value) => `₹${value.toLocaleString()}`}
                  domain={["dataMin - 1000", "dataMax + 1000"]}
                />

                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Balance"
                  stroke="#ff7300"
                  strokeWidth={2}
                />

                <Line
                  type="monotone"
                  dataKey="Expense"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="Income" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Right Section */}
          {showexpense ? (
            <div className="flex mx-4 mt-2 min-h-[300px] md:min-h-[300px]  md:mt-0 w-full md:w-[30%] justify-center items-center">
              <Card
                className="flex flex-col  bg-white w-full max-w-[380px] flex-grow items-center"
                title="YOUR SPENDINGS"
                hoverable
                style={{ height: 370 }}
              >
                <PieChart width={325} height={275}>
                  <Pie
                    className="outline-none focus:outline-none"
                    data={expensesByTag}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    fill="#8884d8"
                    label={({ value }) => ` ₹${value}`}
                    paddingAngle={5}
                    dataKey="value"
                    nameKey="type"
                  >
                    {expensesByTag.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [`₹${value}`, name]}
                    contentStyle={{
                      backgroundColor: "#f0f0f0",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend
                    formatter={(value) => (
                      <span style={{ color: "#333" }}>{value}</span>
                    )}
                  />
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
      {showicon ? (
        <div className="p-4 w-full">
          <Space style={{ marginBottom: 16 }} direction="horizontal" wrap>
            <Button
              onClick={() => handleSort("amount")}
              icon={<DollarOutlined />}
            >
              Sort by Amount{" "}
              {sortedInfo.columnKey === "amount" &&
                (sortedInfo.order === "ascend" ? (
                  <ArrowUpOutlined />
                ) : (
                  <ArrowDownOutlined />
                ))}
            </Button>
            <Button
              onClick={() => handleSort("date")}
              icon={<CalendarOutlined />}
            >
              Sort by Date{" "}
              {sortedInfo.columnKey === "date" &&
                (sortedInfo.order === "ascend" ? (
                  <ArrowUpOutlined />
                ) : (
                  <ArrowDownOutlined />
                ))}
            </Button>
            <Button onClick={handleClearSort} icon={<StopOutlined />}>
              No Sort
            </Button>
          </Space>
          <Table
            columns={columns}
            dataSource={Transactions}
            pagination={{ pageSize: 5 }}
            scroll={{ x: "100%" }}
          />
        </div>
      ) : (
        <></>
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
