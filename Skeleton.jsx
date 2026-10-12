import React from 'react';
import styles from './Skeleton.module.css';

export function Skeleton({
  width = '100%',
  height = '20px',
  borderRadius = 'var(--radius-sm)',
  className = '',
  style = {},
}) {
  return (
    <div
      className={`${styles.skeleton} ${className}`}
      style={{
        width,
        height,
        borderRadius,
        ...style,
      }}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className={styles.cardSkeleton}>
      <Skeleton width="40px" height="40px" borderRadius="var(--radius-md)" />
      <div className={styles.cardLines}>
        <Skeleton width="60%" height="16px" />
        <Skeleton width="90%" height="12px" />
      </div>
      <div className={styles.cardBottom}>
        <Skeleton width="40%" height="22px" />
        <Skeleton width="30%" height="28px" borderRadius="var(--radius-sm)" />
      </div>
    </div>
  );
}

export default Skeleton;
