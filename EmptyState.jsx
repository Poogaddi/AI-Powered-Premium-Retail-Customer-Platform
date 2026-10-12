import React from 'react';
import { PackageOpen } from 'lucide-react';
import Button from './Button';
import styles from './EmptyState.module.css';

export function EmptyState({
  icon: Icon = PackageOpen,
  title = 'No Records Found',
  description = 'No matching information found in this directory. Try refining your criteria or refresh the view.',
  actionLabel,
  onAction,
}) {
  return (
    <div className={styles.emptyContainer}>
      <div className={styles.iconCircle}>
        <Icon size={32} className={styles.icon} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      {actionLabel && onAction && (
        <div className={styles.actionWrap}>
          <Button variant="primary" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}

export default EmptyState;
