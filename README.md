# 💰 Money Mate

**Money Mate** is a sleek and intuitive personal finance tracker that helps users manage their income, expenses, and savings. It provides a clear view of your financial health, allowing you to track your money in real-time with secure cloud syncing using Firebase.

## 🌐 Live Demo

🔗 [Visit Money Mate](https://money-mate-ss62.vercel.app/)

---

## 📌 Features

- ✅ Add and categorize income and expenses
- 📊 Real-time balance and transaction history
- 🔄 Firebase integration for authentication and data storage
- 📱 Responsive and mobile-friendly design
- ☁️ Cloud-based data persistence (Firestore)
- 🔐 Secure login with Firebase Authentication
- 📅 Filter and sort transactions by date
- 📈 Clean dashboard with financial summaries

---

## 🛠 Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **State Management:** useState, useEffect, 
- **Backend/Cloud:** Firebase
  - **Authentication** – Secure login/signup
  - **Firestore** – Real-time database
 
- **Deployment:** Vercel 

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/moneymate.git
cd moneymate
```

### 2. Install dependencies

```bash
npm install
```
### 3. Add Firebase Config

Create a `.env` file in the root of your project and add your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

###Starting the app
```bash
npm start
```
