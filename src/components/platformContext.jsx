import { createContext, useState } from 'react';

const PlatformContext = createContext();

const PlatformProvider = ({ children }) => {
  const [selectedPlatform, setSelectedPlatform] = useState('');

  return (
    <PlatformContext.Provider value={{ selectedPlatform, setSelectedPlatform }}>
      {children}
    </PlatformContext.Provider>
  );
};

export { PlatformProvider, PlatformContext };