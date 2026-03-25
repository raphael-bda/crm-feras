import { CalendarDays, Download, Filter } from 'lucide-react';
import { useState } from 'react';
import {
  CapacityChart,
  ChannelDonutChart,
  HeatmapChart,
  InsightCard,
  MetricStack,
  TagsRankingChart,
  TrendChart,
} from '../components/ReportCharts';
import type { CapacityPoint, ChannelStat, KpiStat, ReportSection, TagStat, TrendPoint } from '../types';

interface RelatoriosPageProps {
  channelStats: ChannelStat[];
  capacityData: CapacityPoint[];
  durationData: TrendPoint[];
  heatmapData: number[][];
  heatmapDates: string[];
  heatmapHours: string[];
  reportKpis: KpiStat[];
  tagStats: TagStat[];
  waitTimeData: TrendPoint[];
}

const reportTabs: Array<{ id: ReportSection; label: string }> = [
  { id: 'geral', label: 'Geral' },
  { id: 'usuario', label: 'Usuario' },
  { id: 'resultados', label: 'Resultados' },
];

const kpiStyles = {
  dark: 'from-slate-900 to-slate-700 text-white',
  success: 'from-emerald-500 to-emerald-600 text-white',
  info: 'from-sky-500 to-sky-600 text-white',
  warning: 'from-orange-400 to-orange-500 text-white',
};

export function RelatoriosPage({
  channelStats,
  capacityData,
  durationData,
  heatmapData,
  heatmapDates,
  heatmapHours,
  reportKpis,
  tagStats,
  waitTimeData,
}: RelatoriosPageProps) {
  const [activeTab, setActiveTab] = useState<ReportSection>('geral');

  return (
    <section className="space-y-6">
      <div className="surface-card p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.28em] text-slate-500">Analytics</div>
            <div className="mt-1 text-2xl font-semibold text-slate-900">Relatorios operacionais e de equipe</div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 p-1">
              {reportTabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`rounded-full px-4 py-2 text-sm font-medium ${
                    activeTab === tab.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                  type="button"
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button className="ghost-button" type="button">
              <Filter className="h-4 w-4" />
              Equipes: Todos
            </button>
            <button className="ghost-button" type="button">
              <CalendarDays className="h-4 w-4" />
              18/03/2026 - 25/03/2026
            </button>
            <button className="ghost-button" type="button">
              <Download className="h-4 w-4" />
              Exportar
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-4">
        {reportKpis.map((kpi) => (
          <article key={kpi.title} className={`rounded-[30px] bg-gradient-to-br p-5 shadow-soft ${kpiStyles[kpi.tone]}`}>
            <div className="text-sm opacity-85">{kpi.title}</div>
            <div className="mt-4 text-3xl font-semibold">{kpi.value}</div>
            <div className="mt-2 text-sm opacity-80">{kpi.helper}</div>
          </article>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr),280px]">
        <CapacityChart data={capacityData} />
        <MetricStack
          title="Totais"
          items={[
            { label: 'Novos', value: '1.218', helper: 'Media de 152 por dia' },
            { label: 'Concluidos', value: '1.107', helper: 'Media de 138 por dia' },
            { label: 'Desempenho', value: '0,91', helper: 'Indice geral do periodo' },
          ]}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr),240px]">
          <TrendChart
            areaColor="rgba(125, 211, 252, 0.55)"
            barColor="#EF4444"
            data={waitTimeData}
            lineColor="#F97316"
            subtitle="Tempo real em barras, tendencia em area azul e atendimentos iniciados em linha"
            title="Tempo de Espera"
          />
          <InsightCard
            title="Tendencia de espera"
            value="77 min 27 seg"
            helper="Baseado nos ultimos 8 dias e reponderado por filas novas."
          />
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr),240px]">
          <TrendChart
            areaColor="rgba(96, 165, 250, 0.38)"
            barColor="#FACC15"
            data={durationData}
            lineColor="#2563EB"
            subtitle="Duracao por barra amarela com area de tendencia azul"
            title="Duracao do Atendimento"
          />
          <InsightCard
            title="Tendencia geral de duracao"
            value="4 dias 8h 0min"
            helper="A curva considera tickets pendentes e concluidos da mesma carteira."
          />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr),280px]">
        <HeatmapChart dates={heatmapDates} hours={heatmapHours} values={heatmapData} />
        <InsightCard title="Pico de atendimento" value="12:00h" helper="Maior concentracao registrada entre 18/03 e 25/03." />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr),minmax(0,1fr)]">
        <ChannelDonutChart stats={channelStats} />
        <TagsRankingChart stats={tagStats} />
      </div>
    </section>
  );
}
