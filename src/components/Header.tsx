import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-cyan-900/85 text-[#F6F6F7] p-4">
      <nav className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Система ведення обліку абонементів до спортзалу.
        </h1>
        <div>
          <Link to="/" className="mr-4 hover:underline">
            Абонементи
          </Link>
          <Link to="/home" className="mr-4 hover:underline">
            Статистика
          </Link>
          <Link to="/clients" className="mr-4 hover:underline">
            Клієнти
          </Link>
          <Link to="/add-client" className=" mr-4 hover:underline">
            Додати клієнта
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
