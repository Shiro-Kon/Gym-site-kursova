import React, { useState, useEffect } from "react";
import { useClients } from "../context/ClientsContext";

const Stats: React.FC = () => {
  const { clients } = useClients();
  const [activeClients, setActiveClients] = useState(0); // Количество клиентов в зале
  const [activeTrainers, setActiveTrainers] = useState(0); // Количество тренеров в зале
  const [trainers, setTrainers] = useState(0); // Общее количество тренеров
  const [availableLockers, setAvailableLockers] = useState(0);
  const [occupiedLockers, setOccupiedLockers] = useState(0);

  useEffect(() => {
    // Количество клиентов в зале (status === "В залі" и isTrainer === false)
    const activeClientCount = clients.filter(
      (client) => client.status === "В залі" && !client.isTrainer
    ).length;

    // Количество тренеров в зале (status === "В залі" и isTrainer === true)
    const activeTrainerCount = clients.filter(
      (client) => client.status === "В залі" && client.isTrainer
    ).length;

    // Количество тренеров (всего, независимо от статуса)
    const trainerCount = clients.filter((client) => client.isTrainer).length;

    // Количество клиентов с назначенным номером шкафчика
    const occupiedLockerCount = clients.filter(
      (client) => client.lockerNumber !== undefined
    ).length;

    const totalLockers = 100;
    const availableLockerCount = totalLockers - occupiedLockerCount;

    setActiveClients(activeClientCount);
    setActiveTrainers(activeTrainerCount);
    setTrainers(trainerCount);
    setAvailableLockers(availableLockerCount);
    setOccupiedLockers(occupiedLockerCount);
  }, [clients]);

  return (
    <div className="bg-[#7C9694] flex items-center justify-center py-12">
      <div className="container mx-auto px-4 md:px-8 w-full">
        <h2 className="text-center text-4xl sm:text-5xl font-semibold text-[#F6F6F7] mb-6">
          Статистика Залу
        </h2>
        <p className="text-center text-lg text-[#F6F6F7] mb-8">
          Загальна інформація про клієнтів і шафи в залі.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card for clients in the gym */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-medium text-[#2C5C65] mb-2">
              Клієнтів у залі
            </h3>
            <p className="text-3xl font-semibold text-[#2C5C65]">
              {activeClients}
            </p>
          </div>

          {/* Card for trainers in the gym */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-medium text-[#2C5C65] mb-2">
              Тренерів у залі
            </h3>
            <p className="text-3xl font-semibold text-[#2C5C65]">
              {activeTrainers}
            </p>
          </div>

          {/* Card for all trainers */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-medium text-[#2C5C65] mb-2">
              Загальна кількість тренерів
            </h3>
            <p className="text-3xl font-semibold text-[#2C5C65]">{trainers}</p>
          </div>

          {/* Card for available lockers */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-medium text-[#2C5C65] mb-2">
              Вільних шаф
            </h3>
            <p className="text-3xl font-semibold text-[#2C5C65]">
              {availableLockers}
            </p>
          </div>

          {/* Card for occupied lockers */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center ">
            <h3 className="text-xl font-medium text-[#2C5C65] mb-2">
              Зайнятих шаф
            </h3>
            <p className="text-3xl font-semibold text-[#2C5C65]">
              {occupiedLockers}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
