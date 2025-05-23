
import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Plus, FolderPlus, Search, Tag } from 'lucide-react';
import { useSidebar } from '../context/SidebarContext';
import { useNotes } from '../context/NotesContext';
import { Button } from './ui/button';
import { Input } from './ui/input';

export const Sidebar: React.FC = () => {
  const { isCollapsed, toggleSidebar } = useSidebar();
  const {
    folders,
    notes,
    activeNoteId,
    selectedTags,
    createNote,
    createFolder,
    toggleFolder,
    setActiveNote,
    toggleTag,
    getAllTags,
    getFilteredNotes,
  } = useNotes();
  
  const [newFolderName, setNewFolderName] = useState('');
  const [showNewFolderInput, setShowNewFolderInput] = useState(false);

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      createFolder(newFolderName.trim());
      setNewFolderName('');
      setShowNewFolderInput(false);
    }
  };

  const renderFolderTree = (parentId: string | null, level = 0) => {
    return folders
      .filter(folder => folder.parentId === parentId)
      .map(folder => {
        const folderNotes = getFilteredNotes().filter(note => note.folderId === folder.id);
        const hasChildren = folders.some(f => f.parentId === folder.id);
        
        return (
          <div key={folder.id} className={`ml-${level * 4}`}>
            <div
              className="flex items-center gap-2 p-2 hover:bg-slate-700 rounded cursor-pointer group"
              onClick={() => toggleFolder(folder.id)}
            >
              {hasChildren ? (
                folder.expanded ? (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                )
              ) : (
                <div className="w-4 h-4" />
              )}
              <span className="text-slate-200 text-sm font-medium">{folder.name}</span>
              <Button
                size="sm"
                variant="ghost"
                className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0 text-slate-400 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  createNote(folder.id);
                }}
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
            
            {folder.expanded && (
              <>
                {folderNotes.map(note => (
                  <div
                    key={note.id}
                    className={`ml-6 p-2 rounded cursor-pointer text-sm text-slate-300 hover:bg-slate-700 ${
                      activeNoteId === note.id ? 'bg-blue-600 text-white' : ''
                    }`}
                    onClick={() => setActiveNote(note.id)}
                  >
                    {note.title}
                  </div>
                ))}
                {hasChildren && renderFolderTree(folder.id, level + 1)}
              </>
            )}
          </div>
        );
      });
  };

  const allTags = getAllTags();

  return (
    <div className={`bg-slate-800 border-r border-slate-700 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-80'
    }`}>
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h1 className="text-white text-lg font-semibold">Notes</h1>
          )}
          <Button
            size="sm"
            variant="ghost"
            onClick={toggleSidebar}
            className="text-slate-400 hover:text-white h-8 w-8 p-0"
          >
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {!isCollapsed && (
        <>
          <div className="p-4 space-y-4">
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => createNote('root')}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Note
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowNewFolderInput(true)}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <FolderPlus className="w-4 h-4" />
              </Button>
            </div>

            {showNewFolderInput && (
              <div className="space-y-2">
                <Input
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="Folder name"
                  className="bg-slate-700 border-slate-600 text-white"
                  onKeyPress={(e) => e.key === 'Enter' && handleCreateFolder()}
                  autoFocus
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleCreateFolder} className="bg-green-600 hover:bg-green-700">
                    Create
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setShowNewFolderInput(false);
                      setNewFolderName('');
                    }}
                    className="border-slate-600 text-slate-300"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="px-4 pb-4">
            <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-2">
              Folders
            </h3>
            <div className="space-y-1">
              {renderFolderTree(null)}
            </div>
          </div>

          {allTags.length > 0 && (
            <div className="px-4 pb-4">
              <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-2">
                Tags
              </h3>
              <div className="flex flex-wrap gap-1">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-2 py-1 rounded text-xs flex items-center gap-1 transition-colors ${
                      selectedTags.includes(tag)
                        ? 'bg-green-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
