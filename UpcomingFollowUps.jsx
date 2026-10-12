import React from 'react';
import { Clock, PhoneForwarded, CheckCircle2 } from 'lucide-react';
import styles from './UpcomingFollowUps.module.css';

const PRIORITY_STYLES = {
  Urgent: { color: '#EF4444', bg: 'rgba(239,68,68,0.1)',  border: 'rgba(239,68,68,0.3)'  },
  High:   { color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)' },
  Normal: { color: '#94A3B8', bg: 'rgba(148,163,184,0.1)', border: 'rgba(148,163,184,0.2)' },
};

export function UpcomingFollowUps({ data }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Upcoming Follow-Ups</h3>
        <span className={styles.countBadge}>{data.length} pending</span>
      </div>

      <div className={styles.list}>
        {data.map((item) => {
          const p = PRIORITY_STYLES[item.priority] || PRIORITY_STYLES.Normal;
          return (
            <div key={item.id} className={styles.item}>
              <div className={styles.priorityBar} style={{ background: p.color }} />
              <div className={styles.content}>
                <div className={styles.itemTop}>
                  <span className={styles.customer}>{item.customer}</span>
                  <span
                    className={styles.priorityTag}
                    style={{ color: p.color, background: p.bg, borderColor: p.border }}
                  >
                    {item.priority}
                  </span>
                </div>
                <p className={styles.task}>{item.task}</p>
                <div className={styles.itemBottom}>
                  <span className={styles.due}>
                    <Clock size={11} /> {item.due}
                  </span>
                  <span className={styles.value}>{item.value}</span>
                </div>
              </div>
              <div className={styles.actions}>
                <button type="button" className={styles.callBtn} title="Call client">
                  <PhoneForwarded size={14} />
                </button>
                <button type="button" className={styles.doneBtn} title="Mark complete">
                  <CheckCircle2 size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UpcomingFollowUps;
