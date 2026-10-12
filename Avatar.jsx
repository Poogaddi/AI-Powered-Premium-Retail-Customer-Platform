import React from 'react';
import styles from './Avatar.module.css';

export function Avatar({
  src,
  name = '',
  size = 'md', // 'sm' | 'md' | 'lg' | 'xl'
  tier, // 'diamond' | 'platinum' | 'staff'
  status, // 'online' | 'busy' | 'incall'
  className = '',
}) {
  const getInitials = (n) => {
    if (!n) return 'RC';
    const parts = n.split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return n.slice(0, 2).toUpperCase();
  };

  const ringClass = tier ? styles[`ring_${tier}`] : '';

  return (
    <div className={`${styles.avatarContainer} ${styles[size]} ${ringClass} ${className}`}>
      {src ? (
        <img src={src} alt={name} className={styles.image} onError={(e) => { e.target.style.display = 'none'; }} />
      ) : (
        <div className={styles.initials}>{getInitials(name)}</div>
      )}
      {status && <span className={`${styles.statusDot} ${styles[`status_${status}`]}`} />}
    </div>
  );
}

export default Avatar;
