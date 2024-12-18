import React, { useState } from "react";
import { useClients } from "../context/ClientsContext";
import { Link } from "react-router-dom";

const Clients: React.FC = () => {
  const { clients, removeClient, updateClientStatus } = useClients();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredClients = clients.filter((client) => {
    const fullName = `${client.name} ${client.surname}`.toLowerCase();
    const searchQuery = searchTerm.toLowerCase();
    return (
      fullName.includes(searchQuery) ||
      (client.isTrainer ? "тренер" : "клієнт").includes(searchQuery)
    );
  });

  const getDateClass = (endDate?: string) => {
    if (!endDate) return "text-gray-700";
    const currentDate = new Date();
    const expirationDate = new Date(endDate);
    const daysLeft = Math.floor(
      (expirationDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysLeft <= 7 && daysLeft >= 0) {
      return "text-red-600 font-bold"; 
    }
    return "text-gray-700"; 
  };

  return (
    <div className="bg-[#F6F6F7] min-h-screen py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-[#2C5C65]">
          Список користувачів
        </h1>

  
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            className="w-full sm:w-1/2 md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-md"
            placeholder="Пошук за ім'ям, прізвищем або типом"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

       
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between"
            >
              <div className="flex flex-col mb-4">
                <p className="text-lg font-semibold text-[#2C5C65]">
                  {client.name} {client.surname}
                </p>
                <p className="mt-2 text-md text-gray-700 truncate">
                  {client.phone}
                </p>
                <p className="mt-2 text-md text-gray-700">
                  Дата народження: {client.birthDate || "Невідомо"}
                </p>
              </div>

              <div className="flex flex-col mb-4">
                {client.isTrainer ? (
                  <p className="mt-2 text-md text-amber-500 font-semibold">
                    Тренер
                  </p>
                ) : (
                  <p className="mt-2 text-md text-gray-700">
                    {client.hasTrainer ? "Тренировка с тренером" : "Клієнт"}
                  </p>
                )}
              </div>

              <div className="mt-4 flex flex-col ">
                <p className="text-sm text-black mb-2">
                  Статус: {client.status === "В залі" ? "В залі" : "Не в залі"}
                </p>

                <button
                  onClick={() => updateClientStatus(client.id)}
                  className="bg-blue-700 text-white py-1 px-4 rounded-lg hover:bg-blue-600 focus:outline-none mb-4"
                >
                  Змінити статус
                </button>

                <p className="mt-2 text-md text-gray-700">
                  Номер шафи:{" "}
                  {client.lockerNumber ? client.lockerNumber : "Невідомо"}
                </p>

                {client.endDate && (
                  <p className={`mt-2 text-md ${getDateClass(client.endDate)}`}>
                    Закінчення абонемента: {client.endDate}
                  </p>
                )}
              </div>

              <div className="mt-4 flex justify-between gap-4">
                <Link
                  to={`/edit-client/${client.id}`}
                  className="bg-indigo-800 text-white py-1 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none"
                >
                  Редагувати
                </Link>
                <button
                  onClick={() => removeClient(client.id)}
                  className="bg-red-800 text-white py-1 px-4 rounded-lg hover:bg-red-600 focus:outline-none"
                >
                  Видалити
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Clients;
