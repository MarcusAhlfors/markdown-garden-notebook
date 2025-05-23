
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Note {
  id: string;
  title: string;
  content: string;
  folderId: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Folder {
  id: string;
  name: string;
  parentId: string | null;
  expanded: boolean;
}

interface NotesContextType {
  notes: Note[];
  folders: Folder[];
  activeNoteId: string | null;
  searchQuery: string;
  selectedTags: string[];
  createNote: (folderId: string) => void;
  updateNote: (noteId: string, updates: Partial<Note>) => void;
  deleteNote: (noteId: string) => void;
  createFolder: (name: string, parentId?: string) => void;
  toggleFolder: (folderId: string) => void;
  setActiveNote: (noteId: string | null) => void;
  setSearchQuery: (query: string) => void;
  toggleTag: (tag: string) => void;
  getAllTags: () => string[];
  getFilteredNotes: () => Note[];
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};

export const NotesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Welcome to Notes',
      content: '# Welcome to Your Note Taking App\n\nThis is your first note! You can:\n\n- Write in **markdown**\n- Organize with folders\n- Add #tags\n- Search everything\n\n```javascript\n// Even add code blocks!\nconsole.log("Hello, world!");\n```\n\nHappy note taking! 📝',
      folderId: 'root',
      tags: ['welcome', 'markdown'],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const [folders, setFolders] = useState<Folder[]>([
    { id: 'root', name: 'All Notes', parentId: null, expanded: true },
    { id: 'personal', name: 'Personal', parentId: 'root', expanded: true },
    { id: 'work', name: 'Work', parentId: 'root', expanded: false },
  ]);

  const [activeNoteId, setActiveNoteId] = useState<string | null>('1');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const createNote = (folderId: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '',
      folderId,
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setNotes(prev => [...prev, newNote]);
    setActiveNoteId(newNote.id);
  };

  const updateNote = (noteId: string, updates: Partial<Note>) => {
    setNotes(prev =>
      prev.map(note =>
        note.id === noteId
          ? { ...note, ...updates, updatedAt: new Date() }
          : note
      )
    );
  };

  const deleteNote = (noteId: string) => {
    setNotes(prev => prev.filter(note => note.id !== noteId));
    if (activeNoteId === noteId) {
      setActiveNoteId(null);
    }
  };

  const createFolder = (name: string, parentId = 'root') => {
    const newFolder: Folder = {
      id: Date.now().toString(),
      name,
      parentId,
      expanded: true,
    };
    setFolders(prev => [...prev, newFolder]);
  };

  const toggleFolder = (folderId: string) => {
    setFolders(prev =>
      prev.map(folder =>
        folder.id === folderId
          ? { ...folder, expanded: !folder.expanded }
          : folder
      )
    );
  };

  const setActiveNote = (noteId: string | null) => {
    setActiveNoteId(noteId);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const getAllTags = () => {
    const allTags = notes.flatMap(note => note.tags);
    return Array.from(new Set(allTags)).sort();
  };

  const getFilteredNotes = () => {
    return notes.filter(note => {
      const matchesSearch = searchQuery === '' ||
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTags = selectedTags.length === 0 ||
        selectedTags.every(tag => note.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        folders,
        activeNoteId,
        searchQuery,
        selectedTags,
        createNote,
        updateNote,
        deleteNote,
        createFolder,
        toggleFolder,
        setActiveNote,
        setSearchQuery,
        toggleTag,
        getAllTags,
        getFilteredNotes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
