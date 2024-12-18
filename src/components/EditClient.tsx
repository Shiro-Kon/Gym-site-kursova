import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useClients } from "../context/ClientsContext";
import { Client } from "../types/Client";

const EditClient: React.FC = () => {
  const { clients, updateClient } = useClients();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<Client>>({});

  useEffect(() => {
    if (id) {
      const clientId = Number(id);
      const clientToEdit = clients.find((client) => client.id === clientId);
      if (clientToEdit) {
        setFormData(clientToEdit);
      }
    }
  }, [id, clients]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      const clientId = Number(id);
      updateClient(clientId, formData);
      navigate("/clients");
    }
  };

  return (
    <div className="bg-[#7C9694] min-h-screen py-12 sm:py-16 md:py-16">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-[#F6F6F7]">
          Редагувати клієнта
        </h2>

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
                value={formData.name || ""}
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
                value={formData.surname || ""}
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
                value={formData.middleName || ""}
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
                value={formData.birthDate || ""}
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
                value={formData.phone || ""}
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
                checked={formData.hasTrainer || false}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hasTrainer: e.target.checked,
                  })
                }
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

          <div className="mb-6">
            <label className="block mb-2 text-lg text-[#2C5C65]">Статус</label>
            <select
              name="status"
              value={formData.status || "Відсутній"}
              onChange={handleChange}
              className="border-2 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Відсутній">Відсутній</option>
              <option value="В залі">В залі</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-lg text-[#2C5C65]">
              Номер шафи
            </label>
            <input
              type="number"
              name="lockerNumber"
              value={formData.lockerNumber || ""}
              onChange={handleChange}
              className="border-2 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-[#2C5C65] text-white py-3 px-6 rounded-md w-full hover:bg-[#2C5C65]/90 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-orange-500 duration-300 ease-in-out"
          >
            Зберегти зміни
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditClient;
