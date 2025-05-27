const Footer = () => {
  return (
    <footer className="mt-auto bg-gray-100 text-center text-gray-600 py-4">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} <span className="text-[#ff7bac]">MoneyMate</span> — Track your income and expenses effortlessly.
      </p>
    </footer>
  );
};

export default Footer;
