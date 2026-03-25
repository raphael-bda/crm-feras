import { AlertTriangle, ChevronLeft, ChevronRight, Plus, RefreshCw, Search } from 'lucide-react';
import { useState } from 'react';
import { ChannelBadge } from '../components/ChannelBadge';
import type { MessageTemplate, PlatformUser, SettingsSection, TeamInfo } from '../types';

interface AjustesPageProps {
  messageTemplates: MessageTemplate[];
  platformUsers: PlatformUser[];
  teams: TeamInfo[];
}

const sectionTabs: Array<{ id: SettingsSection; label: string }> = [
  { id: 'usuarios', label: 'Usuarios' },
  { id: 'equipes', label: 'Equipes' },
  { id: 'modelos', label: 'Modelos de mensagem' },
];

const profileStyles = {
  Administrador: 'bg-slate-900 text-white',
  Atendente: 'bg-sky-100 text-sky-700',
  'Atendente restrito': 'bg-amber-100 text-amber-700',
};

export function AjustesPage({ messageTemplates, platformUsers, teams }: AjustesPageProps) {
  const [activeSection, setActiveSection] = useState<SettingsSection>('usuarios');

  const groupedTeams = teams.reduce<Record<string, TeamInfo[]>>((groups, team) => {
    const initial = team.name[0].toUpperCase();
    groups[initial] ??= [];
    groups[initial].push(team);
    return groups;
  }, {});

  return (
    <section className="space-y-6">
      <div className="surface-card p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.28em] text-slate-500">Ajustes</div>
            <div className="mt-1 text-2xl font-semibold text-slate-900">Usuarios, equipes e modelos de mensagem</div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 p-1">
            {sectionTabs.map((tab) => (
              <button
                key={tab.id}
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  activeSection === tab.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                }`}
                onClick={() => setActiveSection(tab.id)}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeSection === 'usuarios' ? (
        <div className="surface-card p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-2xl font-semibold text-slate-900">Usuarios</div>
              <div className="text-sm text-slate-500">36 de 36 usuarios contratados</div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button className="ghost-button" type="button">
                <RefreshCw className="h-4 w-4" />
              </button>
              <button className="solid-button" type="button">
                <Plus className="h-4 w-4" />
                Novo
              </button>
            </div>
          </div>

          <div className="mt-5 rounded-[28px] border border-danger/20 bg-danger/10 px-5 py-4 text-sm text-danger">
            <div className="inline-flex items-center gap-2 font-semibold">
              <AlertTriangle className="h-4 w-4" />
              Voce atingiu o total de 36 usuarios contratados. Entre em contato para solicitar a alteracao do seu plano.
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div className="relative min-w-[280px] flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input className="field pl-11" placeholder="Buscar usuario" />
            </div>
            <select className="field max-w-[220px]">
              <option>Perfil: Todos</option>
              <option>Administrador</option>
              <option>Atendente</option>
              <option>Atendente restrito</option>
            </select>
          </div>

          <div className="mt-6 overflow-hidden rounded-[30px] border border-slate-100">
            {platformUsers.map((user) => (
              <div key={user.id} className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 bg-white px-5 py-4 last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                    {user.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{user.name}</div>
                    <div className="text-sm text-slate-500">{user.displayName}</div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${profileStyles[user.profile]}`}>{user.profile}</span>
                  {user.blocked ? <span className="rounded-full bg-danger/10 px-3 py-1 text-xs font-semibold text-danger">Bloqueado</span> : null}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
            <span>1-36 de 36</span>
            <div className="flex items-center gap-2">
              <button className="ghost-button !rounded-2xl !px-3 !py-3" type="button">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="ghost-button !rounded-2xl !px-3 !py-3" type="button">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {activeSection === 'equipes' ? (
        <div className="surface-card p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-2xl font-semibold text-slate-900">Equipes</div>
              <div className="text-sm text-slate-500">{teams.length} equipes ativas</div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button className="ghost-button" type="button">
                <RefreshCw className="h-4 w-4" />
              </button>
              <button className="solid-button" type="button">
                <Plus className="h-4 w-4" />
                Novo
              </button>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div className="relative min-w-[280px] flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input className="field pl-11" placeholder="Buscar equipe" />
            </div>
            <select className="field max-w-[220px]">
              <option>Canais: Todos</option>
              <option>WhatsApp</option>
              <option>Instagram</option>
              <option>Facebook</option>
            </select>
          </div>

          <div className="mt-6 space-y-6">
            {Object.entries(groupedTeams).map(([letter, teamList]) => (
              <div key={letter}>
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">{letter}</div>
                <div className="space-y-3">
                  {teamList.map((team) => (
                    <div key={team.id} className="flex flex-wrap items-center justify-between gap-4 rounded-[28px] border border-slate-100 bg-slate-50 px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                          {team.name
                            .split(' ')
                            .slice(0, 2)
                            .map((part) => part[0])
                            .join('')}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{team.name}</div>
                          <div className="text-sm text-slate-500">{team.users} usuarios</div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {team.channels.map((channel) => (
                          <ChannelBadge key={`${team.id}-${channel}`} channel={channel} />
                        ))}
                        {team.isDefault ? (
                          <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">Padrao</span>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {activeSection === 'modelos' ? (
        <div className="surface-card p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-2xl font-semibold text-slate-900">Modelos de mensagem</div>
              <div className="text-sm text-slate-500">482 modelos</div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button className="ghost-button" type="button">
                <RefreshCw className="h-4 w-4" />
                Sincronizar
              </button>
              <button className="solid-button" type="button">
                <Plus className="h-4 w-4" />
                Novo
              </button>
            </div>
          </div>

          <div className="mt-5 grid gap-3 xl:grid-cols-[minmax(0,1fr),220px,220px,160px]">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input className="field pl-11" placeholder="Busca livre" />
            </div>
            <select className="field">
              <option>Todos os tipos</option>
              <option>Campanha</option>
              <option>Resposta rapida</option>
            </select>
            <select className="field">
              <option>Todos os canais</option>
              <option>WhatsApp</option>
              <option>Instagram</option>
              <option>Facebook</option>
            </select>
            <button className="ghost-button justify-center" type="button">
              Arquivados
            </button>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full border-collapse overflow-hidden rounded-[30px] border border-slate-100">
              <thead className="bg-slate-50 text-left text-sm text-slate-500">
                <tr>
                  <th className="px-5 py-4 font-medium">Modelo</th>
                  <th className="px-5 py-4 font-medium">Tipo</th>
                  <th className="px-5 py-4 font-medium">Disponibilidade</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {messageTemplates.map((template) => (
                  <tr key={template.id} className="border-t border-slate-100 bg-white">
                    <td className="max-w-[420px] px-5 py-4 text-sm text-slate-700">{template.preview}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">
                      {template.type === 'Resposta rapida' ? 'Resposta rapida' : 'Campanha'}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">{template.availability}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">{template.status}</span>
                        <ChannelBadge channel={template.channel} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
            <span>1-50 de 482</span>
            <div className="flex items-center gap-2">
              <button className="ghost-button !rounded-2xl !px-3 !py-3" type="button">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="ghost-button !rounded-2xl !px-3 !py-3" type="button">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
