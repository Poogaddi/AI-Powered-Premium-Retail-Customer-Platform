import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Search, MessageSquare, TrendingUp, AlertTriangle,
  Zap, Copy, Check, ShieldCheck, HeartHandshake, BookOpen,
  ArrowRight, CheckCircle2, ChevronRight, User, ShoppingBag
} from 'lucide-react';
import { useCallSession } from '../hooks/useCallSession';
import PageHeader from '../components/common/PageHeader';
import GlassCard from '../components/common/GlassCard';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Avatar from '../components/common/Avatar';
import { useToast } from '../hooks/useToast';
import styles from './AiRecommendationsPage.module.css';

const SUGGESTED_REPLIES_MAP = {
  Greeting: [
    '"Good afternoon Marcus! Thank you for following up after your visit to our Fifth Avenue experience center yesterday."',
    '"Hello Marcus, Liam Bennett briefed me on your living room dimensions and interest in the Sony BRAVIA 9 85-inch."',
  ],
  'Anti-Glare Objection': [
    '"Regarding afternoon window glare: the BRAVIA 9 utilizes XR Backlight Master Drive with 4,000 nits peak luminance—over 3 times brighter than OLED."',
    '"The BRAVIA 9 incorporates Sony\'s proprietary X-Anti Reflection optical polarization, so direct sunlight will not wash out contrast or color saturation."',
  ],
  'Financing & Trade-in': [
    '"We offer 24-month zero percent APR financing, which brings your BRAVIA 9 investment to just $199 per month with zero down payment."',
    '"Through our trade-in program, we can credit up to $350 on your existing 65-inch screen and handle removal complimentary."',
  ],
  Closing: [
    '"If we confirm your order before 2 PM today, our certified installation team can schedule white-glove delivery and acoustic calibration for tomorrow afternoon."',
  ],
};

const KNOWLEDGE_SNIPPETS = [
  {
    query: 'sony bravia 9 vs lg oled g4',
    title: 'Sony BRAVIA 9 vs LG G4 In-Depth Comparison',
    answer: 'BRAVIA 9 (Mini LED) excels in high-ambient-light sunlit rooms with 4,000 nits peak brightness. LG G4 (OLED) offers perfect zero blacks for pitch-dark cinema rooms.',
  },
  {
    query: 'applecare+ damage limits',
    title: 'AppleCare+ 2026 Policy Summary',
    answer: 'Unlimited accidental damage incidents. $29 screen/back glass repair, $99 for all other accidental damage. 24/7 priority technical support.',
  },
  {
    query: 'trade in pickup',
    title: 'White-Glove Home Exchange Service',
    answer: 'Courier inspects cosmetic tier at doorstep, confirms find-my deactivation, and hands over brand-new sealed unit with zero store visits required.',
  },
];

export function AiRecommendationsPage() {
  const { customers } = useCallSession();
  const [selectedCustomerId, setSelectedCustomerId] = useState(customers[0]?.id || 'cust-elec-001');
  const [activeTab, setActiveTab] = useState('Anti-Glare Objection');
  const [knowledgeSearch, setKnowledgeSearch] = useState('');
  const [copiedIndex, setCopiedIndex] = useState(null);
  const toast = useToast();

  const customer = customers.find((c) => c.id === selectedCustomerId) || customers[0];

  const handleCopyReply = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    toast?.success?.('Suggested verbatim copied to clipboard');
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const filteredSnippets = KNOWLEDGE_SNIPPETS.filter(
    (s) =>
      s.title.toLowerCase().includes(knowledgeSearch.toLowerCase()) ||
      s.answer.toLowerCase().includes(knowledgeSearch.toLowerCase()) ||
      s.query.toLowerCase().includes(knowledgeSearch.toLowerCase())
  );

  return (
    <div className={styles.page}>
      <PageHeader
        title="Modern AI Assistant Panel"
        subtitle="Autonomous conversation intelligence, purchase propensity telemetry, risk detection, and dynamic offer scripting."
        badge={<Badge variant="ai"><Sparkles size={11} /> NEURAL COPILOT V4.2</Badge>}
        actions={
          <div className={styles.clientSelectorWrap}>
            <span className={styles.selectorLabel}>Active Customer:</span>
            <select
              value={selectedCustomerId}
              onChange={(e) => setSelectedCustomerId(e.target.value)}
              className={styles.clientSelect}
            >
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.intentScore}% Intent)
                </option>
              ))}
            </select>
          </div>
        }
      />

      {/* Top Telemetry Metric Ribbons */}
      <div className={styles.metricsRibbon}>
        <GlassCard variant="ai" className={styles.ribbonCard}>
          <div className={styles.ribbonTop}>
            <span className={styles.ribbonLabel}>PURCHASE PROBABILITY</span>
            <Sparkles size={16} className={styles.goldSparkle} />
          </div>
          <div className={styles.ribbonValGold}>{customer.intentScore}%</div>
          <span className={styles.ribbonSub}>High Intent Propensity</span>
        </GlassCard>

        <GlassCard variant="default" className={styles.ribbonCard}>
          <div className={styles.ribbonTop}>
            <span className={styles.ribbonLabel}>CUSTOMER EMOTION</span>
            <HeartHandshake size={16} className={styles.blueIcon} />
          </div>
          <div className={styles.ribbonValGreen}>Enthusiastic (94%)</div>
          <span className={styles.ribbonSub}>Receptive to Quality Arguments</span>
        </GlassCard>

        <GlassCard variant="default" className={styles.ribbonCard}>
          <div className={styles.ribbonTop}>
            <span className={styles.ribbonLabel}>OPPORTUNITY SCORE</span>
            <TrendingUp size={16} className={styles.purpleIcon} />
          </div>
          <div className={styles.ribbonVal}>9.2 / 10</div>
          <span className={styles.ribbonSub}>Est. Value: $5,298 Bundle</span>
        </GlassCard>

        <GlassCard variant="default" className={styles.ribbonCard}>
          <div className={styles.ribbonTop}>
            <span className={styles.ribbonLabel}>PRIMARY RISK FACTOR</span>
            <AlertTriangle size={16} className={styles.redIcon} />
          </div>
          <div className={styles.ribbonValRed}>Sunlight Glare Objection</div>
          <span className={styles.ribbonSub}>Resolved via 4k-Nit Luminance</span>
        </GlassCard>
      </div>

      {/* 2-Column Main Workspace */}
      <div className={styles.workspaceGrid}>
        {/* Left Column: Customer Summary + Suggested Replies + Risk Detection */}
        <div className={styles.leftColumn}>
          {/* Customer Summary & Journey Analysis */}
          <GlassCard className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderTitle}>
                <User size={15} className={styles.headerIcon} />
                <h3>Customer Synthesis & Store Visit Analysis</h3>
              </div>
              <Badge variant="gold">{customer.leadStage}</Badge>
            </div>

            <div className={styles.summaryList}>
              <div className={styles.summaryBullet}>
                <span className={styles.bulletDot} />
                <p>
                  <strong>Store Touchpoint:</strong> Visited Fifth Avenue center yesterday. Tested Sony BRAVIA 9 and LG OLED evo G4 for 45 minutes with advisor Liam Bennett.
                </p>
              </div>
              <div className={styles.summaryBullet}>
                <span className={styles.bulletDot} />
                <p>
                  <strong>Specific Hesitation:</strong> Penthouse has South-facing floor-to-ceiling glass. Concerned about ambient light washing out dark cinematic scenes.
                </p>
              </div>
              <div className={styles.summaryBullet}>
                <span className={styles.bulletDot} />
                <p>
                  <strong>Budget Capacity:</strong> Stated range of {customer.buyingBudget}. High affinity for Apple ecosystem integration and premium audio.
                </p>
              </div>
            </div>
          </GlassCard>

          {/* Dynamic Suggested Replies */}
          <GlassCard className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderTitle}>
                <MessageSquare size={15} className={styles.headerIconAi} />
                <h3>Suggested Verbatim Scripts by Category</h3>
              </div>
              <span className={styles.aiTagBadge}>One-Click Copy</span>
            </div>

            {/* Category Filter Tabs */}
            <div className={styles.replyCategoryTabs}>
              {Object.keys(SUGGESTED_REPLIES_MAP).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`${styles.replyCatBtn} ${activeTab === cat ? styles.replyCatBtnActive : ''}`}
                  onClick={() => setActiveTab(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Replies List */}
            <div className={styles.repliesList}>
              {SUGGESTED_REPLIES_MAP[activeTab]?.map((reply, i) => (
                <div key={i} className={styles.replyCard}>
                  <p className={styles.replyText}>{reply}</p>
                  <button
                    type="button"
                    className={styles.copyBtn}
                    onClick={() => handleCopyReply(reply, i)}
                  >
                    {copiedIndex === i ? (
                      <>
                        <Check size={13} className={styles.copiedIcon} /> Copied
                      </>
                    ) : (
                      <>
                        <Copy size={13} /> Copy Script
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Conversation Summary & Next Follow-Up Suggestions */}
          <GlassCard className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderTitle}>
                <Sparkles size={15} className={styles.headerIcon} />
                <h3>Conversation Summary & Follow-Up Suggestions</h3>
              </div>
            </div>
            <div className={styles.followUpBox}>
              <h4 className={styles.followUpTitle}>Automated Next Follow-Up Task:</h4>
              <p className={styles.followUpDesc}>
                If call ends without direct transaction, dispatch digital lookbook with 24M 0% financing structure and calendar invite for white-glove setup window.
              </p>
              <div className={styles.followUpActions}>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => toast?.success?.('Follow-up task scheduled in queue for 4:00 PM')}
                >
                  Schedule 4:00 PM Reminder
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toast?.info?.('SMS quote dispatch link triggered')}
                >
                  Send Instant SMS Quote
                </Button>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right Column: AI Knowledge Search + Offer Recommendation + Recommended Products */}
        <div className={styles.rightColumn}>
          {/* Instant AI Knowledge Search */}
          <GlassCard className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderTitle}>
                <BookOpen size={15} className={styles.headerIcon} />
                <h3>AI Knowledge Search</h3>
              </div>
            </div>
            <div className={styles.searchBox}>
              <Search size={15} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search specs, policies, OLED vs Mini LED..."
                value={knowledgeSearch}
                onChange={(e) => setKnowledgeSearch(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            <div className={styles.snippetsList}>
              {filteredSnippets.map((snip, idx) => (
                <div key={idx} className={styles.snippetItem}>
                  <h5 className={styles.snipTitle}>{snip.title}</h5>
                  <p className={styles.snipAnswer}>{snip.answer}</p>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Offer Recommendation Card */}
          <GlassCard variant="ai" className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderTitle}>
                <Zap size={15} className={styles.headerIconGold} />
                <h3>Recommended Festive Offer Bundle</h3>
              </div>
              <Badge variant="gold">Limited 48h</Badge>
            </div>
            <div className={styles.offerBundleBox}>
              <span className={styles.offerHeadline}>
                $500 Audio Rebate + Complimentary White-Glove Installation
              </span>
              <p className={styles.offerSub}>
                Applies when purchasing the Sony BRAVIA 9 85" with the Sony HT-A9M2 Home Theater System.
              </p>
              <div className={styles.offerSavingsPill}>
                Total Customer Savings: <strong>$750 USD</strong>
              </div>
            </div>
          </GlassCard>

          {/* Recommended Products */}
          <GlassCard className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderTitle}>
                <ShoppingBag size={15} className={styles.headerIcon} />
                <h3>Recommended Product Pairings</h3>
              </div>
            </div>
            <div className={styles.productsList}>
              <div className={styles.recProdItem}>
                <div className={styles.prodMeta}>
                  <span className={styles.prodName}>Sony BRAVIA 9 85" Flagship Mini LED</span>
                  <span className={styles.prodCategory}>Primary Display • $4,799</span>
                </div>
                <Badge variant="gold" size="sm">Primary</Badge>
              </div>

              <div className={styles.recProdItem}>
                <div className={styles.prodMeta}>
                  <span className={styles.prodName}>Sony HT-A9M2 Quad Wireless Audio</span>
                  <span className={styles.prodCategory}>Soundbar System • $1,999 ($500 Rebate)</span>
                </div>
                <Badge variant="ai" size="sm">Cross-Sell</Badge>
              </div>

              <div className={styles.recProdItem}>
                <div className={styles.prodMeta}>
                  <span className={styles.prodName}>Apple TV 4K Wi-Fi + Ethernet (128GB)</span>
                  <span className={styles.prodCategory}>Streaming Hub • $149</span>
                </div>
                <Badge variant="neutral" size="sm">Accessory</Badge>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

export default AiRecommendationsPage;
