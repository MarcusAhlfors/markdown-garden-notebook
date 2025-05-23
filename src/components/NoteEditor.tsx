
import React, { useState, useEffect } from 'react';
import { Eye, Edit, Tag, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useNotes } from '../context/NotesContext';
import { MarkdownPreview } from './MarkdownPreview';

export const NoteEditor: React.FC = () => {
  const { notes, activeNoteId, updateNote, deleteNote } = useNotes();
  const [isPreview, setIsPreview] = useState(false);
  const [newTag, setNewTag] = useState('');

  const activeNote = notes.find(note => note.id === activeNoteId);

  if (!activeNote) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <div className="text-center">
          <Edit className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium mb-2">No note selected</h3>
          <p>Select a note from the sidebar or create a new one to get started.</p>
        </div>
      </div>
    );
  }

  const handleTitleChange = (title: string) => {
    updateNote(activeNote.id, { title });
  };

  const handleContentChange = (content: string) => {
    updateNote(activeNote.id, { content });
  };

  const handleAddTag = () => {
    if (newTag.trim() && !activeNote.tags.includes(newTag.trim())) {
      updateNote(activeNote.id, {
        tags: [...activeNote.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    updateNote(activeNote.id, {
      tags: activeNote.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this note?')) {
      deleteNote(activeNote.id);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <Input
            value={activeNote.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="text-lg font-semibold border-none shadow-none p-0 focus:ring-0 bg-transparent"
            placeholder="Note title..."
          />
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsPreview(!isPreview)}
              className={`${isPreview ? 'bg-blue-50 text-blue-600 border-blue-200' : ''}`}
            >
              {isPreview ? <Edit className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {isPreview ? 'Edit' : 'Preview'}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleDelete}
              className="text-red-600 hover:bg-red-50 border-red-200"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {activeNote.tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs cursor-pointer hover:bg-green-200 transition-colors"
                onClick={() => handleRemoveTag(tag)}
              >
                #{tag}
                <button className="hover:text-green-900">×</button>
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag..."
                className="pl-10"
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
              />
            </div>
            <Button size="sm" onClick={handleAddTag} disabled={!newTag.trim()}>
              Add Tag
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4">
        {isPreview ? (
          <MarkdownPreview content={activeNote.content} />
        ) : (
          <Textarea
            value={activeNote.content}
            onChange={(e) => handleContentChange(e.target.value)}
            placeholder="Start writing your note in markdown..."
            className="w-full h-full resize-none border-none shadow-none focus:ring-0 font-mono text-sm"
          />
        )}
      </div>

      <div className="border-t border-gray-100 px-4 py-2 text-xs text-gray-500">
        Last updated: {activeNote.updatedAt.toLocaleString()}
      </div>
    </div>
  );
};
