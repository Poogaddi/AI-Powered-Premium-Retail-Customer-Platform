/* ─────────────────────────────────────────────────────────────
   KPI Card Component
───────────────────────────────────────────────────────────── */
import React from 'react';
import { motion } from 'framer-motion';
import {
  PhoneCall, Users, Clock, TrendingUp, DollarSign, Timer,
  ListTodo, PhoneMissed, ArrowUpRight, ArrowDownRight,
} from 'lucide-react';
import styles from './KpiCard.module.css';

const ICONS = { PhoneCall, Users, Clock, TrendingUp, DollarSign, Timer, ListTodo, PhoneMissed };

const COLOR_MAP = {
  blue:   { bg: 'rgba(59,130,246,0.1)',  border: 'rgba(59,130,246,0.3)',  text: '#3B82F6'  },
  purple: { bg: 'rgba(139,92,246,0.1)',  border: 'rgba(139,92,246,0.3)',  text: '#8B5CF6'  },
  orange: { bg: 'rgba(249,115,22,0.1)',  border: 'rgba(249,115,22,0.3)',  text: '#F97316'  },
  green:  { bg: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.3)',  text: '#10B981'  },
  gold:   { bg: 'rgba(212,175,55,0.12)', border: 'rgba(212,175,55,0.35)', text: '#D4AF37'  },
  cyan:   { bg: 'rgba(6,182,212,0.1)',   border: 'rgba(6,182,212,0.3)',   text: '#06B6D4'  },
  amber:  { bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.3)',  text: '#F59E0B'  },
  red:    { bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.3)',   text: '#EF4444'  },
};

export function KpiCard({ card, index }) {
  const Icon = ICONS[card.icon] || TrendingUp;
  const palette = COLOR_MAP[card.color] || COLOR_MAP.blue;

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: 'easeOut' }}
      whileHover={{ y: -3, transition: { duration: 0.18 } }}
      style={{ '--card-color': palette.text, '--card-bg': palette.bg, '--card-border': palette.border }}
    >
      <div className={styles.top}>
        <span className={styles.label}>{card.label}</span>
        <div className={styles.iconWrap}>
          <Icon size={18} />
        </div>
      </div>

      <div className={styles.value}>{card.value}</div>

      <div className={styles.bottom}>
        <span className={`${styles.change} ${card.positive ? styles.positive : styles.negative}`}>
          {card.positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
          {card.change}
        </span>
        <span className={styles.sub}>{card.sub}</span>
      </div>
    </motion.div>
  );
}

export default KpiCard;
