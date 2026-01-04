// app/layout.tsx
import './globals.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Sidebar from './Components/Sidebar';




export const metadata = {
  title: 'Analytical Dashboard',
  description: '...',
}
 

export default function RootLayout({
  
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-gray-950 text-gray-100 min-h-screen">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 min-h-screen p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </div>
        {/* <Footer /> */}
      </body>
    </html>
  );
}