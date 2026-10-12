import React from 'react';
import { TrendingUp, PhoneCall, Crown } from 'lucide-react';
import styles from './HighIntentTable.module.css';

const INTENT_COLOR = (score) => {
  if (score >= 95) return '#EF4444';
  if (score >= 90) return '#F59E0B';
  return '#10B981';
};

export function HighIntentTable({ data }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <Crown size={16} className={styles.crown} />
          <h3 className={styles.title}>High Intent Customers</h3>
        </div>
        <button type="button" className={styles.viewAll}>View all</button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Client</th>
              <th>Tier</th>
              <th>Intent</th>
              <th>Opportunity</th>
              <th>Interest</th>
              <th>Last Touch</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              const intentColor = INTENT_COLOR(row.intent);
              return (
                <tr key={row.id}>
                  <td className={styles.nameCell}>
                    <div className={styles.avatar}>{row.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}</div>
                    <span className={styles.name}>{row.name}</span>
                  </td>
                  <td>
                    <span className={styles.tierBadge}>{row.tier}</span>
                  </td>
                  <td>
                    <div className={styles.intentBar}>
                      <div className={styles.intentFill} style={{ width: `${row.intent}%`, background: intentColor }} />
                      <span className={styles.intentNum} style={{ color: intentColor }}>{row.intent}%</span>
                    </div>
                  </td>
                  <td className={styles.opportunity}>{row.opportunity}</td>
                  <td className={styles.interest}>{row.interest}</td>
                  <td className={styles.lastTouch}>{row.lastTouch}</td>
                  <td>
                    <button type="button" className={styles.callBtn}>
                      <PhoneCall size={13} /> Call
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HighIntentTable;
