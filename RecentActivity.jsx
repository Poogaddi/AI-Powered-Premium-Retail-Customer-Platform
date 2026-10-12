import React from 'react';
import {
  PhoneCall, Sparkles, AlertCircle, DollarSign,
  PhoneMissed, UserPlus, BookOpen,
} from 'lucide-react';
import styles from './RecentActivity.module.css';

const ICON_MAP = {
  PhoneCall, Sparkles, AlertCircle, DollarSign, PhoneMissed, UserPlus, BookOpen,
};

const COLOR_MAP = {
  green:  { bg: 'rgba(16,185,129,0.12)',  text: '#10B981' },
  purple: { bg: 'rgba(139,92,246,0.12)',  text: '#8B5CF6' },
  amber:  { bg: 'rgba(245,158,11,0.12)',  text: '#F59E0B' },
  gold:   { bg: 'rgba(212,175,55,0.12)',  text: '#D4AF37' },
  red:    { bg: 'rgba(239,68,68,0.12)',   text: '#EF4444' },
  blue:   { bg: 'rgba(59,130,246,0.12)',  text: '#3B82F6' },
  cyan:   { bg: 'rgba(6,182,212,0.12)',   text: '#06B6D4' },
};

export function RecentActivity({ activities }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Recent Activity</h3>
        <button type="button" className={styles.viewAll}>View all</button>
      </div>
      <div className={styles.list}>
        {activities.map((act) => {
          const Icon = ICON_MAP[act.icon] || PhoneCall;
          const palette = COLOR_MAP[act.color] || COLOR_MAP.blue;
          return (
            <div key={act.id} className={styles.item}>
              <div className={styles.iconWrap} style={{ background: palette.bg }}>
                <Icon size={15} style={{ color: palette.text }} />
              </div>
              <div className={styles.content}>
                <p className={styles.message}>{act.message}</p>
                <span className={styles.time}>{act.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecentActivity;
