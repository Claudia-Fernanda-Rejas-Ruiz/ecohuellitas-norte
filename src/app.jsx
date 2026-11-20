import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/theme-context';
import { AuthProvider } from './context/auth-context';
import { DataProvider } from './context/data-context';
import { Navbar } from './components/common/navbar';
import { BottomNav } from './components/common/bottom-nav';
import { Footer } from './components/common/footer';
import { CommandMenu } from './components/common/command-menu';
import { ToastContainer } from './components/ui/toast';
import { AppRoutes } from './routes/app-routes';

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <BrowserRouter>
            <div className="min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-slate-950 text-stone-800 dark:text-stone-100 transition-colors duration-200">
              <Navbar />
              
              <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-12">
                <AppRoutes />
              </main>

              <Footer />
              <BottomNav />
              <CommandMenu />
              <ToastContainer />
            </div>
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
