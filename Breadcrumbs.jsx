import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { ROUTES } from '../../routes/routePaths';
import styles from './Breadcrumbs.module.css';

const ROUTE_NAME_MAP = {
  [ROUTES.DASHBOARD]: 'Executive Dashboard',
  [ROUTES.CUSTOMERS]: 'VIP Client Directory',
  [ROUTES.LIVE_CALLS]: 'Live Call Console',
  [ROUTES.AI_ASSISTANT]: 'AI Assistant & Recommendations',
  [ROUTES.FOLLOW_UP_QUEUE]: 'Concierge Follow-Up Queue',
  [ROUTES.PRODUCTS]: 'Luxury Catalog & Allocation',
  [ROUTES.KNOWLEDGE_BASE]: 'Concierge Knowledge Base',
  [ROUTES.ANALYTICS]: 'Performance & Analytics',
  [ROUTES.NOTIFICATIONS]: 'Command Notifications',
  [ROUTES.SETTINGS]: 'Workstation Settings',
};

export function Breadcrumbs() {
  const location = useLocation();
  const currentPath = location.pathname;
  const pageTitle = ROUTE_NAME_MAP[currentPath] || 'Overview';

  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
      <Link to={ROUTES.DASHBOARD} className={styles.homeLink}>
        <Home size={14} className={styles.homeIcon} />
        <span>RetailConnect</span>
      </Link>
      {currentPath !== ROUTES.DASHBOARD && (
        <>
          <ChevronRight size={14} className={styles.separator} />
          <span className={styles.currentPage}>{pageTitle}</span>
        </>
      )}
    </nav>
  );
}

export default Breadcrumbs;
