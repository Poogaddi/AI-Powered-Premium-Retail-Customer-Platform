import React from 'react';
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
  ResponsiveContainer, Tooltip,
} from 'recharts';
import styles from './ChartCard.module.css';

// Reshape agentPerformance → radar dimensions per agent
// We only chart the first 3 for clarity
const buildRadarData = (agents) => {
  const dimensions = ['Calls', 'Converted', 'CSAT', 'Revenue'];
  // Normalize: max calls=25, converted=10, csat=100, revenue=60000
  const maxes = [25, 10, 100, 60000];
  return dimensions.map((dim, i) => {
    const entry = { dimension: dim };
    agents.slice(0, 3).forEach((a) => {
      const vals = [a.calls, a.converted, a.csat, a.revenue];
      entry[a.name.split(' ')[0]] = Math.round((vals[i] / maxes[i]) * 100);
    });
    return entry;
  });
};

const COLORS = ['#8B5CF6', '#10B981', '#D4AF37'];

export function AgentPerformanceChart({ data }) {
  const radarData = buildRadarData(data);
  const agents = data.slice(0, 3);

  return (
    <div className={styles.chartCard}>
      <div className={styles.chartHeader}>
        <div>
          <h3 className={styles.chartTitle}>Agent Performance</h3>
          <p className={styles.chartSub}>Normalized scores across all KPIs · Top 3 agents</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <RadarChart data={radarData} cx="50%" cy="50%" outerRadius={80}>
          <PolarGrid stroke="rgba(148,163,184,0.15)" />
          <PolarAngleAxis dataKey="dimension" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
          {agents.map((a, i) => (
            <Radar
              key={a.name}
              name={a.name.split(' ')[0]}
              dataKey={a.name.split(' ')[0]}
              stroke={COLORS[i]}
              fill={COLORS[i]}
              fillOpacity={0.15}
              strokeWidth={2}
            />
          ))}
          <Tooltip
            contentStyle={{
              background: 'var(--glass-bg-elevated)',
              border: '1px solid var(--glass-border)',
              borderRadius: '10px',
              fontSize: '12px',
              color: 'var(--text-primary)',
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AgentPerformanceChart;
