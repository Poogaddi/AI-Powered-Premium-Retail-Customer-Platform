import React from 'react';
import styles from './Badge.module.css';

export function Badge({
  children,
  variant = 'neutral', // 'diamond' | 'platinum' | 'gold' | 'ai' | 'success' | 'danger' | 'warning' | 'neutral'
  size = 'sm', // 'sm' | 'md'
  dot = false,
  className = '',
}) {
  const badgeClass = `
    ${styles.badge}
    ${styles[variant] || styles.neutral}
    ${styles[size] || styles.sm}
    ${className}
  `.trim();

  return (
    <span className={badgeClass}>
      {dot && <span className={`${styles.dot} ${styles[`dot_${variant}`]}`} />}
      {children}
    </span>
  );
}

export default Badge;
