import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, PhoneCall, Mail, MapPin, Sparkles, Filter,
  Calendar, DollarSign, Clock, Store, ChevronRight, X,
  ShoppingBag, ArrowUpRight, CheckCircle2, UserCheck, AlertCircle,
  Edit3, Save
} from 'lucide-react';
import { useCallSession } from '../hooks/useCallSession';
import PageHeader from '../components/common/PageHeader';
import GlassCard from '../components/common/GlassCard';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Avatar from '../components/common/Avatar';
import Modal from '../components/common/Modal';
import { useToast } from '../hooks/useToast';
import styles from './CustomersPage.module.css';

const STAGES = ['All Stages', 'Post Store Visit (48h Window)', 'Demo Attended', 'Negotiation & Offers', 'Live Telephony Consultation'];

export function CustomersPage() {
  const { customers, startCall, activeCustomerId } = useCallSession();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState('All Stages');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editedNotes, setEditedNotes] = useState('');
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const toast = useToast();

  const filteredCustomers = customers.filter((cust) => {
    const matchesSearch =
      cust.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cust.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cust.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cust.preferredProducts.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStage = selectedStage === 'All Stages' || cust.leadStage === selectedStage;
    return matchesSearch && matchesStage;
  });

  const handleOpenProfile = (cust) => {
    setSelectedCustomer(cust);
    setEditedNotes(cust.notes || '');
    setIsEditingNotes(false);
  };

  const handleSaveNotes = () => {
    if (selectedCustomer) {
      selectedCustomer.notes = editedNotes;
      setIsEditingNotes(false);
      toast?.success?.('Customer consultation notes updated');
    }
  };

  const handleDirectCall = (e, custId) => {
    e.stopPropagation();
    startCall(custId);
    toast?.info?.('Connecting to customer workstation...');
  };

  return (
    <div className={styles.page}>
      <PageHeader
        title="Customer Success Management"
        subtitle="Manage customer relationships after store visits, track lead stages, buying budgets, intent scores, and purchase histories."
        badge={<Badge variant="gold"><UserCheck size={11} /> {customers.length} ACTIVE LEADS</Badge>}
        actions={
          <div className={styles.headerStats}>
            <span className={styles.statChip}>
              <Sparkles size={13} className={styles.aiSparkle} /> 42 High Intent (&gt;85%)
            </span>
          </div>
        }
      />

      {/* Search and Filters Bar */}
      <div className={styles.controlsBar}>
        <div className={styles.searchWrapper}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search customer name, phone, email, or electronics interest..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.stagePills}>
          {STAGES.map((stg) => (
            <button
              key={stg}
              type="button"
              className={`${styles.stagePill} ${selectedStage === stg ? styles.stagePillActive : ''}`}
              onClick={() => setSelectedStage(stg)}
            >
              {stg}
            </button>
          ))}
        </div>
      </div>

      {/* Customer Grid */}
      <div className={styles.customersGrid}>
        {filteredCustomers.map((cust) => {
          const isActiveCall = cust.id === activeCustomerId;
          return (
            <GlassCard
              key={cust.id}
              variant={isActiveCall ? 'vip' : 'default'}
              hover
              className={styles.customerCard}
              onClick={() => handleOpenProfile(cust)}
            >
              <div className={styles.cardHeader}>
                <div className={styles.headerUser}>
                  <Avatar
                    src={cust.avatar}
                    name={cust.name}
                    size="md"
                    status={isActiveCall ? 'incall' : cust.status === 'High Intent' ? 'online' : 'away'}
                  />
                  <div>
                    <h3 className={styles.custName}>{cust.name}</h3>
                    <span className={styles.storeText}>
                      <MapPin size={12} /> {cust.primaryStore}
                    </span>
                  </div>
                </div>

                <div className={styles.intentScoreBadge}>
                  <span className={styles.intentScoreValue}>{cust.intentScore}%</span>
                  <span className={styles.intentScoreLabel}>INTENT</span>
                </div>
              </div>

              {/* Status and Stage */}
              <div className={styles.metaRow}>
                <Badge
                  variant={
                    cust.status === 'High Intent'
                      ? 'gold'
                      : cust.status === 'In Call'
                      ? 'active'
                      : 'neutral'
                  }
                  size="sm"
                >
                  {cust.status}
                </Badge>
                <span className={styles.leadStageText}>{cust.leadStage}</span>
              </div>

              {/* Budget and Preferred Items */}
              <div className={styles.infoSection}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Budget:</span>
                  <span className={styles.infoValue}>{cust.buyingBudget}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Preferred:</span>
                  <span className={styles.infoValue}>
                    {cust.preferredProducts.slice(0, 2).join(', ')}
                  </span>
                </div>
              </div>

              {/* Card Footer */}
              <div className={styles.cardFooter}>
                <button
                  type="button"
                  className={styles.callButton}
                  onClick={(e) => handleDirectCall(e, cust.id)}
                >
                  <PhoneCall size={13} />
                  <span>{isActiveCall ? 'Active Call' : 'Start Consultation'}</span>
                </button>

                <button
                  type="button"
                  className={styles.detailsButton}
                  onClick={() => handleOpenProfile(cust)}
                >
                  <span>Profile & Timeline</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Detailed Customer Profile Modal */}
      {selectedCustomer && (
        <Modal
          isOpen={!!selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          title={selectedCustomer.name}
          subtitle={`Client ID: ${selectedCustomer.id} • ${selectedCustomer.primaryStore}`}
          maxWidth="760px"
          footer={
            <div className={styles.modalFooterContent}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedCustomer(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={PhoneCall}
                onClick={(e) => {
                  handleDirectCall(e, selectedCustomer.id);
                  setSelectedCustomer(null);
                }}
              >
                Connect Call
              </Button>
            </div>
          }
        >
          <div className={styles.profileModalBody}>
            {/* Quick Metrics Bar */}
            <div className={styles.modalMetricsBar}>
              <div className={styles.modalMetric}>
                <span className={styles.metricLabel}>Intent Score</span>
                <span className={styles.metricValGold}>{selectedCustomer.intentScore}%</span>
              </div>
              <div className={styles.modalMetric}>
                <span className={styles.metricLabel}>Buying Budget</span>
                <span className={styles.metricVal}>{selectedCustomer.buyingBudget}</span>
              </div>
              <div className={styles.modalMetric}>
                <span className={styles.metricLabel}>Lifetime Spend</span>
                <span className={styles.metricVal}>{selectedCustomer.lifetimeSpend}</span>
              </div>
              <div className={styles.modalMetric}>
                <span className={styles.metricLabel}>Lead Stage</span>
                <span className={styles.metricValPurple}>{selectedCustomer.leadStage}</span>
              </div>
            </div>

            {/* Store Visit History */}
            <div className={styles.modalSection}>
              <div className={styles.sectionHeader}>
                <Store size={15} className={styles.sectionIcon} />
                <h4>Store Visit History</h4>
              </div>
              <div className={styles.visitsList}>
                {selectedCustomer.storeVisits.map((visit, i) => (
                  <div key={i} className={styles.visitCard}>
                    <div className={styles.visitTop}>
                      <span className={styles.visitDate}>{visit.date}</span>
                      <span className={styles.visitAdvisor}>Advisor: {visit.advisor}</span>
                    </div>
                    <div className={styles.visitProducts}>
                      <span className={styles.prodsLabel}>Demonstrated:</span>{' '}
                      {visit.demonstratedProducts.join(' • ')}
                    </div>
                    <p className={styles.visitNotes}>{visit.notes}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Purchase History */}
            <div className={styles.modalSection}>
              <div className={styles.sectionHeader}>
                <ShoppingBag size={15} className={styles.sectionIcon} />
                <h4>Purchase History</h4>
              </div>
              <div className={styles.purchasesTable}>
                {selectedCustomer.purchaseHistory.map((item, i) => (
                  <div key={i} className={styles.purchaseRow}>
                    <div className={styles.purchItem}>
                      <span className={styles.purchName}>{item.item}</span>
                      <span className={styles.purchSerial}>SN: {item.serial}</span>
                    </div>
                    <Badge variant="neutral" size="sm">{item.brand}</Badge>
                    <span className={styles.purchPrice}>${item.price.toLocaleString()}</span>
                    <span className={styles.purchDate}>{item.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Journey Timeline */}
            <div className={styles.modalSection}>
              <div className={styles.sectionHeader}>
                <Clock size={15} className={styles.sectionIcon} />
                <h4>Customer Journey & Interaction Timeline</h4>
              </div>
              <div className={styles.timeline}>
                {selectedCustomer.journeyTimeline.map((item, i) => (
                  <div key={i} className={styles.timelineItem}>
                    <div className={styles.timelineDot} />
                    <div className={styles.timelineContent}>
                      <div className={styles.timelineTop}>
                        <span className={styles.timelineTitle}>{item.title}</span>
                        <span className={styles.timelineDate}>{item.date}</span>
                      </div>
                      <p className={styles.timelineDesc}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Notes */}
            <div className={styles.modalSection}>
              <div className={styles.sectionHeader}>
                <Edit3 size={15} className={styles.sectionIcon} />
                <h4>Advisor Consultation Notes</h4>
              </div>
              {isEditingNotes ? (
                <div className={styles.notesEditWrap}>
                  <textarea
                    rows={3}
                    value={editedNotes}
                    onChange={(e) => setEditedNotes(e.target.value)}
                    className={styles.notesInput}
                  />
                  <div className={styles.notesActions}>
                    <Button variant="outline" size="sm" onClick={() => setIsEditingNotes(false)}>
                      Cancel
                    </Button>
                    <Button variant="primary" size="sm" icon={Save} onClick={handleSaveNotes}>
                      Save Notes
                    </Button>
                  </div>
                </div>
              ) : (
                <div className={styles.notesDisplay}>
                  <p className={styles.notesText}>{selectedCustomer.notes}</p>
                  <button
                    type="button"
                    className={styles.editNotesBtn}
                    onClick={() => setIsEditingNotes(true)}
                  >
                    <Edit3 size={12} /> Edit Notes
                  </button>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default CustomersPage;
