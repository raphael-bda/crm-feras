import type {
  Agent,
  Board,
  CapacityPoint,
  ChannelStat,
  Conversation,
  KanbanColumn,
  KpiStat,
  MessageTemplate,
  PlatformUser,
  TagStat,
  TeamInfo,
  TrendPoint,
  Wallet,
} from '../types';

export const agents: Agent[] = [
  { id: 'a1', name: 'Marina Faria', role: 'Coordenadora comercial', status: 'online', initials: 'MF', workload: 18 },
  { id: 'a2', name: 'Felipe Torres', role: 'Inside sales', status: 'ocupado', workload: 11 },
  { id: 'a3', name: 'Juliana Souza', role: 'Pedagogico', status: 'online', initials: 'JS', workload: 7 },
  { id: 'a4', name: 'Roberta Nunes', role: 'Financeiro', status: 'ausente', initials: 'RN', workload: 4 },
  { id: 'a5', name: 'Diego Costa', role: 'Ouvidoria', status: 'online', initials: 'DC', workload: 9 },
  { id: 'a6', name: 'Fernanda Alves', role: 'Atendimento social', status: 'ocupado', workload: 13 },
];

export const conversations: Conversation[] = [
  {
    id: 'c1',
    name: 'Bianca Lopes',
    channel: 'whatsapp',
    team: 'Pedagogico',
    unread: 12,
    time: 'ha 5 meses',
    preview: 'Preciso confirmar a grade da turma intensiva para abril.',
    tab: 'novos',
    highlightTag: 'PREVENTIVO NOV',
    labelTone: 'bg-emerald-50 text-emerald-700',
    messages: [
      { id: 'm1', author: 'contato', body: 'Oi, voces conseguem me passar a grade da turma intensiva?', at: '09:12' },
      { id: 'm2', author: 'agente', body: 'Claro! Vou consultar o coordenador e ja volto com os horarios.', at: '09:15' },
    ],
  },
  {
    id: 'c2',
    name: 'Rafael Medeiros',
    channel: 'instagram',
    team: 'Social Media',
    unread: 3,
    time: 'ha 2 horas',
    preview: 'Tem bolsa para o curso executivo do segundo semestre?',
    tab: 'novos',
    labelTone: 'bg-fuchsia-50 text-fuchsia-700',
    messages: [
      { id: 'm3', author: 'contato', body: 'Vim pelo anuncio do Instagram. Quais bolsas estao abertas?', at: '11:41' },
      { id: 'm4', author: 'agente', body: 'Temos bolsas parciais para a turma premium. Posso te mandar a tabela?', at: '11:48' },
    ],
  },
  {
    id: 'c3',
    name: 'Escola Horizonte',
    channel: 'facebook',
    team: 'Comercial',
    unread: 0,
    time: 'ha 1 dia',
    preview: 'Nosso diretor quer uma demonstracao com foco em omnichannel.',
    tab: 'meus',
    labelTone: 'bg-blue-50 text-blue-700',
    messages: [
      { id: 'm5', author: 'contato', body: 'Estamos avaliando CRMs para atendimento escolar.', at: 'Ontem, 15:02' },
      { id: 'm6', author: 'agente', body: 'Perfeito. Posso reservar uma demo na quinta-feira as 16h.', at: 'Ontem, 15:09' },
    ],
  },
  {
    id: 'c4',
    name: 'Ana Paula Goulart',
    channel: 'whatsapp',
    team: 'Comercial',
    unread: 5,
    time: 'ha 32 min',
    preview: 'Ja enviei o contrato, preciso saber o prazo da assinatura.',
    tab: 'meus',
    labelTone: 'bg-violet-50 text-violet-700',
    messages: [
      { id: 'm7', author: 'agente', body: 'Acabei de compartilhar o contrato com o juridico.', at: '13:19' },
      { id: 'm8', author: 'contato', body: 'Perfeito, fico aguardando. Obrigada!', at: '13:22' },
    ],
  },
  {
    id: 'c5',
    name: 'Carlos Santana',
    channel: 'whatsapp',
    team: 'Financeiro',
    unread: 1,
    time: 'ha 18 min',
    preview: 'Voces podem reenviar o boleto da parcela de abril?',
    tab: 'outros',
    labelTone: 'bg-amber-50 text-amber-700',
    messages: [
      { id: 'm9', author: 'contato', body: 'Nao encontrei o boleto no meu e-mail.', at: '13:41' },
      { id: 'm10', author: 'agente', body: 'Posso reenviar agora para o seu WhatsApp e e-mail cadastrado.', at: '13:47' },
    ],
  },
  {
    id: 'c6',
    name: 'Livia Martins',
    channel: 'instagram',
    team: 'Pedagogico',
    unread: 7,
    time: 'ha 4 horas',
    preview: 'Meu filho pode recuperar as aulas gravadas desta semana?',
    tab: 'outros',
    labelTone: 'bg-sky-50 text-sky-700',
    messages: [
      { id: 'm11', author: 'contato', body: 'Nao consegui acessar a plataforma ontem.', at: '10:01' },
      { id: 'm12', author: 'agente', body: 'Pode sim. Vou gerar um link com o reenvio das aulas.', at: '10:05' },
    ],
  },
];

export const boards: Board[] = [
  { id: 'b1', name: 'Correios', description: 'Triagem de demandas logisticas e comprovantes.', teams: ['Comprovantes', 'Financeiro'] },
  { id: 'b2', name: 'Financeiro', description: 'Acompanhamento de cobrancas e renegociacoes.', teams: ['Financeiro'], pinned: true },
  { id: 'b3', name: 'Funil Teste', description: 'Espaco experimental para automacoes e SLA.', teams: ['Inside Sales'] },
  { id: 'b4', name: 'Juridico', description: 'Aprovacoes, contratos e analise de documentos.', teams: ['Juridico'] },
  { id: 'b5', name: 'Matriculas/Baixa', description: 'Controle de matriculas, cancelamentos e onboarding.', teams: ['Secretaria', 'Comercial'], pinned: true },
  { id: 'b6', name: 'Ouvidoria', description: 'Casos sensiveis com tratativa prioritaria.', teams: ['Ouvidoria'] },
  { id: 'b7', name: 'Painel Comercial', description: 'Pipeline principal da operacao comercial.', teams: ['Comercial', 'Inside Sales'], pinned: true },
  { id: 'b8', name: 'Pedagogico', description: 'Acompanhamento de demandas academicas e rematriculas.', teams: ['Coordenacao Pedagogica'] },
  { id: 'b9', name: 'Secretaria', description: 'Documentos, certificados e atendimentos administrativos.', teams: ['Secretaria'] },
];

export const initialKanbanColumns: KanbanColumn[] = [
  {
    id: 'approach',
    name: 'Abordagem',
    tone: 'neutral',
    items: [
      { id: 'k1', code: 'FINA-254', name: 'Marcos Vinicius Costa', owner: 'MF', dueLabel: 'Hoje, 15:30', overdue: true, comments: 4 },
      { id: 'k2', code: 'COM-128', name: 'Escola Nova Era', owner: 'FT', dueLabel: '26/03, 09:00', comments: 2 },
      { id: 'k3', code: 'MAT-844', name: 'Luciana P. Brito', owner: 'JS', dueLabel: 'Sem prazo', comments: 1 },
    ],
  },
  {
    id: 'day1',
    name: '1 Dia',
    tone: 'warning',
    items: [
      { id: 'k4', code: 'PED-510', name: 'Colegio Vanguarda', owner: 'RN', dueLabel: 'Hoje, 18:00', comments: 8 },
      { id: 'k5', code: 'COM-031', name: 'Amanda Siqueira', owner: 'FA', dueLabel: 'Amanha, 11:00', comments: 3, archived: true },
    ],
  },
  {
    id: 'day2',
    name: '2 Dia',
    tone: 'info',
    items: [
      { id: 'k6', code: 'JUR-019', name: 'Grupo Impacta Educacao', owner: 'DC', dueLabel: '28/03, 14:30', comments: 5 },
      { id: 'k7', code: 'COM-404', name: 'Patricia Mello', owner: 'MF', dueLabel: '29/03, 10:15', comments: 2 },
    ],
  },
  {
    id: 'closing',
    name: 'Encerramento',
    tone: 'success',
    items: [
      { id: 'k8', code: 'PED-103', name: 'Fernando Bastos', owner: 'JS', dueLabel: '31/03, 17:00', comments: 6 },
      { id: 'k9', code: 'FINA-702', name: 'Instituto Saber+', owner: 'RN', dueLabel: 'Hoje, 16:10', overdue: true, comments: 9 },
    ],
  },
];

export const wallets: Wallet[] = [
  { id: 'w1', initials: 'AM', name: 'Ana Moura', teams: ['Comercial', 'Inside Sales'], contacts: 428 },
  { id: 'w2', initials: 'LL', name: 'Larissa Lima', teams: ['Comercial'], contacts: 4425 },
  { id: 'w3', initials: 'JS', name: 'Juliana Santos', teams: ['Pedagogico'], contacts: 983 },
  { id: 'w4', initials: 'RM', name: 'Rafael Mota', teams: ['Financeiro', 'Ouvidoria'], contacts: 1160 },
  { id: 'w5', initials: 'FC', name: 'Fernanda Campos', teams: ['Secretaria'], contacts: 756 },
];

export const reportTabs = [
  { id: 'geral', label: 'Geral' },
  { id: 'usuario', label: 'Usuario' },
  { id: 'resultados', label: 'Resultados' },
] as const;

export const reportKpis: KpiStat[] = [
  { title: 'Pendentes antes do periodo', value: '742', helper: 'Backlog inicial consolidado', tone: 'dark' },
  { title: 'Novos no periodo', value: '1.218', helper: 'Media de 152 por dia', tone: 'success' },
  { title: 'Concluidos no periodo', value: '1.107', helper: 'Ritmo de 138 por dia', tone: 'info' },
  { title: 'Pendentes apos o periodo', value: '853', helper: 'Variacao de +14,9%', tone: 'warning' },
];

export const capacityData: CapacityPoint[] = [
  { label: '18/3', incoming: 120, resolved: 112, pending: 101 },
  { label: '19/3', incoming: 136, resolved: 127, pending: 109 },
  { label: '20/3', incoming: 149, resolved: 132, pending: 115 },
  { label: '21/3', incoming: 162, resolved: 138, pending: 121 },
  { label: '22/3', incoming: 151, resolved: 140, pending: 118 },
  { label: '23/3', incoming: 167, resolved: 149, pending: 126 },
  { label: '24/3', incoming: 173, resolved: 155, pending: 131 },
  { label: '25/3', incoming: 160, resolved: 154, pending: 124 },
];

export const waitTimeData: TrendPoint[] = [
  { label: '18/3', primary: 88, area: 67, secondary: 26 },
  { label: '19/3', primary: 76, area: 65, secondary: 31 },
  { label: '20/3', primary: 82, area: 70, secondary: 34 },
  { label: '21/3', primary: 93, area: 74, secondary: 27 },
  { label: '22/3', primary: 79, area: 68, secondary: 29 },
  { label: '23/3', primary: 84, area: 71, secondary: 33 },
  { label: '24/3', primary: 78, area: 73, secondary: 36 },
  { label: '25/3', primary: 74, area: 69, secondary: 39 },
];

export const durationData: TrendPoint[] = [
  { label: '18/3', primary: 4.2, area: 3.8, secondary: 2.5 },
  { label: '19/3', primary: 4.5, area: 3.9, secondary: 2.7 },
  { label: '20/3', primary: 4.1, area: 4.0, secondary: 2.8 },
  { label: '21/3', primary: 4.8, area: 4.2, secondary: 2.9 },
  { label: '22/3', primary: 4.4, area: 4.1, secondary: 3.1 },
  { label: '23/3', primary: 4.7, area: 4.3, secondary: 3.2 },
  { label: '24/3', primary: 4.3, area: 4.2, secondary: 3.3 },
  { label: '25/3', primary: 4.6, area: 4.4, secondary: 3.5 },
];

export const heatmapDates = ['18/3', '19/3', '20/3', '21/3', '22/3', '23/3', '24/3', '25/3'];

export const heatmapHours = Array.from({ length: 24 }, (_, index) => `${String(index).padStart(2, '0')}:00`);

export const heatmapData = heatmapHours.map((_, row) =>
  heatmapDates.map((__, col) => {
    const base = Math.round(((Math.sin((row + 2) / 3) + 1) * 3) + col * 0.8);
    const businessHours = row >= 8 && row <= 20 ? 5 : 1;
    const lunchPeak = row === 12 ? 6 : 0;
    return Math.min(19, base + businessHours + lunchPeak);
  }),
);

export const channelStats: ChannelStat[] = [
  { channel: 'whatsapp', label: 'WhatsApp', total: 1480, color: '#22C55E' },
  { channel: 'facebook', label: 'Facebook', total: 312, color: '#3B82F6' },
  { channel: 'instagram', label: 'Instagram', total: 604, color: '#8B5CF6' },
];

export const tagStats: TagStat[] = [
  { label: 'Novo Contato', total: 182 },
  { label: 'Meta', total: 166 },
  { label: 'Meta Ads', total: 145 },
  { label: 'Dezembro', total: 121 },
  { label: 'Pedagogico', total: 118 },
  { label: 'Reativacao', total: 104 },
  { label: 'Social Media', total: 97 },
  { label: 'Comercial', total: 83 },
];

export const platformUsers: PlatformUser[] = [
  { id: 'u1', name: 'Camila Marins', displayName: 'Camila', profile: 'Administrador', initials: 'CM' },
  { id: 'u2', name: 'Fabio Teixeira', displayName: 'Fabio', profile: 'Atendente', initials: 'FT' },
  { id: 'u3', name: 'Aline Duarte', displayName: 'Aline', profile: 'Atendente restrito', initials: 'AD' },
  { id: 'u4', name: 'Joao Pedro Reis', displayName: 'JP', profile: 'Atendente', initials: 'JR', blocked: true },
  { id: 'u5', name: 'Fernanda Oliveira', displayName: 'Fefe', profile: 'Administrador', initials: 'FO' },
  { id: 'u6', name: 'Nathalia Rocha', displayName: 'Nath', profile: 'Atendente', initials: 'NR' },
];

export const teams: TeamInfo[] = [
  { id: 't1', name: 'Certificacoes', users: 6, channels: ['whatsapp'] },
  { id: 't2', name: 'Comercial', users: 9, channels: ['whatsapp', 'instagram'], isDefault: true },
  { id: 't3', name: 'Comprovantes', users: 17, channels: ['whatsapp'] },
  { id: 't4', name: 'Coordenacao Pedagogica', users: 2, channels: ['whatsapp', 'facebook'] },
  { id: 't5', name: 'Financeiro', users: 7, channels: ['whatsapp'] },
  { id: 't6', name: 'Inside Sales', users: 4, channels: ['instagram', 'facebook'] },
  { id: 't7', name: 'Juridico', users: 5, channels: ['whatsapp', 'facebook'] },
];

export const messageTemplates: MessageTemplate[] = [
  {
    id: 'mt1',
    preview: 'Ola, {{nome}}! Sua matricula foi aprovada e o boleto ja esta disponivel.',
    type: 'Campanha',
    availability: 'Toda a empresa',
    status: 'ATIVO',
    channel: 'whatsapp',
  },
  {
    id: 'mt2',
    preview: 'Recebemos sua solicitacao. Em ate 30 minutos um especialista vai falar com voce.',
    type: 'Resposta rapida',
    availability: '+55 11 99888-1200',
    status: 'ATIVO',
    channel: 'whatsapp',
  },
  {
    id: 'mt3',
    preview: 'Bem-vindo ao curso executivo! Aqui esta o cronograma das primeiras aulas.',
    type: 'Campanha',
    availability: 'Equipe Comercial',
    status: 'ATIVO',
    channel: 'instagram',
  },
  {
    id: 'mt4',
    preview: 'Seu certificado foi emitido e pode ser baixado pelo portal do aluno.',
    type: 'Resposta rapida',
    availability: 'Equipe Secretaria',
    status: 'ATIVO',
    channel: 'facebook',
  },
  {
    id: 'mt5',
    preview: 'Conseguimos uma condicao especial para sua rematricula ate sexta-feira.',
    type: 'Campanha',
    availability: '+55 21 99771-0045',
    status: 'ATIVO',
    channel: 'whatsapp',
  },
];
