import React, { createContext, useContext, useState } from 'react';

const ConnectionContext = createContext();

export const ConnectionProvider = ({ children }) => {
  const [connectionData, setConnectionData] = useState(null);
  const [connectionWithHabitData, setConnectionWithHabitData] = useState(null);

  return (
    <ConnectionContext.Provider value={{ connectionData, setConnectionData, connectionWithHabitData, setConnectionWithHabitData }}>
      {children}
    </ConnectionContext.Provider>
  );
};

export const useConnection = () => {
  return useContext(ConnectionContext);
}; 