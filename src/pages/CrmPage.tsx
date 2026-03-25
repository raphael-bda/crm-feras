import {
  Archive,
  ArrowLeft,
  ChevronRight,
  Clock3,
  CircleAlert,
  Download,
  MessageSquare,
  MoreVertical,
  Pin,
  Plus,
  Search,
  Settings2,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import type { Board, CrmSection, KanbanColumn, Wallet } from '../types';

interface CrmPageProps {
  boards: Board[];
  crmSection: CrmSection;
  selectedBoardId: string;
  kanbanColumns: KanbanColumn[];
  wallets: Wallet[];
  onChangeSection: (section: CrmSection) => void;
  onMoveItem: (itemId: string, sourceId: string, targetId: string) => void;
  onOpenBoard: (boardId: string) => void;
}

const sectionPills: Array<{ id: CrmSection; label: string }> = [
  { id: 'paineis', label: 'Paineis' },
  { id: 'kanban', label: 'Kanban' },
  { id: 'carteiras', label: 'Carteiras' },
];

const columnToneStyles = {
  neutral: 'bg-slate-100 text-slate-700',
  warning: 'bg-amber-100 text-amber-700',
  info: 'bg-sky-100 text-sky-700',
  success: 'bg-emerald-100 text-emerald-700',
};

export function CrmPage({
  boards,
  crmSection,
  selectedBoardId,
  kanbanColumns,
  wallets,
  onChangeSection,
  onMoveItem,
  onOpenBoard,
}: CrmPageProps) {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'todos' | 'atrasados' | 'programados'>('todos');
  const [showArchived, setShowArchived] = useState(false);
  const [draggingItemId, setDraggingItemId] = useState<string | null>(null);
  const [sourceColumnId, setSourceColumnId] = useState<string | null>(null);
  const [overColumnId, setOverColumnId] = useState<string | null>(null);

  const currentBoard = boards.find((board) => board.id === selectedBoardId) ?? boards[0];

  return (
    <section className="space-y-6">
      <div className="surface-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-500">CRM</div>
            <div className="mt-1 text-2xl font-semibold text-slate-900">Gestao comercial, funis e carteiras</div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 p-1">
            {sectionPills.map((item) => (
              <button
                key={item.id}
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  crmSection === item.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                }`}
                onClick={() => onChangeSection(item.id)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {crmSection === 'paineis' ? (
        <div className="surface-card p-8">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Paineis</h1>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Controle suas vendas, crie funis, tarefas e atividades utilizando os novos paineis.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {boards.map((board) => (
              <article key={board.id} className="rounded-[30px] border border-slate-100 bg-slate-50/80 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-semibold uppercase tracking-[0.06em] text-slate-900">{board.name}</div>
                    <div className="mt-3 text-sm leading-6 text-slate-500">{board.description}</div>
                  </div>
                  {board.pinned ? (
                    <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">Fixado</span>
                  ) : null}
                </div>

                <div className="my-6 h-px bg-slate-200" />

                <div className="inline-flex items-center gap-2 text-sm text-slate-600">
                  <Users className="h-4 w-4" />
                  {board.teams.length > 0 ? board.teams.join(', ') : 'Para toda a empresa'}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button className="ghost-button !rounded-2xl !px-3 !py-3" type="button">
                      <Settings2 className="h-4 w-4" />
                    </button>
                    <button className="ghost-button !rounded-2xl !px-3 !py-3" type="button">
                      <Pin className="h-4 w-4" />
                    </button>
                  </div>

                  <button className="solid-button" onClick={() => onOpenBoard(board.id)} type="button">
                    Abrir
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : null}

      {crmSection === 'kanban' ? (
        <div className="space-y-5">
          <div className="surface-card p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button className="ghost-button" onClick={() => onChangeSection('paineis')} type="button">
                  <ArrowLeft className="h-4 w-4" />
                  Voltar
                </button>
                <div>
                  <div className="text-xs uppercase tracking-[0.28em] text-slate-500">Painel ativo</div>
                  <div className="text-2xl font-semibold text-slate-900">{currentBoard.name}</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    className="field pl-11"
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Buscar item ou codigo"
                    value={query}
                  />
                </div>
                <select
                  className="field"
                  onChange={(event) => setStatusFilter(event.target.value as 'todos' | 'atrasados' | 'programados')}
                  value={statusFilter}
                >
                  <option value="todos">Todos os status</option>
                  <option value="atrasados">Apenas atrasados</option>
                  <option value="programados">Com data definida</option>
                </select>
                <button
                  className={`ghost-button ${showArchived ? '!border-brand/30 !text-brand' : ''}`}
                  onClick={() => setShowArchived((current) => !current)}
                  type="button"
                >
                  <Archive className="h-4 w-4" />
                  Itens arquivados
                </button>
                <button className="ghost-button" type="button">
                  <Download className="h-4 w-4" />
                  Exportar
                </button>
                <button className="ghost-button" type="button">
                  <Settings2 className="h-4 w-4" />
                  Configurar
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-4">
            {kanbanColumns.map((column) => {
              const filteredItems = column.items.filter((item) => {
                const matchesQuery =
                  item.name.toLowerCase().includes(query.toLowerCase()) ||
                  item.code.toLowerCase().includes(query.toLowerCase());
                const matchesArchived = showArchived ? true : !item.archived;
                const matchesStatus =
                  statusFilter === 'todos'
                    ? true
                    : statusFilter === 'atrasados'
                      ? Boolean(item.overdue)
                      : !item.overdue && item.dueLabel !== 'Sem prazo';

                return matchesQuery && matchesArchived && matchesStatus;
              });

              return (
                <div
                  key={column.id}
                  className={`surface-card flex min-h-[620px] flex-col p-4 ${overColumnId === column.id ? 'ring-2 ring-brand/25' : ''}`}
                  onDragLeave={() => setOverColumnId(null)}
                  onDragOver={(event) => {
                    event.preventDefault();
                    setOverColumnId(column.id);
                  }}
                  onDrop={() => {
                    if (draggingItemId && sourceColumnId) {
                      onMoveItem(draggingItemId, sourceColumnId, column.id);
                    }
                    setDraggingItemId(null);
                    setSourceColumnId(null);
                    setOverColumnId(null);
                  }}
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-700">
                        {column.name} ({filteredItems.length})
                      </div>
                      <span className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${columnToneStyles[column.tone]}`}>
                        Etapa ativa
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <MessageSquare className="h-4 w-4" />
                      <Clock3 className="h-4 w-4" />
                      <CircleAlert className="h-4 w-4" />
                      <MoreVertical className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="flex-1 space-y-3">
                    {filteredItems.map((item) => (
                      <article
                        key={item.id}
                        className="cursor-move rounded-[28px] border border-slate-100 bg-slate-50 p-4 transition hover:border-brand/20 hover:bg-white"
                        draggable
                        onDragStart={() => {
                          setDraggingItemId(item.id);
                          setSourceColumnId(column.id);
                        }}
                      >
                        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">{item.code}</div>
                        <div className="mt-2 text-base font-semibold text-slate-900">{item.name}</div>

                        <div className="mt-4 flex items-center justify-between gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                            {item.owner}
                          </div>
                          <div className={`rounded-full px-3 py-1 text-xs font-semibold ${item.overdue ? 'bg-danger/10 text-danger' : 'bg-slate-200 text-slate-600'}`}>
                            {item.overdue ? 'Atrasado' : item.dueLabel}
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                          <span>{item.dueLabel}</span>
                          <span className="inline-flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            {item.comments}
                          </span>
                        </div>
                      </article>
                    ))}
                  </div>

                  <button className="ghost-button mt-4 w-full justify-center" type="button">
                    <Plus className="h-4 w-4" />
                    Novo item
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      {crmSection === 'carteiras' ? (
        <div className="surface-card p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-2xl font-semibold text-slate-900">Carteiras</div>
              <div className="text-sm text-slate-500">Distribuicao de contatos vinculada a agentes e equipes</div>
            </div>
            <button className="solid-button" type="button">
              <Plus className="h-4 w-4" />
              Novo
            </button>
          </div>

          <div className="mt-6 overflow-hidden rounded-[30px] border border-slate-100">
            <table className="min-w-full border-collapse">
              <thead className="bg-slate-50">
                <tr className="text-left text-sm text-slate-500">
                  <th className="px-5 py-4 font-medium">Nome</th>
                  <th className="px-5 py-4 font-medium">Equipes</th>
                  <th className="px-5 py-4 font-medium">Contatos</th>
                </tr>
              </thead>
              <tbody>
                {wallets.map((wallet, index) => (
                  <tr key={wallet.id} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                          {wallet.initials}
                        </div>
                        <span className="font-medium text-slate-900">{wallet.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">{wallet.teams.join(', ')}</td>
                    <td className="px-5 py-4 text-sm font-semibold text-slate-900">{wallet.contacts.toLocaleString('pt-BR')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </section>
  );
}
