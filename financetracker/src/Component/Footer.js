const Footer = () => {
  return (
    <footer className="mt-auto text-center text-gray-600 py-4 w-full shadow-md bg-white ">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} <span className="text-[#ff7bac]">MoneyMate</span> — Track your income and expenses effortlessly.
      </p>
    </footer>
  );
};

export default Footer;
