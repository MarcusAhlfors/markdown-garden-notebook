
import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { NoteEditor } from '../components/NoteEditor';
import { SearchBar } from '../components/SearchBar';
import { SidebarProvider } from '../context/SidebarContext';
import { NotesProvider } from '../context/NotesContext';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { KanbanBoard } from '../components/KanbanBoard';

const Index = () => {
  return <NotesProvider>
      <SidebarProvider>
        <div className="min-h-screen bg-gray-50 flex w-full">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <header className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 mr-4">
                  <img src="/lovable-uploads/5f4c90dc-855c-42b0-8834-74ff1bee8550.png" alt="MarkNote Logo" className="h-10 w-auto" />
                  <span className="font-bold text-gray-800 hidden sm:block text-3xl">MarkNote</span>
                </div>
                <div className="flex-1">
                  <SearchBar />
                </div>
              </div>
            </header>
            <main className="flex-1 p-6">
              <Tabs defaultValue="notes" className="w-full">
                <TabsList className="mb-4">
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                  <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
                </TabsList>
                <TabsContent value="notes" className="mt-0">
                  <NoteEditor />
                </TabsContent>
                <TabsContent value="kanban" className="mt-0">
                  <KanbanBoard />
                </TabsContent>
              </Tabs>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </NotesProvider>;
};
export default Index;
