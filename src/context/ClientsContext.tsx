import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Client } from "../types/Client";

interface ClientsContextType {
  clients: Client[];
  addClient: (client: Omit<Client, "id">) => void;
  removeClient: (id: number) => void;
  updateClient: (id: number, updatedClient: Partial<Client>) => void;
  updateClientStatus: (id: number) => void;
}

interface ClientsProviderProps {
  children: ReactNode;
}

const ClientsContext = createContext<ClientsContextType | undefined>(undefined);

export const useClients = (): ClientsContextType => {
  const context = useContext(ClientsContext);
  if (!context) {
    throw new Error("useClients must be used within a ClientsProvider");
  }
  return context;
};

export const ClientsProvider: React.FC<ClientsProviderProps> = ({
  children,
}) => {
  const [clients, setClients] = useState<Client[]>(() => {
    // Загружаем клиентов из localStorage при инициализации
    const savedClients = localStorage.getItem("clients");
    return savedClients ? JSON.parse(savedClients) : [];
  });

  useEffect(() => {
    // Сохраняем клиентов в localStorage при каждом изменении
    localStorage.setItem("clients", JSON.stringify(clients));

    // Устанавливаем таймер для удаления данных через 2 минуты
    const expirationTimer = setTimeout(() => {
      localStorage.removeItem("clients");
    }, 10 * 60 * 1000); // 2 минуты

    return () => clearTimeout(expirationTimer); // Очищаем таймер при размонтировании
  }, [clients]);

  const addClient = (client: Omit<Client, "id">) => {
    const newClient: Client = { ...client, id: Date.now() }; // Генерация уникального ID
    setClients([...clients, newClient]);
  };

  const removeClient = (id: number) => {
    setClients(clients.filter((client) => client.id !== id));
  };

  const updateClient = (id: number, updatedClient: Partial<Client>) => {
    setClients(
      clients.map((client) =>
        client.id === id ? { ...client, ...updatedClient } : client
      )
    );
  };

  const updateClientStatus = (id: number) => {
    setClients(
      clients.map((client) =>
        client.id === id
          ? {
              ...client,
              status: client.status === "В залі" ? "Відсутній" : "В залі",
            }
          : client
      )
    );
  };

  return (
    <ClientsContext.Provider
      value={{
        clients,
        addClient,
        removeClient,
        updateClient,
        updateClientStatus,
      }}
    >
      {children}
    </ClientsContext.Provider>
  );
};
