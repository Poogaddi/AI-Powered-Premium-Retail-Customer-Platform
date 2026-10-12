import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { CallSessionProvider } from './context/CallSessionContext';
import { ToastProvider } from './context/ToastContext';
import ToastContainer from './components/common/ToastContainer';
import AppRoutes from './routes/AppRoutes';
import './App.css';

export function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <CallSessionProvider>
          <AppRoutes />
          <ToastContainer />
        </CallSessionProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
