'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  Home,
  TrendingUp,
  PieChart,
  Settings,
  Database,
  Users,
  Bell,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  FileText,
  Shield,
  Zap,
  Clock,
  Download
} from 'lucide-react';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close sidebar on mobile when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      if (isMobileOpen && sidebar && !sidebar.contains(event.target as Node)) {
        setIsMobileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileOpen]);

  const navItems = [
    { name: 'Dashboard', icon: <Home className="h-5 w-5" />, badge: null },
    { name: 'Analytics', icon: <BarChart3 className="h-5 w-5" />, badge: '3' },
    { name: 'Reports', icon: <FileText className="h-5 w-5" />, badge: null },
    { name: 'Real-time', icon: <Zap className="h-5 w-5" />, badge: 'Live' },
    { name: 'History', icon: <Clock className="h-5 w-5" />, badge: null },
    { name: 'Users', icon: <Users className="h-5 w-5" />, badge: '12' },
    { name: 'Database', icon: <Database className="h-5 w-5" />, badge: null },
    { name: 'Charts', icon: <PieChart className="h-5 w-5" />, badge: null },
  ];

  const secondaryItems = [
    { name: 'Notifications', icon: <Bell className="h-5 w-5" /> },
    { name: 'Settings', icon: <Settings className="h-5 w-5" /> },
    { name: 'Help', icon: <HelpCircle className="h-5 w-5" /> },
    { name: 'Privacy', icon: <Shield className="h-5 w-5" /> },
  ];

  const quickActions = [
    { name: 'Export Data', icon: <Download className="h-4 w-4" />, color: 'from-blue-500 to-cyan-500' },
    { name: 'New Report', icon: <FileText className="h-4 w-4" />, color: 'from-purple-500 to-pink-500' },
    { name: 'Add Widget', icon: <TrendingUp className="h-4 w-4" />, color: 'from-green-500 to-emerald-500' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Button - Only show on mobile */}
      {isMobile && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed left-4 top-20 z-50 rounded-lg bg-gray-800 p-2 shadow-lg md:hidden"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="h-5 w-5 text-white" />
        </motion.button>
      )}

      {/* Sidebar */}
      <motion.aside
        id="sidebar"
        initial={false}
        animate={{
          width: isCollapsed ? '5rem' : '16rem',
          // FIXED: Only animate X on mobile, keep visible on desktop
          x: isMobile ? (isMobileOpen ? 0 : '-100%') : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`
          fixed left-0 top-0 z-40 h-screen border-r border-gray-800 bg-gray-900/95
          md:relative md:left-0 md:block
          ${isMobileOpen ? 'shadow-2xl' : ''}
        `}
        style={{
          // Ensure sidebar is visible on desktop
          display: isMobile ? (isMobileOpen ? 'block' : 'none') : 'block',
        }}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between border-b border-gray-800 px-4">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="flex items-center space-x-3 overflow-hidden"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                  <BarChart3 className="h-4 w-4 text-white" />
                </div>
                <span className="font-semibold text-white">InsightFlow</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Collapse Button - Only show on desktop */}
          {!isMobile && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="ml-auto rounded-lg p-1 hover:bg-gray-800"
            >
              {isCollapsed ? (
                <ChevronRight className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronLeft className="h-5 w-5 text-gray-400" />
              )}
            </motion.button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4 bg-gray-900/95">
          {/* Quick Actions */}
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 space-y-2"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Quick Actions
                </p>
                {quickActions.map((action) => (
                  <motion.button
                    key={action.name}
                    whileHover={{ x: 5 }}
                    className="flex w-full items-center space-x-3 rounded-lg p-2 text-sm text-gray-300 hover:bg-gray-800"
                  >
                    <div className={`h-8 w-8 rounded-lg bg-gradient-to-r ${action.color} p-1.5`}>
                      {action.icon}
                    </div>
                    <span>{action.name}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Navigation */}
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Navigation
          </p>
          {navItems.map((item, index) => (
            <motion.a
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => {
                setActiveItem(item.name);
                if (isMobile) setIsMobileOpen(false);
              }}
              className={`
                group relative flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-all
                ${activeItem === item.name
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }
              `}
              href="#"
            >
              <div className="flex items-center space-x-3 ">
                <div className={`h-5 w-5 ${activeItem === item.name ? 'text-blue-400' : 'text-gray-500'}`}>
                  {item.icon}
                </div>
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="overflow-hidden"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Badge */}
              {item.badge && (
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`
                        rounded-full px-2 py-0.5 text-xs font-medium
                        ${item.badge === 'Live'
                          ? 'bg-red-500/20 text-red-400 animate-pulse'
                          : 'bg-blue-500/20 text-blue-400'
                        }
                      `}
                    >
                      {item.badge}
                    </motion.span>
                  )}
                </AnimatePresence>
              )}

              {/* Active Indicator */}
              {activeItem === item.name && !isCollapsed && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 h-6 w-1 rounded-r-full bg-gradient-to-b from-blue-400 to-purple-400"
                />
              )}
            </motion.a>
          ))}

          {/* Secondary Navigation */}
          <div className="pt-6 bg-gray-900/95">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              General
            </p>
            {secondaryItems.map((item, index) => (
              <motion.a
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navItems.length + index) * 0.05 }}
                onClick={() => {
                  if (isMobile) setIsMobileOpen(false);
                }}
                className="group flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm text-gray-400 transition-all hover:bg-gray-800 hover:text-white"
                href="#"
              >
                <div className="h-5 w-5">{item.icon}</div>
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.a>
            ))}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-gray-800 p-4 bg-gray-900/95">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500" />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="overflow-hidden"
                >
                  <p className="text-sm font-medium text-white">Alex Johnson</p>
                  <p className="text-xs text-gray-400">Admin</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;