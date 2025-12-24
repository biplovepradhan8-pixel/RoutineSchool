
import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import { User, Note, TeacherNote, Role, FullSchoolRoutine, SchoolRoutine } from './types';
import { MOCK_USERS, MOCK_IMPORTANT_NOTES, MOCK_TEACHER_NOTES, FULL_SCHOOL_ROUTINE } from './constants';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [importantNotes, setImportantNotes] = useState<Note[]>(MOCK_IMPORTANT_NOTES);
  const [teacherNotepads, setTeacherNotepads] = useState<TeacherNote>(MOCK_TEACHER_NOTES);
  const [fullSchoolRoutine, setFullSchoolRoutine] = useState<FullSchoolRoutine>(FULL_SCHOOL_ROUTINE);

  const handleLogin = (username: string, password: string, role: Role): boolean => {
    const user = MOCK_USERS.find(u => 
        u.role === role && 
        u.username.toLowerCase() === username.toLowerCase() && 
        u.password === password
    );

    if (user) {
      setCurrentUser(user);
      return true;
    }

    // If no user is found, but the role is student, allow login with validation
    if (role === Role.Student) {
      const classNum = parseInt(username, 10);
      const rollNum = parseInt(password, 10);

      // Basic validation for class/roll numbers from previous request
      if (
        !isNaN(classNum) && classNum >= 1 && classNum <= 12 &&
        !isNaN(rollNum) && rollNum >= 1 && rollNum <= 100
      ) {
          const studentUser: User = {
            id: `student-${username}-${password}`,
            username,
            password,
            name: `Student (Class ${username}, Roll ${password})`,
            role: Role.Student,
          };
          setCurrentUser(studentUser);
          return true;
      }
    }
    
    return false;
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleAddNote = (content: string) => {
    if (currentUser && currentUser.role === Role.Admin) {
      const newNote: Note = {
        id: `note-${Date.now()}`,
        content,
        author: currentUser.name,
        timestamp: new Date().toISOString(),
      };
      setImportantNotes(prevNotes => [newNote, ...prevNotes]);
    }
  };

  const handleEditNote = (noteId: string, newContent: string) => {
    if (currentUser && currentUser.role === Role.Admin) {
      setImportantNotes(prevNotes =>
        prevNotes.map(note =>
          note.id === noteId ? { ...note, content: newContent, timestamp: new Date().toISOString() } : note
        )
      );
    }
  };

  const handleDeleteNote = (noteId: string) => {
    if (currentUser && currentUser.role === Role.Admin) {
      setImportantNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
    }
  };

  const handleSaveNotepad = (content: string) => {
    if (currentUser && (currentUser.role === Role.Admin || currentUser.role === Role.Teacher)) {
      setTeacherNotepads(prev => ({
        ...prev,
        [currentUser.id]: content,
      }));
    }
  };

  const handleUpdateRoutine = (className: string, updatedRoutine: SchoolRoutine) => {
    if (currentUser && currentUser.role === Role.Admin) {
        setFullSchoolRoutine(prev => ({
            ...prev,
            [className]: updatedRoutine,
        }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      {!currentUser ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <Dashboard
          user={currentUser}
          fullRoutine={fullSchoolRoutine}
          importantNotes={importantNotes}
          teacherNotepadContent={teacherNotepads[currentUser.id] || ''}
          onLogout={handleLogout}
          onAddNote={handleAddNote}
          onEditNote={handleEditNote}
          onDeleteNote={handleDeleteNote}
          onSaveNotepad={handleSaveNotepad}
          onUpdateRoutine={handleUpdateRoutine}
        />
      )}
    </div>
  );
};

export default App;
