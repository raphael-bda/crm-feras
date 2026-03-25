import {
  BarChart3,
  Bell,
  Headset,
  LayoutGrid,
  MessageSquareText,
  Puzzle,
  RefreshCw,
  Settings2,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import type { MainSection } from '../types';

interface TopBarProps {
  activeSection: MainSection;
  onChangeSection: (section: MainSection) => void;
}

const items: Array<{ id: MainSection; label: string; icon: LucideIcon }> = [
  { id: 'atendimentos', label: 'Atendimentos', icon: Headset },
  { id: 'crm', label: 'CRM', icon: LayoutGrid },
  { id: 'apps', label: 'Apps', icon: Puzzle },
  { id: 'relatorios', label: 'Relatorios', icon: BarChart3 },
  { id: 'ajustes', label: 'Ajustes', icon: Settings2 },
];

export function TopBar({ activeSection, onChangeSection }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/70 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1680px] flex-col gap-4 px-4 py-4 lg:px-6 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-brand via-violet-500 to-sky-500 text-white shadow-glow">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <div className="text-lg font-semibold tracking-tight text-slate-900">CRM Feras</div>
              <div className="text-sm text-slate-500">Atendimento omnichannel, CRM e performance em tempo real</div>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-2 xl:ml-6">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  className={`menu-pill ${
                    isActive
                      ? 'bg-brand text-white shadow-glow'
                      : 'glass-line text-slate-600 hover:border-brand/30 hover:text-brand'
                  }`}
                  onClick={() => onChangeSection(item.id)}
                  type="button"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 xl:justify-end">
          <button className="ghost-button relative" type="button">
            <Bell className="h-4 w-4" />
            <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-semibold text-white">
              8
            </span>
          </button>

          <button className="ghost-button" type="button">
            <RefreshCw className="h-4 w-4" />
            Sincronizar
          </button>

          <div className="flex items-center gap-3 rounded-3xl border border-slate-200/80 bg-white px-2 py-2 shadow-soft">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 text-sm font-semibold text-white">
              RM
            </div>
            <div className="pr-3">
              <div className="text-sm font-semibold text-slate-900">Raphael Moraes</div>
              <div className="text-xs text-slate-500">Administrador</div>
            </div>
            <button className="ghost-button !rounded-2xl !px-3 !py-3" type="button">
              <MessageSquareText className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
