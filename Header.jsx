import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  MapPin,
  Sparkles,
  PhoneCall,
  PhoneOff,
  Mic,
  MicOff,
  Bell,
  Search,
  ChevronDown,
} from 'lucide-react';
import { ROUTES } from '../../routes/routePaths';
import { useCallSession } from '../../hooks/useCallSession';
import ThemeToggle from '../common/ThemeToggle';
import Badge from '../common/Badge';
import Avatar from '../common/Avatar';
import styles from './Header.module.css';

export function Header({ onToggleMobileNav, isMobileNavOpen }) {
  const navigate = useNavigate();
  const {
    isCallActive,
    activeCustomer,
    callTimeFormatted,
    isMuted,
    isHold,
    isAiActive,
    selectedStore,
    setSelectedStore,
    staff,
    toggleMute,
    toggleHold,
    endCall,
    toggleAi,
  } = useCallSession();

  const [isStoreDropdownOpen, setIsStoreDropdownOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        {/* Mobile Hamburger */}
        <button
          type="button"
          className={styles.mobileMenuButton}
          onClick={onToggleMobileNav}
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} />
        </button>

        {/* Store Boutique Selector */}
        <div className={styles.storeSelectorWrapper}>
          <button
            type="button"
            className={styles.storeSelectorButton}
            onClick={() => setIsStoreDropdownOpen(!isStoreDropdownOpen)}
          >
            <MapPin size={16} className={styles.storeIcon} />
            <span className={styles.storeName}>{selectedStore}</span>
            <ChevronDown size={14} className={styles.chevron} />
          </button>

          {isStoreDropdownOpen && (
            <div className={styles.storeDropdown}>
              {staff.assignedStores.map((store) => (
                <button
                  key={store}
                  type="button"
                  className={`${styles.storeDropdownItem} ${store === selectedStore ? styles.storeActive : ''}`}
                  onClick={() => {
                    setSelectedStore(store);
                    setIsStoreDropdownOpen(false);
                  }}
                >
                  <MapPin size={14} />
                  <span>{store}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Global Search Bar */}
        <div className={styles.searchWrapper}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search VIP customer, phone, or luxury item..."
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.rightSection}>
        {/* Active Call Quick Banner in Header */}
        {isCallActive && activeCustomer && (
          <div className={styles.activeCallPill}>
            <div className={styles.callLiveDot} />
            <PhoneCall size={15} className={styles.phoneIcon} />
            <div className={styles.callMeta}>
              <span className={styles.customerName}>{activeCustomer.name}</span>
              <span className={styles.callTimer}>{callTimeFormatted}</span>
            </div>
            <Badge variant="diamond" size="sm">
              {activeCustomer.tier}
            </Badge>

            <div className={styles.quickCallActions}>
              <button
                type="button"
                className={`${styles.quickActionBtn} ${isMuted ? styles.actionActive : ''}`}
                onClick={toggleMute}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <MicOff size={14} /> : <Mic size={14} />}
              </button>
              <button
                type="button"
                className={styles.hangupBtn}
                onClick={endCall}
                title="End Interaction"
              >
                <PhoneOff size={14} />
              </button>
            </div>
          </div>
        )}

        {/* AI Copilot Status Toggle */}
        <button
          type="button"
          className={`${styles.aiStatusButton} ${isAiActive ? styles.aiActive : ''}`}
          onClick={toggleAi}
          title="Toggle AI Assist Telemetry"
        >
          <Sparkles size={16} className={styles.sparkleIcon} />
          <span className={styles.aiText}>AI Copilot {isAiActive ? 'Active' : 'Standby'}</span>
        </button>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <div className={styles.notificationWrapper}>
          <button
            type="button"
            className={styles.notificationBtn}
            onClick={() => navigate(ROUTES.NOTIFICATIONS)}
            aria-label="View notifications"
            title="Notifications"
          >
            <Bell size={18} />
            <span className={styles.notifBadge}>3</span>
          </button>
        </div>

        {/* Staff Advisor Profile Pill */}
        <div
          className={styles.staffProfilePill}
          onClick={() => navigate(ROUTES.SETTINGS)}
          style={{ cursor: 'pointer' }}
          title="Workstation Settings & Profile"
        >
          <Avatar
            src={staff.avatar}
            name={staff.name}
            size="sm"
            tier="staff"
            status="online"
          />
          <div className={styles.staffDetails}>
            <span className={styles.staffName}>{staff.name}</span>
            <span className={styles.staffStation}>{staff.station}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
