export type MainSection = 'atendimentos' | 'crm' | 'apps' | 'relatorios' | 'ajustes';
export type CrmSection = 'paineis' | 'kanban' | 'carteiras';
export type SettingsSection = 'usuarios' | 'equipes' | 'modelos';
export type ReportSection = 'geral' | 'usuario' | 'resultados';
export type Channel = 'whatsapp' | 'instagram' | 'facebook';
export type InboxTab = 'novos' | 'meus' | 'outros';
export type AgentStatus = 'online' | 'ocupado' | 'ausente';
export type ColumnTone = 'neutral' | 'warning' | 'info' | 'success';
export type UserProfile = 'Administrador' | 'Atendente' | 'Atendente restrito';

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
  initials?: string;
  workload: number;
}

export interface Message {
  id: string;
  author: 'contato' | 'agente';
  body: string;
  at: string;
}

export interface Conversation {
  id: string;
  name: string;
  channel: Channel;
  team: string;
  unread: number;
  time: string;
  preview: string;
  tab: InboxTab;
  highlightTag?: string;
  labelTone: string;
  messages: Message[];
}

export interface Board {
  id: string;
  name: string;
  description: string;
  teams: string[];
  pinned?: boolean;
}

export interface KanbanItem {
  id: string;
  code: string;
  name: string;
  owner: string;
  dueLabel: string;
  overdue?: boolean;
  comments: number;
  archived?: boolean;
}

export interface KanbanColumn {
  id: string;
  name: string;
  tone: ColumnTone;
  items: KanbanItem[];
}

export interface Wallet {
  id: string;
  initials: string;
  name: string;
  teams: string[];
  contacts: number;
}

export interface KpiStat {
  title: string;
  value: string;
  helper: string;
  tone: 'dark' | 'success' | 'info' | 'warning';
}

export interface CapacityPoint {
  label: string;
  incoming: number;
  resolved: number;
  pending: number;
}

export interface TrendPoint {
  label: string;
  primary: number;
  area: number;
  secondary: number;
}

export interface ChannelStat {
  channel: Channel;
  label: string;
  total: number;
  color: string;
}

export interface TagStat {
  label: string;
  total: number;
}

export interface PlatformUser {
  id: string;
  name: string;
  displayName: string;
  profile: UserProfile;
  blocked?: boolean;
  initials: string;
}

export interface TeamInfo {
  id: string;
  name: string;
  users: number;
  channels: Channel[];
  isDefault?: boolean;
}

export interface MessageTemplate {
  id: string;
  preview: string;
  type: 'Campanha' | 'Resposta rapida';
  availability: string;
  status: 'ATIVO';
  channel: Channel;
}
