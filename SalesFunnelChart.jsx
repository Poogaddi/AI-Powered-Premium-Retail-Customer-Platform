import React from 'react';
import {
  FunnelChart, Funnel, Tooltip, ResponsiveContainer, LabelList,
} from 'recharts';
import styles from './ChartCard.module.css';
import sfStyles from './SalesFunnelChart.module.css';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipRow} style={{ color: d.fill }}>
        <span className={styles.tooltipDot} style={{ background: d.fill }} />
        {d.stage}: <strong>{d.value}</strong>
      </p>
    </div>
  );
};

export function SalesFunnelChart({ data }) {
  return (
    <div className={styles.chartCard}>
      <div className={styles.chartHeader}>
        <div>
          <h3 className={styles.chartTitle}>Sales Funnel</h3>
          <p className={styles.chartSub}>Inbound → Qualified → Converted · MTD</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <FunnelChart>
          <Tooltip content={<CustomTooltip />} />
          <Funnel dataKey="value" data={data} isAnimationActive>
            <LabelList position="right" fill="var(--text-secondary)" fontSize={11} dataKey="stage" />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesFunnelChart;
