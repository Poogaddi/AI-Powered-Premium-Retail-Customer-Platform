import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { useTheme } from '../../hooks/useTheme';
import styles from './ChartCard.module.css';

const COLORS = ['#8B5CF6', '#6366F1', '#3B82F6', '#06B6D4', '#10B981'];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipLabel}>{label}</p>
      <p className={styles.tooltipRow} style={{ color: payload[0].fill }}>
        <span className={styles.tooltipDot} style={{ background: payload[0].fill }} />
        Revenue: <strong>${payload[0].value.toLocaleString()}</strong>
      </p>
    </div>
  );
};

export function TopProductsChart({ data }) {
  const { isDark } = useTheme();
  const gridColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  const tickColor = isDark ? '#64748B' : '#94A3B8';

  // Shorten product names for axis
  const chartData = data.map((d, i) => ({
    ...d,
    shortName: d.name.split(' ').slice(0, 2).join(' '),
    fill: COLORS[i],
  }));

  return (
    <div className={styles.chartCard}>
      <div className={styles.chartHeader}>
        <div>
          <h3 className={styles.chartTitle}>Top Selling Products</h3>
          <p className={styles.chartSub}>By revenue generated · Month-to-date</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={chartData} layout="vertical" margin={{ top: 4, right: 16, left: 4, bottom: 0 }} barSize={12}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={false} />
          <XAxis type="number" tick={{ fill: tickColor, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
          <YAxis type="category" dataKey="shortName" tick={{ fill: tickColor, fontSize: 11 }} axisLine={false} tickLine={false} width={90} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="revenue" radius={[0, 4, 4, 0]}>
            {chartData.map((entry, i) => (
              <Cell key={i} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TopProductsChart;
