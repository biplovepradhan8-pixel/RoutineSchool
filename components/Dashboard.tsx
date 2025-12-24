
import React, { useState } from 'react';
import { User, SchoolRoutine, Note, Role, FullSchoolRoutine } from '../types';
import RoutineTable from './RoutineTable';
import ImportantNotes from './ImportantNotes';
import TeacherNotepad from './TeacherNotepad';
import { LogoutIcon, DashboardIcon, NoteIcon } from './icons';

interface DashboardProps {
  user: User;
  fullRoutine: FullSchoolRoutine;
  importantNotes: Note[];
  teacherNotepadContent: string;
  onLogout: () => void;
  onAddNote: (content: string) => void;
  onEditNote: (noteId: string, newContent: string) => void;
  onDeleteNote: (noteId: string) => void;
  onSaveNotepad: (content: string) => void;
  onUpdateRoutine: (className: string, updatedRoutine: SchoolRoutine) => void;
}

type Tab = 'dashboard' | 'notepad';

const Dashboard: React.FC<DashboardProps> = ({
  user,
  fullRoutine,
  importantNotes,
  teacherNotepadContent,
  onLogout,
  onAddNote,
  onEditNote,
  onDeleteNote,
  onSaveNotepad,
  onUpdateRoutine,
}) => {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const classList = Object.keys(fullRoutine);
  const [selectedClass, setSelectedClass] = useState(user.role === Role.Student ? user.username : classList[0] || '');

  const handleUpdateSelectedRoutine = (updatedRoutine: SchoolRoutine) => {
      onUpdateRoutine(selectedClass, updatedRoutine);
  };
  
  const header = (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">BAL KRISHNA KASAJU GOVERNMENT SENIOR SECONDARY SCHOOL NEWS AND ROUTINE</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <span className="text-gray-800 dark:text-gray-200 font-medium capitalize">Welcome, {user.role}</span>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user.name}</p>
            </div>
            <button
              onClick={onLogout}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-label="Logout"
            >
              <LogoutIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );

  const teacherTabs = (
    <div className="mb-8 border-b border-gray-200 dark:border-gray-700">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
            activeTab === 'dashboard'
              ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-500'
          }`}
        >
            <DashboardIcon className="w-5 h-5"/>
            Dashboard
        </button>
        <button
          onClick={() => setActiveTab('notepad')}
          className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
            activeTab === 'notepad'
              ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-500'
          }`}
        >
            <NoteIcon className="w-5 h-5"/>
            My Notepad
        </button>
      </nav>
    </div>
  );

  const mainContent = (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {(user.role === Role.Teacher || user.role === Role.Admin) && teacherTabs}
      {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <div className="mb-4">
                    <label htmlFor="class-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Select Class
                    </label>
                    <select
                        id="class-select"
                        name="class-select"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        disabled={user.role === Role.Student}
                    >
                        {classList.map(c => <option key={c} value={c}>Class {c}</option>)}
                    </select>
                </div>
                <RoutineTable routine={fullRoutine[selectedClass]} user={user} onUpdateRoutine={handleUpdateSelectedRoutine} />
            </div>
            <div>
                <ImportantNotes
                  notes={importantNotes}
                  user={user}
                  onAddNote={onAddNote}
                  onEditNote={onEditNote}
                  onDeleteNote={onDeleteNote}
                />
            </div>
        </div>
      )}
      {activeTab === 'notepad' && (user.role === Role.Teacher || user.role === Role.Admin) && (
        <div style={{height: 'calc(100vh - 250px)'}}>
            <TeacherNotepad
              initialContent={teacherNotepadContent}
              onSave={onSaveNotepad}
              user={user}
            />
        </div>
      )}
    </div>
  );

  return (
    <div>
      {header}
      <main>
        {mainContent}
      </main>
    </div>
  );
};

export default Dashboard;
