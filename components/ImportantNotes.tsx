
import React, { useState } from 'react';
import { Note, User, Role } from '../types';

interface ImportantNotesProps {
  notes: Note[];
  user: User;
  onAddNote: (content: string) => void;
  onEditNote: (noteId: string, newContent: string) => void;
  onDeleteNote: (noteId: string) => void;
}

const ImportantNotes: React.FC<ImportantNotesProps> = ({ notes, user, onAddNote, onEditNote, onDeleteNote }) => {
  const [newNote, setNewNote] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.trim()) {
      onAddNote(newNote);
      setNewNote('');
    }
  };

  const handleStartEdit = (note: Note) => {
    setEditingNoteId(note.id);
    setEditingContent(note.content);
  };

  const handleCancelEdit = () => {
    setEditingNoteId(null);
    setEditingContent('');
  };

  const handleSaveEdit = () => {
    if (editingNoteId && editingContent.trim()) {
      onEditNote(editingNoteId, editingContent);
      handleCancelEdit();
    }
  };

  const handleDelete = (noteId: string) => {
    if (window.confirm('Are you sure you want to permanently delete this note? This action cannot be undone.')) {
      onDeleteNote(noteId);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 h-full flex flex-col">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Important Notes & Announcements</h2>
      {user.role === Role.Admin && (
        <form onSubmit={handleSubmit} className="mb-6">
          <textarea
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            rows={3}
            placeholder="Add a new announcement..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="mt-2 w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Post Note
          </button>
        </form>
      )}
      <div className="space-y-4 overflow-y-auto flex-grow">
        {notes.length > 0 ? (
          notes.map(note => (
            <div key={note.id} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border-l-4 border-indigo-500">
              {editingNoteId === note.id ? (
                <>
                  <textarea
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                    rows={4}
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button onClick={handleCancelEdit} className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white px-3 py-1 rounded-md">
                      Cancel
                    </button>
                    <button onClick={handleSaveEdit} className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded-md">
                      Save
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{note.content}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mt-2">
                    <span>- {note.author}, {formatDate(note.timestamp)}</span>
                    {user.role === Role.Admin && (
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleStartEdit(note)} className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(note.id)} className="font-medium text-red-600 dark:text-red-400 hover:underline">
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            <p>No important notes at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportantNotes;
