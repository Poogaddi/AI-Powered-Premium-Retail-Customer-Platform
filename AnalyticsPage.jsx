import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, TrendingUp, Users, DollarSign, Award,
  PhoneCall, Sparkles, Star, ArrowUpRight, Download,
  Clock, ShieldCheck, FileSpreadsheet, FileText, CheckCircle2
} from 'lucide-react';
import {
  revenueTrend, callVolume, sentimentData, leadConversion,
  salesFunnel, topProducts, agentPerformance, storeComparison,
  demographics, analyticsSummary,
} from '../data/dashboardData';

import PageHeader from '../components/common/PageHeader';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import RevenueTrendChart from '../components/charts/RevenueTrendChart';
import CallVolumeChart from '../components/charts/CallVolumeChart';
import SentimentChart from '../components/charts/SentimentChart';
import LeadConversionChart from '../components/charts/LeadConversionChart';
import SalesFunnelChart from '../components/charts/SalesFunnelChart';
import TopProductsChart from '../components/charts/TopProductsChart';
import AgentPerformanceChart from '../components/charts/AgentPerformanceChart';
import StoreComparisonChart from '../components/charts/StoreComparisonChart';
import DemographicsChart from '../components/charts/DemographicsChart';
import { useToast } from '../hooks/useToast';

import styles from './AnalyticsPage.module.css';

const fadeUp = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

const SUMMARY_STATS = [
  { label: 'MTD Revenue', value: analyticsSummary.totalRevenueMTD, icon: DollarSign, color: 'gold', sub: 'vs $280k target (+24.4%)' },
  { label: 'Total Calls', value: analyticsSummary.totalCallsMTD, icon: PhoneCall, color: 'blue', sub: '98.2% completed SLA' },
  { label: 'Avg CSAT Score', value: analyticsSummary.avgCSAT, icon: Star, color: 'green', sub: 'Top 1% benchmark globally' },
  { label: 'Conversion Rate', value: analyticsSummary.conversionRateMTD, icon: Award, color: 'cyan', sub: 'Industry benchmark: 18%' },
  { label: 'Avg Resolution Time', value: '4m 32s', icon: Clock, color: 'purple', sub: 'Optimal satisfaction window' },
  { label: 'AI Lift Rate', value: analyticsSummary.aiLiftRate, icon: Sparkles, color: 'ai', sub: 'Conversion lift vs non-AI calls' },
];

const INTENT_DISTRIBUTION = [
  { level: 'Extreme Purchase Intent (>90%)', count: 28, pct: 42, color: '#D4AF37' },
  { level: 'High Purchase Intent (80-89%)', count: 22, pct: 33, color: '#10B981' },
  { level: 'Moderate Intent (70-79%)', count: 12, pct: 18, color: '#3B82F6' },
  { level: 'Evaluating Specs (<70%)', count: 5, pct: 7, color: '#8B5CF6' },
];

const COLOR_MAP = {
  gold: { text: '#D4AF37', bg: 'rgba(212,175,55,0.1)', border: 'rgba(212,175,55,0.3)' },
  blue: { text: '#3B82F6', bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.3)' },
  green: { text: '#10B981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)' },
  purple: { text: '#8B5CF6', bg: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.3)' },
  cyan: { text: '#06B6D4', bg: 'rgba(6,182,212,0.1)', border: 'rgba(6,182,212,0.3)' },
  ai: { text: '#A78BFA', bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.35)' },
};

const PERIODS = ['Today', 'This Week', 'This Month', 'This Quarter', 'YTD'];

export function AnalyticsPage() {
  const [period, setPeriod] = useState('This Month');
  const toast = useToast();

  const handleExportReport = (format) => {
    toast?.success?.(`Generating and downloading ${period} Executive Analytics Report (${format.toUpperCase()})...`);
  };

  return (
    <div className={styles.page}>
      {/* ── Page Header ───────────────────────────────────────────── */}
      <PageHeader
        title="Analytics & Revenue Intelligence"
        subtitle="Deep performance telemetry, omnichannel store comparison, sales funnel attribution, and AI customer intent analytics."
        badge={<Badge variant="ai"><Sparkles size={11} /> REAL-TIME TELEMETRY</Badge>}
        actions={
          <div className={styles.headerActions}>
            {/* Period selector */}
            <div className={styles.periodToggle}>
              {PERIODS.map((p) => (
                <button
                  key={p}
                  type="button"
                  className={`${styles.periodBtn} ${period === p ? styles.periodActive : ''}`}
                  onClick={() => setPeriod(p)}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Export Buttons */}
            <div className={styles.exportButtonGroup}>
              <button
                type="button"
                className={styles.exportBtn}
                onClick={() => handleExportReport('csv')}
                title="Export Raw Telemetry CSV"
              >
                <FileSpreadsheet size={14} /> CSV
              </button>
              <button
                type="button"
                className={styles.exportBtn}
                onClick={() => handleExportReport('pdf')}
                title="Export Executive PDF Summary"
              >
                <FileText size={14} /> PDF
              </button>
            </div>
          </div>
        }
      />

      {/* ── Summary Stats Row (6 Cards) ─────────────────────────── */}
      <motion.div
        className={styles.summaryGrid}
        variants={{ show: { transition: { staggerChildren: 0.05 } } }}
        initial="hidden"
        animate="show"
      >
        {SUMMARY_STATS.map((stat) => {
          const Icon = stat.icon;
          const palette = COLOR_MAP[stat.color] || COLOR_MAP.blue;
          return (
            <motion.div
              key={stat.label}
              className={styles.summaryCard}
              variants={fadeUp}
              transition={{ duration: 0.3 }}
              style={{
                '--s-color': palette.text,
                '--s-bg': palette.bg,
                '--s-border': palette.border,
              }}
            >
              <div className={styles.summaryTop}>
                <span className={styles.summaryLabel}>{stat.label}</span>
                <div className={styles.summaryIconWrap}>
                  <Icon size={16} />
                </div>
              </div>
              <div className={styles.summaryValue}>{stat.value}</div>
              <span className={styles.summarySub}>{stat.sub}</span>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ── Revenue Dashboard & Sales Trend (Full Width) ──────── */}
      <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.15 }}>
        <RevenueTrendChart data={revenueTrend} />
      </motion.div>

      {/* ── Lead Conversion + Sales Funnel ────────────────────── */}
      <motion.div className={styles.row2} variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.2 }}>
        <LeadConversionChart data={leadConversion} />
        <SalesFunnelChart data={salesFunnel} />
      </motion.div>

      {/* ── Call Volume + Sentiment Analysis ──────────────────── */}
      <motion.div className={styles.row2} variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.25 }}>
        <CallVolumeChart data={callVolume} />
        <SentimentChart data={sentimentData} />
      </motion.div>

      {/* ── Customer Intent Distribution + Demographics ───────── */}
      <motion.div className={styles.row2} variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.3 }}>
        {/* Customer Intent Distribution Card */}
        <div className={styles.intentCard}>
          <div className={styles.intentHeader}>
            <div className={styles.intentTitleGroup}>
              <Sparkles size={16} className={styles.goldSparkle} />
              <h3 className={styles.intentTitle}>Customer Intent Score Distribution</h3>
            </div>
            <Badge variant="gold">48h Post-Visit</Badge>
          </div>
          <p className={styles.intentDesc}>
            AI-calculated conversion propensity following in-store product demonstrations.
          </p>
          <div className={styles.intentList}>
            {INTENT_DISTRIBUTION.map((item, i) => (
              <div key={i} className={styles.intentItem}>
                <div className={styles.intentRow}>
                  <span className={styles.intentLevel}>{item.level}</span>
                  <span className={styles.intentCount}>
                    {item.count} leads (<strong>{item.pct}%</strong>)
                  </span>
                </div>
                <div className={styles.track}>
                  <div
                    className={styles.fill}
                    style={{ width: `${item.pct}%`, background: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <DemographicsChart data={demographics} />
      </motion.div>

      {/* ── Top Selling Products + Store Comparison ───────────── */}
      <motion.div className={styles.row2} variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.35 }}>
        <TopProductsChart data={topProducts} />
        <StoreComparisonChart data={storeComparison} />
      </motion.div>

      {/* ── Agent Performance Radar + Agent Leaderboard Table ──── */}
      <motion.div className={styles.row2} variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.4 }}>
        <AgentPerformanceChart data={agentPerformance} />

        {/* Leaderboard */}
        <div className={styles.leaderboardCard}>
          <div className={styles.leaderHeader}>
            <h3 className={styles.leaderTitle}>Agent Performance Leaderboard</h3>
            <Badge variant="gold">{period}</Badge>
          </div>
          <div className={styles.tableWrapper}>
            <table className={styles.leaderTable}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Agent</th>
                  <th>Calls</th>
                  <th>Conv %</th>
                  <th>CSAT</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {agentPerformance.map((agent, i) => {
                  const convPct = Math.round((agent.converted / agent.calls) * 100);
                  return (
                    <tr key={agent.name}>
                      <td className={styles.rankCell}>
                        <span className={`${styles.rank} ${i === 0 ? styles.rankGold : i === 1 ? styles.rankSilver : ''}`}>
                          {i + 1}
                        </span>
                      </td>
                      <td className={styles.agentCell}>
                        <div className={styles.agentAvatar}>
                          {agent.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <span className={styles.agentName}>{agent.name}</span>
                      </td>
                      <td className={styles.numCell}>{agent.calls}</td>
                      <td>
                        <span className={styles.pctBadge} style={{ color: convPct >= 40 ? '#10B981' : '#F59E0B' }}>
                          {convPct}%
                        </span>
                      </td>
                      <td>
                        <span className={styles.csatBadge}>{agent.csat}%</span>
                      </td>
                      <td className={styles.revenueCell}>${agent.revenue.toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default AnalyticsPage;
