import React from 'react';
import { motion } from 'framer-motion';
import styles from './GlassCard.module.css';

export function GlassCard({
  children,
  variant = 'default', // 'default' | 'elevated' | 'ai' | 'vip' | 'subtle'
  hover = false,
  className = '',
  onClick,
  ...props
}) {
  const cardClass = `
    ${styles.card}
    ${styles[variant] || styles.default}
    ${hover ? styles.hoverable : ''}
    ${className}
  `.trim();

  return (
    <motion.div
      className={cardClass}
      onClick={onClick}
      whileHover={hover ? { y: -3, transition: { duration: 0.2 } } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default GlassCard;
