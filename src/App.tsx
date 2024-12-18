import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Clients from './pages/Clients';
import AddClient from './pages/AddClient';
import EditClient from './components/EditClient';
import { ClientsProvider } from './context/ClientsContext';
import AbonementsPage from './pages/AbonementsPage';

const App: React.FC = () => {

  return (
    <ClientsProvider>
      <div className="app-container ">
        
          <>
            <Header />
            
              <Routes>
              <Route path="/" element={<AbonementsPage />} />
                <Route path="/home" element={<Home />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/add-client" element={<AddClient />} />
                <Route path="/edit-client/:id" element={<EditClient />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            
          </>
        
      </div>
    </ClientsProvider>
  );
};

export default App;
