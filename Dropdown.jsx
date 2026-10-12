import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useClickOutside } from '../../hooks/useClickOutside';
import styles from './Dropdown.module.css';

export function Dropdown({
  trigger,
  items = [],
  value,
  onChange,
  align = 'left',
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useClickOutside(ref, () => setIsOpen(false));

  const handleSelect = (item) => {
    onChange?.(item);
    setIsOpen(false);
  };

  return (
    <div className={`${styles.dropdownWrapper} ${className}`} ref={ref}>
      {trigger ? (
        <div onClick={() => setIsOpen(!isOpen)}>{trigger(isOpen)}</div>
      ) : (
        <button
          type="button"
          className={styles.defaultTrigger}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{value || 'Select option'}</span>
          <ChevronDown
            size={14}
            className={`${styles.chevron} ${isOpen ? styles.chevronRotated : ''}`}
          />
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className={`${styles.menu} ${align === 'right' ? styles.alignRight : styles.alignLeft}`}
          >
            {items.map((item, idx) => {
              if (item.divider) {
                return <div key={`div-${idx}`} className={styles.divider} />;
              }
              const Icon = item.icon;
              return (
                <button
                  key={item.id || item.value || idx}
                  type="button"
                  className={`${styles.item} ${value === item.value ? styles.itemSelected : ''}`}
                  onClick={() => handleSelect(item)}
                >
                  {Icon && <Icon size={14} className={styles.itemIcon} />}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dropdown;
