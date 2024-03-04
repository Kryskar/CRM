import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ThemeProvider from './contexts/ThemeProvider.tsx';
import ErrorBoundary from './error_handling/ErrorBoundary.tsx';
import App from './App.tsx';

import "react-big-calendar/lib/css/react-big-calendar.css"

const queryClient = new QueryClient();

const Root = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </QueryClientProvider>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);
