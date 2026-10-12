import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import Header from './Header';
import Breadcrumbs from '../navigation/Breadcrumbs';
import ActiveCallBanner from '../navigation/ActiveCallBanner';
import MobileNav from '../navigation/MobileNav';
import styles from './AppLayout.module.css';

export function AppLayout() {
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className={styles.layoutRoot}>
      {/* Desktop Collapsible Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
      />

      {/* Mobile Responsive Navigation Drawer */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />

      {/* Main App Canvas */}
      <div className={styles.mainCanvas}>
        {/* Top Navigation & Status Bar */}
        <Header
          onToggleMobileNav={() => setIsMobileNavOpen(true)}
          isMobileNavOpen={isMobileNavOpen}
        />

        {/* Dynamic Route Content Area */}
        <main className={styles.contentArea}>
          <div className={styles.innerContainer}>
            <Breadcrumbs />
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        {/* Floating Call Bar for Active Interactions */}
        <ActiveCallBanner />
      </div>
    </div>
  );
}

export default AppLayout;
