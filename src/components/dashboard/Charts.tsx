'use client';

/**
 * Monochrome ledger charts — single-series ink marks on the glass
 * surface. Thin bars with rounded data-ends, a recessive baseline,
 * hover tooltips, and one direct label on the peak. No colour: the
 * dashboards are ink-on-white by rule.
 */

import { useState } from 'react';

const INK = '#08080c';
const MUTED = '#8a899a';
const TRACK = 'rgba(11,11,18,0.07)';

interface BarDatum {
  label: string;
  value: number;
}

interface InkBarsProps {
  data: BarDatum[];
  /** formats the value for tooltip + peak label */
  format?: (v: number) => string;
  height?: number;
}

/** Vertical bars — magnitude over an ordered dimension (months, days). */
export function InkBars({ data, format = (v) => String(v), height = 180 }: InkBarsProps) {
  const [hover, setHover] = useState<number | null>(null);
  if (!data.length) return null;

  const W = 560;
  const H = height;
  const PAD_B = 22;
  const PAD_T = 24;
  const max = Math.max(...data.map((d) => d.value), 1);
  const peak = data.findIndex((d) => d.value === max);
  const slot = W / data.length;
  const barW = Math.min(34, slot * 0.5);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto"
      role="img"
      aria-label={data.map((d) => `${d.label} ${format(d.value)}`).join(', ')}
    >
      {/* baseline */}
      <line x1={0} y1={H - PAD_B} x2={W} y2={H - PAD_B} stroke={TRACK} strokeWidth={1} />
      {data.map((d, i) => {
        const h = Math.max(2, ((H - PAD_B - PAD_T) * d.value) / max);
        const x = i * slot + (slot - barW) / 2;
        const y = H - PAD_B - h;
        const active = hover === i;
        const labelled = active || (hover === null && i === peak);
        return (
          <g
            key={d.label + i}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
          >
            {/* hit target wider than the mark */}
            <rect x={i * slot} y={0} width={slot} height={H} fill="transparent" />
            <rect
              x={x}
              y={y}
              width={barW}
              height={h}
              rx={4}
              fill={active ? INK : 'rgba(8,8,12,0.82)'}
            />
            {labelled && (
              <text
                x={x + barW / 2}
                y={y - 8}
                textAnchor="middle"
                fontSize={11}
                fontWeight={600}
                fill={INK}
                style={{ fontFamily: 'var(--font-display)', fontVariantNumeric: 'tabular-nums' }}
              >
                {format(d.value)}
              </text>
            )}
            <text
              x={i * slot + slot / 2}
              y={H - 6}
              textAnchor="middle"
              fontSize={10}
              fill={MUTED}
              style={{ fontFamily: 'var(--font-geist-mono)', letterSpacing: '0.08em' }}
            >
              {d.label.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

interface InkLineProps {
  data: BarDatum[];
  format?: (v: number) => string;
  height?: number;
}

/** Line with area wash — change over a continuous run (views per day). */
export function InkLine({ data, format = (v) => String(v), height = 180 }: InkLineProps) {
  const [hover, setHover] = useState<number | null>(null);
  if (data.length < 2) return null;

  const W = 560;
  const H = height;
  const PAD_B = 22;
  const PAD_T = 26;
  const max = Math.max(...data.map((d) => d.value), 1);
  const stepX = W / (data.length - 1);
  const yFor = (v: number) => H - PAD_B - ((H - PAD_B - PAD_T) * v) / max;
  const pts = data.map((d, i) => [i * stepX, yFor(d.value)] as const);
  const path = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`).join(' ');
  const area = `${path} L${W},${H - PAD_B} L0,${H - PAD_B} Z`;
  const peak = data.findIndex((d) => d.value === max);
  const shown = hover ?? peak;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto"
      role="img"
      aria-label={data.map((d) => `${d.label} ${format(d.value)}`).join(', ')}
    >
      <line x1={0} y1={H - PAD_B} x2={W} y2={H - PAD_B} stroke={TRACK} strokeWidth={1} />
      <path d={area} fill="rgba(8,8,12,0.05)" />
      <path d={path} fill="none" stroke={INK} strokeWidth={2} strokeLinejoin="round" />
      {data.map((d, i) => (
        <g key={d.label + i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
          <rect
            x={i * stepX - stepX / 2}
            y={0}
            width={stepX}
            height={H}
            fill="transparent"
          />
          {shown === i && (
            <>
              <line x1={i * stepX} y1={PAD_T - 10} x2={i * stepX} y2={H - PAD_B} stroke="rgba(11,11,18,0.14)" strokeWidth={1} />
              <circle cx={i * stepX} cy={yFor(d.value)} r={4.5} fill={INK} stroke="#fff" strokeWidth={2} />
              <text
                x={Math.min(Math.max(i * stepX, 30), W - 30)}
                y={PAD_T - 12}
                textAnchor="middle"
                fontSize={11}
                fontWeight={600}
                fill={INK}
                style={{ fontFamily: 'var(--font-display)', fontVariantNumeric: 'tabular-nums' }}
              >
                {format(d.value)}
              </text>
            </>
          )}
          <text
            x={Math.min(Math.max(i * stepX, 14), W - 14)}
            y={H - 6}
            textAnchor="middle"
            fontSize={10}
            fill={MUTED}
            style={{ fontFamily: 'var(--font-geist-mono)', letterSpacing: '0.08em' }}
          >
            {d.label.toUpperCase()}
          </text>
        </g>
      ))}
    </svg>
  );
}

interface MeterListProps {
  data: { label: string; value: number }[];
  /** suffix shown after the number, default "%" */
  unit?: string;
}

/** Horizontal distribution meters — demographics, share-of lists. */
export function MeterList({ data, unit = '%' }: MeterListProps) {
  if (!data.length) return null;
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="space-y-3.5">
      {data.map((d) => (
        <div key={d.label}>
          <div className="flex items-baseline justify-between mb-1.5">
            <span className="text-[0.82rem] text-[#46455a]">{d.label}</span>
            <span className="dash-num text-[0.82rem] font-semibold">
              {d.value}
              {unit}
            </span>
          </div>
          <div className="dash-bar">
            <div className="dash-bar-fill" style={{ width: `${(d.value / max) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
