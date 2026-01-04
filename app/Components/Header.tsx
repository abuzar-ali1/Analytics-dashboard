'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  Menu, 
  X, 
  Bell, 
  Search, 
  TrendingUp,
  User,
  Settings,
  LogOut
} from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
    { name: 'Analytics', icon: <TrendingUp className="w-4 h-4" /> },
    { name: 'Reports', icon: <BarChart3 className="w-4 h-4" /> },
    { name: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const profileMenuItems = [
    { name: 'My Profile', icon: <User className="w-4 h-4" /> },
    { name: 'Settings', icon: <Settings className="w-4 h-4" /> },
    { name: 'Logout', icon: <LogOut className="w-4 h-4" /> },
  ];

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 20,
        delay: 0.1
      }}
      className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900/95"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo and Brand Section */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center space-x-3"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600"
            >
              <BarChart3 className="h-6 w-6 text-white" />
            </motion.div>
            
            <div className="hidden md:block">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
              >
                InsightFlow Analytics
              </motion.h1>
              <p className="text-xs text-gray-400">Real-time Dashboard</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(59, 130, 246, 0.1)"
                }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="flex items-center space-x-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:text-white hover:bg-gray-800"
              >
                {item.icon}
                <span>{item.name}</span>
              </motion.a>
            ))}
          </nav>

          {/* Search and Actions Section */}
          <div className="flex items-center space-x-4">
            
            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search metrics, reports..."
                  className="pl-10 pr-4 py-2 w-64 rounded-lg border border-gray-700 bg-gray-800 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </motion.div>

            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative rounded-full p-2 text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <Bell className="h-5 w-5" />
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-red-500"
              />
            </motion.button>

            {/* User Profile */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 rounded-full p-1 hover:bg-gray-800"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-white">Alex Johnson</p>
                  <p className="text-xs text-gray-400">Admin</p>
                </div>
              </motion.button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl border border-gray-700 bg-gray-900 py-1 shadow-xl"
                  >
                    {profileMenuItems.map((item) => (
                      <motion.a
                        key={item.name}
                        whileHover={{ x: 5, backgroundColor: "rgba(55, 65, 81, 0.5)" }}
                        href="#"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-300 hover:text-white"
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-lg p-2 text-gray-400 hover:text-white hover:bg-gray-800 md:hidden"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-gray-800 md:hidden"
            >
              <div className="space-y-1 px-2 py-3">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    href="#"
                    className="flex items-center space-x-3 rounded-lg px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </motion.a>
                ))}
                
                {/* Mobile Search */}
                <div className="px-3 py-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-x-0 top-0 -z-10 h-full">
        <motion.div
          animate={{
            x: [0, 100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-0 left-0 h-px w-32 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"
        />
      </div>
    </motion.header>
  );
};

export default Header;