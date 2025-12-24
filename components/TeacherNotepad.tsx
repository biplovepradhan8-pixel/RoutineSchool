
import React, { useState, useEffect } from 'react';
import { generateText } from '../services/geminiService';
import { SparklesIcon } from './icons';
import { User, Role } from '../types';

interface TeacherNotepadProps {
  initialContent: string;
  onSave: (content: string) => void;
  user: User;
}

const TeacherNotepad: React.FC<TeacherNotepadProps> = ({ initialContent, onSave, user }) => {
  const [content, setContent] = useState(initialContent);
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [isAiPanelVisible, setIsAiPanelVisible] = useState(false);

  const isReadOnly = user.role !== Role.Teacher && user.role !== Role.Admin;

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    const result = await generateText(prompt);
    setContent(prevContent => `${prevContent}\n\n--- AI Generated Content for "${prompt}" ---\n${result}\n--- End AI Content ---`);
    setIsGenerating(false);
    setPrompt('');
    setIsAiPanelVisible(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Personal Notepad</h2>
        </div>
        <div className="relative flex-grow flex flex-col">
            <textarea
                className="w-full h-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition flex-grow read-only:bg-gray-100 dark:read-only:bg-gray-700/50"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Type your notes here... You can create lesson plans, reminders, or drafts."
                readOnly={isReadOnly}
            />
        </div>
        <div className="mt-4 flex flex-col md:flex-row gap-4 items-center">
            <button
                onClick={() => onSave(content)}
                className="w-full md:w-auto bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={isReadOnly}
            >
                Save Notes
            </button>
            <button
                onClick={() => setIsAiPanelVisible(!isAiPanelVisible)}
                className="w-full md:w-auto flex items-center justify-center gap-2 bg-purple-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-purple-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={isReadOnly}
            >
                <SparklesIcon className="w-5 h-5" />
                <span>AI Assistant</span>
            </button>
        </div>
        {isAiPanelVisible && !isReadOnly && (
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-600">
                <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Generate content with AI</h4>
                <div className="flex flex-col md:flex-row gap-2">
                    <input
                        type="text"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g., 'Create 5 quiz questions about photosynthesis'"
                        className="flex-grow p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                    />
                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="bg-purple-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-purple-600 disabled:bg-purple-300 disabled:cursor-not-allowed transition flex items-center justify-center"
                    >
                        {isGenerating ? 'Generating...' : 'Generate'}
                    </button>
                </div>
            </div>
        )}
    </div>
  );
};

export default TeacherNotepad;