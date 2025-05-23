
import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { NoteEditor } from '../components/NoteEditor';
import { SearchBar } from '../components/SearchBar';
import { SidebarProvider } from '../context/SidebarContext';
import { NotesProvider } from '../context/NotesContext';
import { FileText } from 'lucide-react';

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
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-white shadow-md transform rotate-12 hover:rotate-0 transition-all duration-300">
                    <FileText className="h-5 w-5" />
                  </div>
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
