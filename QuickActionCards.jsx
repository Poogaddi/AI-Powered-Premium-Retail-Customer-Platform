import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PhoneCall, TrendingUp, Sparkles, Package, ArrowRight } from 'lucide-react';
import { quickActionCards } from '../../data/dashboardData';
import Badge from '../common/Badge';
import styles from './QuickActionCards.module.css';

const ICON_MAP = {
  PhoneCall,
  TrendingUp,
  Sparkles,
  Package,
};

export function QuickActionCards() {
  return (
    <div className={styles.grid}>
      {quickActionCards.map((item, index) => {
        const Icon = ICON_MAP[item.icon] || Sparkles;
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link to={item.route} className={styles.card}>
              <div className={styles.cardHeader}>
                <div
                  className={styles.iconBox}
                  style={{ background: `${item.color}15`, color: item.color }}
                >
                  <Icon size={18} />
                </div>
                <Badge variant={item.badgeVariant || 'neutral'} size="sm">
                  {item.badge}
                </Badge>
              </div>

              <div className={styles.cardContent}>
                <h4 className={styles.cardTitle}>{item.title}</h4>
                <p className={styles.cardDesc}>{item.desc}</p>
              </div>

              <div className={styles.cardFooter}>
                <span className={styles.actionText}>Launch Action</span>
                <ArrowRight size={14} className={styles.arrowIcon} />
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}

export default QuickActionCards;
