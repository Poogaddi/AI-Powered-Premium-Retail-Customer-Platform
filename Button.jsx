import React from 'react';
import { motion } from 'framer-motion';
import styles from './Button.module.css';

export function Button({
  children,
  variant = 'glass', // 'primary' | 'glass' | 'secondary' | 'danger' | 'ai' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon: Icon,
  iconRight: IconRight,
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  ...props
}) {
  const buttonClass = `
    ${styles.button}
    ${styles[variant] || styles.glass}
    ${styles[size] || styles.md}
    ${className}
  `.trim();

  return (
    <motion.button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.02, y: -1 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      {...props}
    >
      {Icon && <Icon className={styles.iconLeft} size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
      {children && <span className={styles.text}>{children}</span>}
      {IconRight && <IconRight className={styles.iconRight} size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
    </motion.button>
  );
}

export default Button;
