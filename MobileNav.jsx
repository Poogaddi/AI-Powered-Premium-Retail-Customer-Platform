import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Crown, Sparkles } from 'lucide-react';
import { NAVIGATION_ITEMS } from '../../data/navigationData';
import { useCallSession } from '../../hooks/useCallSession';
import Badge from '../common/Badge';
import ThemeToggle from '../common/ThemeToggle';
import styles from './MobileNav.module.css';

export function MobileNav({ isOpen, onClose }) {
  const { isCallActive } = useCallSession();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer Panel */}
          <motion.aside
            className={styles.drawer}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className={styles.drawerHeader}>
              <div className={styles.brandRow}>
                <div className={styles.logoBadge}>
                  <Crown size={18} className={styles.crownIcon} />
                </div>
                <div className={styles.brandInfo}>
                  <span className={styles.brandTitle}>RetailConnect</span>
                  <span className={styles.brandSubtitle}>AI CALL CONCIERGE</span>
                </div>
              </div>

              <button
                type="button"
                className={styles.closeBtn}
                onClick={onClose}
                aria-label="Close navigation menu"
              >
                <X size={20} />
              </button>
            </div>

            <nav className={styles.navLinks} aria-label="Mobile Navigation">
              {NAVIGATION_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    className={({ isActive }) =>
                      `${styles.link} ${isActive ? styles.linkActive : ''}`
                    }
                    onClick={onClose}
                  >
                    <div className={styles.linkLeft}>
                      <Icon size={18} className={styles.linkIcon} />
                      <span className={styles.linkLabel}>{item.label}</span>
                    </div>
                    {item.badge && (
                      <Badge variant={item.badgeType || 'neutral'} size="sm">
                        {item.badge}
                      </Badge>
                    )}
                  </NavLink>
                );
              })}
            </nav>

            <div className={styles.drawerFooter}>
              <div className={styles.themeToggleWrapper}>
                <span className={styles.themeLabel}>Appearance</span>
                <ThemeToggle />
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export default MobileNav;
