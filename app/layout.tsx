'use client';
import './globals.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Sidebar from './Components/Sidebar';
import { Providers } from './providers';
import { useState } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-gray-950 text-gray-100 min-h-screen flex flex-col">
        <Providers>
          <Header 
            onMenuClick={handleMenuClick} 
            isSidebarOpen={isMobileSidebarOpen}
          />
          <div className="flex flex-1">
            <Sidebar 
              isMobileOpen={isMobileSidebarOpen}
              onClose={handleSidebarClose}
            />
            <main className="flex-1 overflow-x-hidden">
              {children}
            </main>
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}