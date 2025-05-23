
import React, { useState } from 'react';
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
              <SearchBar />
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
