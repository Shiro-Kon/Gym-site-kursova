import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useClients } from "../context/ClientsContext";

const AddClient: React.FC = () => {
  const { addClient } = useClients();
  const navigate = useNavigate();
  const location = useLocation();
  const selectedAbonement = location.state?.selectedAbonement;

  const [formData, setFormData] = useState<{
    name: string;
    surname: string;
    middleName: string;
    birthDate: string;
    phone: string;
    lockerNumber?: number;
    status: "Відсутній" | "В залі";
    hasTrainer: boolean;
    startDate?: string;
    endDate?: string;
    hasLocker: boolean;
    isTrainer: boolean;
  }>({
    name: "",
    surname: "",
    middleName: "",
    birthDate: "",
    phone: "",
    lockerNumber: undefined,
    status: "Відсутній",
    hasTrainer: false, // Начальное значение
    startDate: "",
    endDate: "",
    hasLocker: false,
    isTrainer: false,
  });

  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  useEffect(() => {
    // Если выбран абонемент с тренером, то установим значение hasTrainer в true
    if (selectedAbonement) {
      setFormData((prev) => ({
        ...prev,
        hasTrainer: selectedAbonement.name === "Абонемент з тренером",
        startDate:
          selectedAbonement.name === "Абонемент з тренером"
            ? ""
            : prev.startDate,
        endDate:
          selectedAbonement.name === "Абонемент з тренером" ? "" : prev.endDate,
      }));
    }
  }, [selectedAbonement]);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? undefined : value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    if (!formData.isTrainer) {
      setFormData({
        ...formData,
        hasTrainer: checked, // Используем checked, а не value
      });
    }
  };

  const handleRoleChange = (role: "Клієнт" | "Тренер") => {
    const isTrainer = role === "Тренер";
    setFormData({
      ...formData,
      isTrainer,
      hasTrainer: false, // Сбрасываем, так как тренер не может иметь тренера
      startDate: isTrainer ? undefined : "",
      endDate: isTrainer ? undefined : "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addClient(formData);
    localStorage.removeItem("formData");
    navigate("/clients");
  };

  return (
    <div className="bg-[#7C9694] min-h-screen py-12 sm:py-16 md:py-16">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-[#F6F6F7]">
          Додати нового користувача
        </h2>

        <div className="mb-6 flex justify-center">
          <button
            onClick={() => handleRoleChange("Клієнт")}
            className={`py-2 px-6 rounded ${
              !formData.isTrainer
                ? "bg-[#2C5C65] text-[#F6F6F7]"
                : "bg-[#F6F6F7] text-[#2C5C65]"
            } hover:bg-[#2C5C65]/80 hover:text-[#F6F6F7] mr-4`}
          >
            Клієнт
          </button>
          <button
            onClick={() => handleRoleChange("Тренер")}
            className={`py-2 px-6 rounded ${
              formData.isTrainer
                ? "bg-orange-600/90 text-[#F6F6F7]"
                : "bg-gray-300 text-gray-700"
            } hover:bg-orange-500/90 hover:text-[#F6F6F7]`}
          >
            Тренер
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-6">
              <label className="block mb-2 text-lg text-[#2C5C65]">Ім'я</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border-2 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-lg text-[#2C5C65]">
                Прізвище
              </label>
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                required
                className="border-2 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-lg text-[#2C5C65]">
                По батькові
              </label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                className="border-2 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-lg text-[#2C5C65]">
                Дата народження
              </label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="border-2 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-lg text-[#2C5C65]">
                Телефон
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="border-2 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {!formData.isTrainer && (
            <div className="mb-6 flex items-center">
              <input
                type="checkbox"
                name="hasTrainer"
                checked={formData.hasTrainer}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <span className="text-lg text-[#2C5C65]">
                Вибрати, якщо клієнт бере абонемент з тренером
              </span>
            </div>
          )}

          {!formData.isTrainer && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mb-6">
                <label className="block mb-2 text-lg text-[#2C5C65]">
                  Дата початку
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate || ""}
                  onChange={handleChange}
                  className="border-2 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-6">
                <label className="block mb-2 text-lg text-[#2C5C65]">
                  Дата закінчення
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate || ""}
                  onChange={handleChange}
                  className="border-2 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="bg-[#2C5C65] text-white py-3 px-6 rounded-md w-full hover:bg-[#2C5C65]/90 hover:-translate-y-1  focus:outline-none focus:ring-2 focus:ring-orange-500 duration-300 ease-in-out"
          >
            Додати
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClient;
