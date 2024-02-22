import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ThemeProvider from './contexts/ThemeProvider.tsx';
import App from './App.tsx';

const queryClient = new QueryClient();

const Root = () => {
  return (
    <ErrorBoundary fallback={<p>something went wrong</p>}>
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
