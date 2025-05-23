
import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { NoteEditor } from '../components/NoteEditor';
import { SearchBar } from '../components/SearchBar';
import { SidebarProvider } from '../context/SidebarContext';
import { NotesProvider } from '../context/NotesContext';

const Index = () => {
  return (
    <NotesProvider>
      <SidebarProvider>
        <div className="min-h-screen bg-gray-50 flex w-full">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <header className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 mr-4">
                  <img 
                    src="/lovable-uploads/5f4c90dc-855c-42b0-8834-74ff1bee8550.png" 
                    alt="MarkNote Logo" 
                    className="h-10 w-auto"
                  />
                  <span className="font-bold text-xl text-gray-800 hidden sm:block">MarkNote</span>
                </div>
                <div className="flex-1">
                  <SearchBar />
                </div>
              </div>
            </header>
            <main className="flex-1 p-6">
              <NoteEditor />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </NotesProvider>
  );
};

export default Index;
