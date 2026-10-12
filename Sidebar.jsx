import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  PhoneCall,
  Crown,
  TrendingUp,
  Percent,
} from 'lucide-react';
import { NAVIGATION_ITEMS } from '../../data/navigationData';
import { useCallSession } from '../../hooks/useCallSession';
import Badge from '../common/Badge';
import styles from './Sidebar.module.css';

export function Sidebar({ isCollapsed, onToggleCollapse }) {
  const { isCallActive, startCall, endCall, customers, staff } = useCallSession();

  const handleSimulateCallToggle = () => {
    if (isCallActive) {
      endCall();
    } else {
      // Pick next customer or Sophia Sterling
      startCall(customers[0].id);
    }
  };

  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      {/* Brand Header */}
      <div className={styles.brandContainer}>
        <div className={styles.logoBadge}>
          <Crown size={20} className={styles.crownIcon} />
        </div>
        {!isCollapsed && (
          <div className={styles.brandText}>
            <h1 className={styles.brandTitle}>RetailConnect</h1>
            <span className={styles.brandSubtitle}>AI CALL CONCIERGE</span>
          </div>
        )}
        <button
          type="button"
          className={styles.collapseToggle}
          onClick={onToggleCollapse}
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className={styles.navMenu} aria-label="Main Navigation">
        <div className={styles.navGroupLabel}>{!isCollapsed && 'WORKSPACE'}</div>
        <ul className={styles.navList}>
          {NAVIGATION_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id} className={styles.navListItem}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                  }
                  title={isCollapsed ? item.label : undefined}
                >
                  <div className={styles.iconContainer}>
                    <Icon size={19} className={styles.navIcon} />
                    {item.badgeType === 'active' && isCallActive && (
                      <span className={styles.navLiveDot} />
                    )}
                  </div>

                  {!isCollapsed && (
                    <div className={styles.navLinkContent}>
                      <span className={styles.navLabel}>{item.label}</span>
                      {item.badge && (
                        <Badge
                          variant={item.badgeType || 'neutral'}
                          size="sm"
                          className={styles.navBadge}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Quick Action: Call Simulation CTA */}
      {!isCollapsed && (
        <div className={styles.simulationBox}>
          <div className={styles.simulationHeader}>
            <Sparkles size={14} className={styles.simSparkle} />
            <span>AI Telephony Sandbox</span>
          </div>
          <p className={styles.simulationText}>
            Simulate high-priority VIP customer interaction with real-time AI guidance.
          </p>
          <button
            type="button"
            className={`${styles.simButton} ${isCallActive ? styles.simActive : ''}`}
            onClick={handleSimulateCallToggle}
          >
            <PhoneCall size={14} />
            <span>{isCallActive ? 'Disconnect Call' : 'Simulate VIP Inbound'}</span>
          </button>
        </div>
      )}

      {/* Advisor Workstation Performance Summary */}
      {!isCollapsed && (
        <div className={styles.advisorFooterCard}>
          <div className={styles.advisorHeader}>
            <span className={styles.advisorLabel}>DAILY KPI TELEMETRY</span>
            <span className={styles.stationBadge}>{staff.station}</span>
          </div>
          <div className={styles.kpiRow}>
            <div className={styles.kpiItem}>
              <div className={styles.kpiValue}>
                <Percent size={12} className={styles.kpiIcon} />
                <span>{staff.metrics.conversionRate}</span>
              </div>
              <span className={styles.kpiTitle}>Conversion</span>
            </div>
            <div className={styles.kpiDivider} />
            <div className={styles.kpiItem}>
              <div className={styles.kpiValue}>
                <TrendingUp size={12} className={styles.kpiIconGold} />
                <span>{staff.metrics.csatScore}</span>
              </div>
              <span className={styles.kpiTitle}>VIP CSAT</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
