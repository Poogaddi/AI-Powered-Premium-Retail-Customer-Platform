import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { useTheme } from '../../hooks/useTheme';
import styles from './ChartCard.module.css';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipLabel}>{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className={styles.tooltipRow} style={{ color: p.color }}>
          <span className={styles.tooltipDot} style={{ background: p.color }} />
          {p.name}: <strong>{p.dataKey === 'revenue' ? `$${(p.value / 1000).toFixed(0)}k` : `${p.value}${p.dataKey === 'conversion' ? '%' : ''}`}</strong>
        </p>
      ))}
    </div>
  );
};

export function StoreComparisonChart({ data }) {
  const { isDark } = useTheme();
  const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  const tickColor = isDark ? '#64748B' : '#94A3B8';

  return (
    <div className={styles.chartCard}>
      <div className={styles.chartHeader}>
        <div>
          <h3 className={styles.chartTitle}>Store Comparison</h3>
          <p className={styles.chartSub}>Revenue & call volume by boutique · Today</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: -10, bottom: 0 }} barSize={14} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis dataKey="store" tick={{ fill: tickColor, fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis yAxisId="left" tick={{ fill: tickColor, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
          <YAxis yAxisId="right" orientation="right" tick={{ fill: tickColor, fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }} />
          <Bar yAxisId="left" dataKey="revenue" name="Revenue" fill="#D4AF37" radius={[3, 3, 0, 0]} fillOpacity={0.85} />
          <Bar yAxisId="right" dataKey="calls" name="Calls" fill="#8B5CF6" radius={[3, 3, 0, 0]} fillOpacity={0.85} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StoreComparisonChart;
