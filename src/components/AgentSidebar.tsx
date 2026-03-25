import { Circle } from 'lucide-react';
import type { Agent, AgentStatus } from '../types';

interface AgentSidebarProps {
  agents: Agent[];
}

const statusConfig: Record<AgentStatus, { label: string; dot: string; ring: string }> = {
  online: { label: 'Online', dot: 'text-success', ring: 'ring-success/20' },
  ocupado: { label: 'Ocupado', dot: 'text-warning', ring: 'ring-warning/20' },
  ausente: { label: 'Ausente', dot: 'text-slate-400', ring: 'ring-slate-300/80' },
};

export function AgentSidebar({ agents }: AgentSidebarProps) {
  return (
    <aside className="surface-card hidden h-[calc(100vh-120px)] w-[108px] shrink-0 overflow-hidden xl:flex xl:flex-col">
      <div className="border-b border-slate-100 px-4 py-5">
        <div className="text-center text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">Agentes</div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-5">
        <div className="flex flex-col items-center gap-4">
          {agents.map((agent) => {
            const config = statusConfig[agent.status];

            return (
              <button
                key={agent.id}
                className={`group flex w-full flex-col items-center gap-2 rounded-[28px] border border-transparent px-2 py-3 transition hover:border-brand/20 hover:bg-brand/5`}
                type="button"
              >
                <div className={`relative flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white ring-4 ${config.ring}`}>
                  {agent.initials ?? 'F'}
                  <span className="absolute bottom-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-sm">
                    <Circle className={`h-3 w-3 fill-current ${config.dot}`} />
                  </span>
                </div>
                <div className="text-center">
                  <div className="line-clamp-1 text-xs font-semibold text-slate-800">{agent.name}</div>
                  <div className="text-[11px] text-slate-500">{config.label}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
