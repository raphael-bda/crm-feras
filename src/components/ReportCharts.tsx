import { MessageSquare, TrendingUp } from 'lucide-react';
import type { CapacityPoint, ChannelStat, TagStat, TrendPoint } from '../types';

const CHART_HEIGHT = 180;

function getLinePoints(values: number[], maxValue: number, height = CHART_HEIGHT) {
  return values
    .map((value, index) => {
      const x = values.length === 1 ? 0 : (index / (values.length - 1)) * 100;
      const y = height - (value / maxValue) * (height - 18) - 8;
      return `${x},${y}`;
    })
    .join(' ');
}

function getAreaPath(values: number[], maxValue: number, height = CHART_HEIGHT) {
  const points = values
    .map((value, index) => {
      const x = values.length === 1 ? 0 : (index / (values.length - 1)) * 100;
      const y = height - (value / maxValue) * (height - 18) - 8;
      return `${x},${y}`;
    })
    .join(' L ');

  return `M 0 ${height} L ${points} L 100 ${height} Z`;
}

export function CapacityChart({ data }: { data: CapacityPoint[] }) {
  const maxBars = Math.max(...data.map((point) => Math.max(point.incoming, point.resolved)));
  const maxLine = Math.max(...data.map((point) => point.pending));
  const line = getLinePoints(
    data.map((point) => point.pending),
    maxLine,
  );

  return (
    <div className="rounded-[28px] border border-slate-100 bg-slate-50/80 p-5">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-lg font-semibold text-slate-900">Capacidade de Atendimento</div>
          <div className="text-sm text-slate-500">Novos, concluidos e backlog por dia</div>
        </div>
        <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
          <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-info" /> Novos</span>
          <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-warning" /> Concluidos</span>
          <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-sky-300" /> Pendentes</span>
        </div>
      </div>

      <div className="grid grid-cols-8 gap-3">
        {data.map((point) => (
          <div key={point.label} className="flex flex-col items-center gap-3">
            <div className="flex h-[180px] items-end gap-2">
              <div className="w-4 rounded-t-2xl bg-info/85" style={{ height: `${(point.incoming / maxBars) * 100}%` }} />
              <div className="w-4 rounded-t-2xl bg-warning/85" style={{ height: `${(point.resolved / maxBars) * 100}%` }} />
            </div>
            <span className="text-xs font-medium text-slate-500">{point.label}</span>
          </div>
        ))}
      </div>

      <svg className="-mt-[212px] h-[180px] w-full" viewBox={`0 0 100 ${CHART_HEIGHT}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="pending-line" x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <polyline
          fill="none"
          points={line}
          stroke="url(#pending-line)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.6"
        />
      </svg>
    </div>
  );
}

interface TrendChartProps {
  title: string;
  subtitle: string;
  data: TrendPoint[];
  barColor: string;
  lineColor: string;
  areaColor: string;
}

export function TrendChart({ title, subtitle, data, barColor, lineColor, areaColor }: TrendChartProps) {
  const maxValue = Math.max(...data.flatMap((point) => [point.primary, point.area, point.secondary]));
  const line = getLinePoints(
    data.map((point) => point.secondary),
    maxValue,
  );
  const area = getAreaPath(
    data.map((point) => point.area),
    maxValue,
  );

  return (
    <div className="rounded-[28px] border border-slate-100 bg-slate-50/80 p-5">
      <div className="mb-6">
        <div className="text-lg font-semibold text-slate-900">{title}</div>
        <div className="text-sm text-slate-500">{subtitle}</div>
      </div>

      <div className="grid grid-cols-8 gap-3">
        {data.map((point) => (
          <div key={point.label} className="flex flex-col items-center gap-3">
            <div className="flex h-[180px] items-end">
              <div className="w-6 rounded-t-2xl" style={{ backgroundColor: barColor, height: `${(point.primary / maxValue) * 100}%` }} />
            </div>
            <span className="text-xs font-medium text-slate-500">{point.label}</span>
          </div>
        ))}
      </div>

      <svg className="-mt-[212px] h-[180px] w-full" viewBox={`0 0 100 ${CHART_HEIGHT}`} preserveAspectRatio="none">
        <path d={area} fill={areaColor} opacity="0.72" />
        <polyline
          fill="none"
          points={line}
          stroke={lineColor}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.6"
        />
      </svg>
    </div>
  );
}

export function HeatmapChart({
  dates,
  hours,
  values,
}: {
  dates: string[];
  hours: string[];
  values: number[][];
}) {
  return (
    <div className="rounded-[28px] border border-slate-100 bg-slate-50/80 p-5">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="text-lg font-semibold text-slate-900">Volume Diario de Atendimentos</div>
          <div className="text-sm text-slate-500">Heatmap hora x dia com tooltip nativo no hover</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-500">
          Escala 1 a 19+
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="grid min-w-[680px] grid-cols-[70px,repeat(8,minmax(0,1fr))] gap-2">
          <div />
          {dates.map((date) => (
            <div key={date} className="text-center text-xs font-medium text-slate-500">
              {date}
            </div>
          ))}

          {hours.map((hour, rowIndex) => (
            <div key={hour} className="contents">
              <div className="pr-2 text-right text-xs text-slate-400">{hour}</div>
              {values[rowIndex].map((volume, colIndex) => (
                <div
                  key={`${hour}-${dates[colIndex]}`}
                  className="h-6 rounded-lg border border-white/70"
                  style={{
                    backgroundColor: `rgba(59, 130, 246, ${0.08 + volume / 24})`,
                  }}
                  title={`${hour}: ${volume}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ChannelDonutChart({ stats }: { stats: ChannelStat[] }) {
  const total = stats.reduce((sum, item) => sum + item.total, 0);
  const gradient = stats
    .map((item, index) => {
      const start = (stats.slice(0, index).reduce((sum, entry) => sum + entry.total, 0) / total) * 100;
      const end = ((stats.slice(0, index + 1).reduce((sum, entry) => sum + entry.total, 0)) / total) * 100;
      return `${item.color} ${start}% ${end}%`;
    })
    .join(', ');

  return (
    <div className="rounded-[28px] border border-slate-100 bg-slate-50/80 p-5">
      <div className="mb-5">
        <div className="text-lg font-semibold text-slate-900">Atendimentos por Canal</div>
        <div className="text-sm text-slate-500">Distribuicao por origem da conversa</div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[220px,minmax(0,1fr)] lg:items-center">
        <div className="mx-auto flex h-52 w-52 items-center justify-center rounded-full" style={{ background: `conic-gradient(${gradient})` }}>
          <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white shadow-soft">
            <span className="text-3xl font-semibold text-slate-900">{total}</span>
            <span className="text-xs uppercase tracking-[0.28em] text-slate-500">Total</span>
          </div>
        </div>

        <div className="space-y-3">
          {stats.map((item) => (
            <div key={item.channel} className="flex items-center justify-between rounded-2xl border border-white/70 bg-white px-4 py-3">
              <div className="inline-flex items-center gap-3">
                <span className="h-3.5 w-3.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm font-medium text-slate-700">{item.label}</span>
              </div>
              <span className="text-sm font-semibold text-slate-900">({item.total})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TagsRankingChart({ stats }: { stats: TagStat[] }) {
  const maxValue = Math.max(...stats.map((item) => item.total));

  return (
    <div className="rounded-[28px] border border-slate-100 bg-slate-50/80 p-5">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-lg font-semibold text-slate-900">Etiquetas</div>
          <div className="text-sm text-slate-500">Top 50 com ordenacao por volume</div>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1">
          <button className="rounded-full bg-brand px-3 py-1.5 text-xs font-medium text-white" type="button">
            Mais usados
          </button>
          <button className="rounded-full px-3 py-1.5 text-xs font-medium text-slate-500" type="button">
            Ordenacao
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {stats.map((item) => (
          <div key={item.label} className="grid gap-2 lg:grid-cols-[180px,minmax(0,1fr),56px] lg:items-center">
            <div className="text-sm font-medium text-slate-700">{item.label}</div>
            <div className="h-3 rounded-full bg-slate-200/80">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-brand via-violet-500 to-sky-500"
                style={{ width: `${(item.total / maxValue) * 100}%` }}
              />
            </div>
            <div className="text-right text-sm font-semibold text-slate-900">{item.total}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MetricStack({
  title,
  items,
}: {
  title: string;
  items: Array<{ label: string; value: string; helper: string }>;
}) {
  return (
    <div className="surface-card h-full p-5">
      <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-brand">
        <TrendingUp className="h-3.5 w-3.5" />
        {title}
      </div>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.label} className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
            <div className="text-sm text-slate-500">{item.label}</div>
            <div className="mt-2 text-2xl font-semibold text-slate-900">{item.value}</div>
            <div className="mt-1 text-xs text-slate-500">{item.helper}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function InsightCard({ title, value, helper }: { title: string; value: string; helper: string }) {
  return (
    <div className="surface-card p-5">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-sky-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">
        <MessageSquare className="h-3.5 w-3.5" />
        Insight
      </div>
      <div className="text-sm text-slate-500">{title}</div>
      <div className="mt-2 text-2xl font-semibold text-slate-900">{value}</div>
      <div className="mt-1 text-sm text-slate-500">{helper}</div>
    </div>
  );
}
