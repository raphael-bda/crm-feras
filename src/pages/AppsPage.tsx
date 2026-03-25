import { Activity, ArrowUpRight, Bell, Database, RefreshCw, Wifi, Zap } from 'lucide-react';
import { ChannelBadge } from '../components/ChannelBadge';

const channelCards = [
  {
    id: 'whatsapp-primary',
    title: 'WhatsApp principal',
    subtitle: '+55 11 99888-1200',
    channel: 'whatsapp' as const,
    status: 'Webhook operacional',
    metric: '2.381 mensagens hoje',
  },
  {
    id: 'whatsapp-secondary',
    title: 'WhatsApp secundario',
    subtitle: '+55 21 99771-0045',
    channel: 'whatsapp' as const,
    status: 'Fila de contingencia ativa',
    metric: '391 mensagens hoje',
  },
  {
    id: 'instagram',
    title: 'Instagram Graph API',
    subtitle: '@crmferas_demo',
    channel: 'instagram' as const,
    status: 'Reels, Direct e comentarios em sincronia',
    metric: '604 interacoes no periodo',
  },
  {
    id: 'facebook',
    title: 'Facebook Messenger',
    subtitle: 'Pagina institucional',
    channel: 'facebook' as const,
    status: 'Inbox da fanpage conectado',
    metric: '312 conversas ativas',
  },
];

const appPillars = [
  {
    title: 'Socket tempo real',
    helper: 'Distribuicao instantanea de mensagens e status dos agentes.',
    icon: Wifi,
    tone: 'bg-sky-100 text-sky-700',
  },
  {
    title: 'Cache e filas',
    helper: 'Redis dedicado para SLA, eventos e rotinas de sincronizacao.',
    icon: Database,
    tone: 'bg-amber-100 text-amber-700',
  },
  {
    title: 'Automacoes',
    helper: 'Alertas, notificacoes push e orquestracao de regras por canal.',
    icon: Zap,
    tone: 'bg-brand/10 text-brand',
  },
];

export function AppsPage() {
  return (
    <section className="space-y-6">
      <div className="surface-card overflow-hidden p-8">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr),320px] xl:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-brand">
              <Activity className="h-3.5 w-3.5" />
              Centro de apps
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">Integre canais, sincronize equipes e distribua eventos em tempo real</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">
              O modulo de Apps concentra conectores de WhatsApp, Instagram, Facebook Messenger, push web e mensageria interna. Tudo foi desenhado para media operacao com alta cadencia e necessidade de controle fino por equipe.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button className="solid-button" type="button">
                <RefreshCw className="h-4 w-4" />
                Sincronizar conexoes
              </button>
              <button className="ghost-button" type="button">
                <Bell className="h-4 w-4" />
                Configurar push web
              </button>
            </div>
          </div>

          <div className="surface-card bg-slate-900 p-6 text-white">
            <div className="text-xs uppercase tracking-[0.32em] text-white/60">Saude da operacao</div>
            <div className="mt-5 grid gap-4">
              <div className="rounded-3xl bg-white/10 p-4">
                <div className="text-sm text-white/70">Latencia media dos webhooks</div>
                <div className="mt-2 text-3xl font-semibold">187 ms</div>
              </div>
              <div className="rounded-3xl bg-white/10 p-4">
                <div className="text-sm text-white/70">Eventos processados nas ultimas 24h</div>
                <div className="mt-2 text-3xl font-semibold">18.402</div>
              </div>
              <div className="rounded-3xl bg-white/10 p-4">
                <div className="text-sm text-white/70">Alertas criticos</div>
                <div className="mt-2 text-3xl font-semibold">0</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {channelCards.map((card) => (
          <article key={card.id} className="surface-card p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <ChannelBadge channel={card.channel} showLabel />
                <div className="mt-4 text-xl font-semibold text-slate-900">{card.title}</div>
                <div className="text-sm text-slate-500">{card.subtitle}</div>
              </div>
              <button className="ghost-button !rounded-2xl !px-3 !py-3" type="button">
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 rounded-[28px] border border-slate-100 bg-slate-50 p-5">
              <div className="text-sm font-medium text-slate-700">{card.status}</div>
              <div className="mt-2 text-sm text-slate-500">{card.metric}</div>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl bg-white px-4 py-3">
                  <div className="text-xs uppercase tracking-[0.24em] text-slate-400">SLA</div>
                  <div className="mt-2 text-lg font-semibold text-slate-900">98,4%</div>
                </div>
                <div className="rounded-2xl bg-white px-4 py-3">
                  <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Fila</div>
                  <div className="mt-2 text-lg font-semibold text-slate-900">17 aguardando</div>
                </div>
                <div className="rounded-2xl bg-white px-4 py-3">
                  <div className="text-xs uppercase tracking-[0.24em] text-slate-400">Sync</div>
                  <div className="mt-2 text-lg font-semibold text-slate-900">Agora mesmo</div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr),360px]">
        <div className="surface-card p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xl font-semibold text-slate-900">Hub de eventos e sincronizacao</div>
              <div className="text-sm text-slate-500">Conectores operando sobre Redis, filas e websockets</div>
            </div>
            <button className="ghost-button" type="button">
              <RefreshCw className="h-4 w-4" />
              Reprocessar lote
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {appPillars.map((pillar) => {
              const Icon = pillar.icon;

              return (
                <div key={pillar.title} className="rounded-[28px] border border-slate-100 bg-slate-50 p-5">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${pillar.tone}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-4 text-lg font-semibold text-slate-900">{pillar.title}</div>
                  <div className="mt-2 text-sm leading-6 text-slate-500">{pillar.helper}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="surface-card p-6">
          <div className="text-xl font-semibold text-slate-900">Checklist tecnico</div>
          <div className="mt-4 space-y-3">
            {[
              'WhatsApp Business API conectada ao numero principal e secundario',
              'Instagram Graph API com permissao para Inbox e comentarios',
              'Facebook Messenger API vinculada a pagina institucional',
              'Web Push preparado para navegadores desktop',
              'Socket.io dedicado para distribuicao de novas mensagens',
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
