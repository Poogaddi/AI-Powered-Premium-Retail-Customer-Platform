import React from 'react';
import styles from './Loader.module.css';

export function Loader({ size = 'md', label = 'Loading telemetry...', fullScreen = false }) {
  const content = (
    <div className={`${styles.loaderWrapper} ${styles[size] || styles.md}`}>
      <div className={styles.spinner}>
        <div className={styles.innerRing} />
      </div>
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );

  if (fullScreen) {
    return <div className={styles.fullScreenOverlay}>{content}</div>;
  }

  return content;
}

export default Loader;
