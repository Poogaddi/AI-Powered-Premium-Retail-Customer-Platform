import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PhoneCall,
  PhoneOff,
  Mic,
  MicOff,
  Pause,
  Play,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { useCallSession } from '../../hooks/useCallSession';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';
import styles from './ActiveCallBanner.module.css';

export function ActiveCallBanner() {
  const {
    isCallActive,
    activeCustomer,
    callTimeFormatted,
    isMuted,
    isHold,
    isAiActive,
    toggleMute,
    toggleHold,
    endCall,
    activeCustomerRecommendations,
  } = useCallSession();

  if (!isCallActive || !activeCustomer) return null;

  const topRecommendation = (activeCustomerRecommendations && activeCustomerRecommendations.length > 0)
    ? activeCustomerRecommendations[0]
    : null;

  return (
    <AnimatePresence>
      <motion.div
        className={styles.bannerWrapper}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
      >
        <div className={styles.bannerContainer}>
          {/* Customer Telemetry */}
          <div className={styles.customerSection}>
            <Avatar
              src={activeCustomer.avatar}
              name={activeCustomer.name}
              size="md"
              tier="diamond"
              status="incall"
            />
            <div className={styles.customerMeta}>
              <div className={styles.customerNameRow}>
                <span className={styles.customerName}>{activeCustomer.name}</span>
                <Badge variant="diamond" size="sm">
                  {activeCustomer.tier}
                </Badge>
                <span className={styles.spendTag}>
                  ${(activeCustomer.lifetimeSpend / 1000).toFixed(0)}k LTV
                </span>
              </div>
              <div className={styles.callStatusRow}>
                <span className={styles.liveIndicator}>
                  <span className={styles.liveDot} />
                  LIVE CALL
                </span>
                <span className={styles.timer}>{callTimeFormatted}</span>
                <span className={styles.sentimentBadge}>
                  <TrendingUp size={12} />
                  {activeCustomer.sentiment}
                </span>
              </div>
            </div>
          </div>

          {/* AI Real-time Talking Point Ticker */}
          {isAiActive && topRecommendation && (
            <div className={styles.aiTickerSection}>
              <div className={styles.aiBadge}>
                <Sparkles size={13} className={styles.sparkleIcon} />
                <span>AI TALKING POINT</span>
              </div>
              <p className={styles.tickerText}>
                {topRecommendation.actionPrompt || topRecommendation.suggestedScript || topRecommendation.rationale}
              </p>
            </div>
          )}

          {/* Call Controls */}
          <div className={styles.controlsSection}>
            <button
              type="button"
              className={`${styles.controlBtn} ${isMuted ? styles.controlActive : ''}`}
              onClick={toggleMute}
              title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
            >
              {isMuted ? <MicOff size={18} /> : <Mic size={18} />}
              <span className={styles.btnLabel}>{isMuted ? 'Muted' : 'Mute'}</span>
            </button>

            <button
              type="button"
              className={`${styles.controlBtn} ${isHold ? styles.controlActive : ''}`}
              onClick={toggleHold}
              title={isHold ? 'Resume Call' : 'Hold Call'}
            >
              {isHold ? <Play size={18} /> : <Pause size={18} />}
              <span className={styles.btnLabel}>{isHold ? 'Resume' : 'Hold'}</span>
            </button>

            <button
              type="button"
              className={styles.endCallBtn}
              onClick={endCall}
              title="Wrap up and end interaction"
            >
              <PhoneOff size={18} />
              <span>Wrap Call</span>
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ActiveCallBanner;
