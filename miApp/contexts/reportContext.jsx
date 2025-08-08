import React, { createContext, useState } from 'react';

export const ReportContext = createContext();

export const ReportProvider = ({ children }) => {
  const [reporteSeleccionado, setReporteSeleccionado] = useState(null);

  return (
    <ReportContext.Provider value={{ reporteSeleccionado, setReporteSeleccionado }}>
      {children}
    </ReportContext.Provider>
  );
};
