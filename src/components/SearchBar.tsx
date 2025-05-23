
import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useNotes } from '../context/NotesContext';

export const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery, selectedTags, toggleTag } = useNotes();

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search notes, tags, or content..."
          className="pl-10 pr-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
        />
        {searchQuery && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setSearchQuery('')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-200"
          >
            <X className="w-3 h-3" />
          </Button>
        )}
      </div>
      
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-gray-600">Filtered by:</span>
          {selectedTags.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs cursor-pointer hover:bg-green-200 transition-colors"
              onClick={() => toggleTag(tag)}
            >
              #{tag}
              <X className="w-3 h-3" />
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
