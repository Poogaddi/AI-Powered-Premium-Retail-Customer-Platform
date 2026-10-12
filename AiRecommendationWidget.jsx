import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, ChevronRight } from 'lucide-react';
import styles from './AiRecommendationWidget.module.css';

export function AiRecommendationWidget({ data }) {
  return (
    <div className={styles.widget}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <Sparkles size={16} className={styles.sparkle} />
          <h3 className={styles.title}>AI Recommendation Engine</h3>
        </div>
        <span className={styles.liveBadge}>
          <span className={styles.liveDot} />
          LIVE COPILOT
        </span>
      </div>

      <div className={styles.recList}>
        {data.map((rec, i) => (
          <motion.div
            key={i}
            className={styles.recItem}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
          >
            <div className={styles.recTop}>
              <div className={styles.recLeft}>
                <span className={styles.recType}>{rec.type}</span>
                <span className={styles.recCustomer}>{rec.customer}</span>
              </div>
              <div className={styles.confidencePill}>
                <TrendingUp size={12} />
                {rec.confidence}%
              </div>
            </div>
            <p className={styles.recText}>{rec.rec}</p>
            <div className={styles.recFooter}>
              <span className={styles.potential}>{rec.potential} opportunity</span>
              <button type="button" className={styles.applyBtn}>
                Apply <ChevronRight size={13} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default AiRecommendationWidget;
