import { ArrowUpDown, MessageSquareText, Phone, Search, Send, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { ChannelBadge } from '../components/ChannelBadge';
import type { Conversation, InboxTab } from '../types';

interface AtendimentosPageProps {
  conversations: Conversation[];
}

const tabs: Array<{ id: InboxTab; label: string; badge?: string }> = [
  { id: 'novos', label: 'Novos', badge: '1k+' },
  { id: 'meus', label: 'Meus' },
  { id: 'outros', label: 'Outros', badge: '27' },
];

export function AtendimentosPage({ conversations }: AtendimentosPageProps) {
  const [activeTab, setActiveTab] = useState<InboxTab>('novos');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);

  const filteredConversations = conversations.filter((conversation) => {
    if (conversation.tab !== activeTab) {
      return false;
    }

    if (showUnreadOnly && conversation.unread === 0) {
      return false;
    }

    return true;
  });

  const selectedConversation =
    filteredConversations.find((conversation) => conversation.id === selectedConversationId) ?? null;

  return (
    <section className="grid gap-6 xl:grid-cols-[320px,minmax(0,1fr)]">
      <div className="surface-card flex h-[calc(100vh-142px)] flex-col overflow-hidden">
        <div className="border-b border-slate-100 px-5 pb-5 pt-6">
          <div className="rounded-2xl bg-info/10 px-4 py-3 text-sm font-medium text-info">
            Ative as notificacoes na web
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const isActive = tab.id === activeTab;

              return (
                <button
                  key={tab.id}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive ? 'bg-slate-900 text-white shadow-soft' : 'bg-slate-100 text-slate-600 hover:text-brand'
                  }`}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSelectedConversationId(null);
                  }}
                  type="button"
                >
                  {tab.label}
                  {tab.badge ? (
                    <span className={`rounded-full px-2 py-0.5 text-xs ${isActive ? 'bg-white/15 text-white' : 'bg-white text-slate-500'}`}>
                      {tab.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 p-1">
              <button
                className={`rounded-full px-3 py-1.5 text-xs font-semibold ${!showUnreadOnly ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
                onClick={() => setShowUnreadOnly(false)}
                type="button"
              >
                Todas
              </button>
              <button
                className={`rounded-full px-3 py-1.5 text-xs font-semibold ${showUnreadOnly ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}
                onClick={() => setShowUnreadOnly((current) => !current)}
                type="button"
              >
                Apenas nao lidas
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button className="ghost-button !rounded-2xl !px-3 !py-3" type="button">
                <Search className="h-4 w-4" />
              </button>
              <button className="ghost-button !rounded-2xl !px-3 !py-3" type="button">
                <SlidersHorizontal className="h-4 w-4" />
              </button>
              <button className="ghost-button !rounded-2xl !px-3 !py-3" type="button">
                <ArrowUpDown className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {filteredConversations.map((conversation) => (
            <button
              key={conversation.id}
              className={`w-full rounded-[28px] border p-4 text-left transition ${
                selectedConversationId === conversation.id
                  ? 'border-brand/30 bg-brand/5 shadow-soft'
                  : 'border-slate-100 bg-white hover:border-brand/20'
              }`}
              onClick={() => setSelectedConversationId(conversation.id)}
              type="button"
            >
              <div className="flex items-start gap-3">
                <div className="relative shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-slate-900 to-slate-700 text-sm font-semibold text-white">
                    {conversation.name
                      .split(' ')
                      .slice(0, 2)
                      .map((name) => name[0])
                      .join('')}
                  </div>
                  <ChannelBadge channel={conversation.channel} className="absolute -bottom-2 -right-2 px-1.5 py-1" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-slate-900">{conversation.name}</div>
                      <span className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${conversation.labelTone}`}>
                        {conversation.team}
                      </span>
                    </div>

                    <div className="text-right">
                      {conversation.unread > 0 ? (
                        <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-danger px-2 py-1 text-[11px] font-semibold text-white">
                          {conversation.unread}
                        </span>
                      ) : null}
                      <div className="mt-2 text-[11px] text-slate-400">{conversation.time}</div>
                    </div>
                  </div>

                  {conversation.highlightTag ? (
                    <div className="mt-3">
                      <span className="rounded-full bg-emerald-700 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                        {conversation.highlightTag}
                      </span>
                    </div>
                  ) : null}

                  <div className="line-clamp-two mt-3 text-sm text-slate-500">
                    {conversation.preview}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="border-t border-slate-100 p-4">
          <div className="grid gap-3 md:grid-cols-[96px,minmax(0,1fr)]">
            <select className="field">
              <option>+55</option>
              <option>+1</option>
              <option>+351</option>
            </select>
            <input className="field" placeholder="Digite um numero de telefone" />
          </div>
          <button className="solid-button mt-3 w-full" type="button">
            <Phone className="h-4 w-4" />
            Conversar
          </button>
        </div>
      </div>

      <div className="surface-card flex min-h-[680px] flex-col overflow-hidden">
        {selectedConversation ? (
          <>
            <div className="border-b border-slate-100 px-6 py-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xl font-semibold text-slate-900">{selectedConversation.name}</div>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <ChannelBadge channel={selectedConversation.channel} showLabel />
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${selectedConversation.labelTone}`}>
                      {selectedConversation.team}
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
                  SLA ativo - tempo medio de resposta 6 min
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto bg-[linear-gradient(180deg,rgba(248,250,252,0.85),rgba(255,255,255,0.96))] px-6 py-6">
              {selectedConversation.messages.map((message) => (
                <div key={message.id} className={`flex ${message.author === 'agente' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[70%] rounded-[28px] px-4 py-3 text-sm shadow-sm ${
                      message.author === 'agente'
                        ? 'rounded-br-md bg-brand text-white'
                        : 'rounded-bl-md border border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    <div>{message.body}</div>
                    <div className={`mt-2 text-[11px] ${message.author === 'agente' ? 'text-white/70' : 'text-slate-400'}`}>
                      {message.at}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-100 bg-white px-6 py-4">
              <div className="flex items-center gap-3 rounded-[28px] border border-slate-200 bg-slate-50 px-4 py-3">
                <input
                  className="w-full border-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                  placeholder="Escreva uma resposta, use modelos ou encaminhe para outro agente"
                />
                <button className="solid-button !rounded-2xl !px-3 !py-3" type="button">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center px-6 text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-300">
              <MessageSquareText className="h-10 w-10" />
            </div>
            <div className="mt-6 text-xl font-semibold text-slate-700">Escolha um atendimento para iniciar a conversa</div>
            <div className="mt-2 max-w-md text-sm text-slate-500">
              O canal omnichannel do CRM Feras centraliza WhatsApp, Instagram e Facebook em uma unica fila com SLA, etiquetas e distribuicao por equipe.
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
