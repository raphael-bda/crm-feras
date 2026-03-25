import { useState } from 'react';
import { AgentSidebar } from './components/AgentSidebar';
import { TopBar } from './components/TopBar';
import {
  agents,
  boards,
  conversations,
  initialKanbanColumns,
  wallets,
  reportKpis,
  capacityData,
  waitTimeData,
  durationData,
  heatmapData,
  heatmapDates,
  heatmapHours,
  channelStats,
  tagStats,
  platformUsers,
  teams,
  messageTemplates,
} from './data/mockData';
import { AjustesPage } from './pages/AjustesPage';
import { AppsPage } from './pages/AppsPage';
import { AtendimentosPage } from './pages/AtendimentosPage';
import { CrmPage } from './pages/CrmPage';
import { RelatoriosPage } from './pages/RelatoriosPage';
import type { CrmSection, KanbanColumn, MainSection } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState<MainSection>('atendimentos');
  const [crmSection, setCrmSection] = useState<CrmSection>('paineis');
  const [selectedBoardId, setSelectedBoardId] = useState('b7');
  const [kanbanColumns, setKanbanColumns] = useState<KanbanColumn[]>(initialKanbanColumns);

  function openBoard(boardId: string) {
    setSelectedBoardId(boardId);
    setCrmSection('kanban');
    setActiveSection('crm');
  }

  function moveKanbanItem(itemId: string, sourceId: string, targetId: string) {
    if (sourceId === targetId) {
      return;
    }

    setKanbanColumns((current) => {
      const sourceColumn = current.find((column) => column.id === sourceId);
      const targetColumn = current.find((column) => column.id === targetId);

      if (!sourceColumn || !targetColumn) {
        return current;
      }

      const item = sourceColumn.items.find((entry) => entry.id === itemId);

      if (!item) {
        return current;
      }

      return current.map((column) => {
        if (column.id === sourceId) {
          return { ...column, items: column.items.filter((entry) => entry.id !== itemId) };
        }

        if (column.id === targetId) {
          return { ...column, items: [item, ...column.items] };
        }

        return column;
      });
    });
  }

  return (
    <div className="min-h-screen">
      <TopBar activeSection={activeSection} onChangeSection={setActiveSection} />

      <div className="mx-auto flex max-w-[1680px] gap-6 px-4 pb-6 pt-6 lg:px-6">
        <main className="min-w-0 flex-1">
          {activeSection === 'atendimentos' ? <AtendimentosPage conversations={conversations} /> : null}
          {activeSection === 'crm' ? (
            <CrmPage
              boards={boards}
              crmSection={crmSection}
              selectedBoardId={selectedBoardId}
              kanbanColumns={kanbanColumns}
              onChangeSection={setCrmSection}
              onMoveItem={moveKanbanItem}
              onOpenBoard={openBoard}
              wallets={wallets}
            />
          ) : null}
          {activeSection === 'apps' ? <AppsPage /> : null}
          {activeSection === 'relatorios' ? (
            <RelatoriosPage
              channelStats={channelStats}
              capacityData={capacityData}
              durationData={durationData}
              heatmapData={heatmapData}
              heatmapDates={heatmapDates}
              heatmapHours={heatmapHours}
              reportKpis={reportKpis}
              tagStats={tagStats}
              waitTimeData={waitTimeData}
            />
          ) : null}
          {activeSection === 'ajustes' ? (
            <AjustesPage messageTemplates={messageTemplates} platformUsers={platformUsers} teams={teams} />
          ) : null}
        </main>

        <AgentSidebar agents={agents} />
      </div>
    </div>
  );
}
