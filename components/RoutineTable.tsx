
import React, { useState, useEffect } from 'react';
import { SchoolRoutine, SchoolDay, User, Role } from '../types';

interface RoutineTableProps {
  routine: SchoolRoutine;
  user: User;
  onUpdateRoutine: (newRoutine: SchoolRoutine) => void;
}

const RoutineTable: React.FC<RoutineTableProps> = ({ routine, user, onUpdateRoutine }) => {
  const [editableRoutine, setEditableRoutine] = useState<SchoolRoutine>(routine);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    // Reset local state if the prop changes from above
    setEditableRoutine(JSON.parse(JSON.stringify(routine)));
    setHasChanges(false);
  }, [routine]);

  const isAdmin = user.role === Role.Admin;
  const days: SchoolDay[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const maxPeriods = Math.max(0, ...days.map(day => (routine[day] || []).length));

  const handleInputChange = (day: SchoolDay, periodIndex: number, field: 'subject' | 'teacher' | 'notes', value: string) => {
    const newRoutine = { ...editableRoutine };
    if (!newRoutine[day]) newRoutine[day] = [];
    while (newRoutine[day].length <= periodIndex) {
        newRoutine[day].push({ period: '', subject: '', teacher: '', notes: '' });
    }
    newRoutine[day][periodIndex] = { ...newRoutine[day][periodIndex], [field]: value };
    setEditableRoutine(newRoutine);
    setHasChanges(true);
  };

  const handlePeriodChange = (periodIndex: number, value: string) => {
    const newRoutine = { ...editableRoutine };
    days.forEach(day => {
      if (newRoutine[day] && newRoutine[day][periodIndex]) {
        newRoutine[day][periodIndex].period = value;
      }
    });
    setEditableRoutine(newRoutine);
    setHasChanges(true);
  };

  const handleSaveChanges = () => {
    onUpdateRoutine(editableRoutine);
    setHasChanges(false);
    // Optionally show a confirmation message
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Weekly Class Routine</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Period</th>
              {days.map(day => (
                <th key={day} scope="col" className="px-6 py-3">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: maxPeriods }).map((_, periodIndex) => {
              const firstEntry = editableRoutine[days[0]]?.[periodIndex];
              if (!firstEntry) return null;

              const isBreakOrLunch = firstEntry.subject === 'Break' || firstEntry.subject === 'Lunch';
              
              const rowClass = isBreakOrLunch 
                ? "bg-gray-100 dark:bg-gray-700/50 font-semibold"
                : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors";

              return (
              <tr key={periodIndex} className={`${rowClass} border-b dark:border-gray-700`}>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap align-top">
                   {isAdmin ? (
                    <input
                      type="text"
                      value={editableRoutine['Monday']?.[periodIndex]?.period || ''}
                      onChange={(e) => handlePeriodChange(periodIndex, e.target.value)}
                      className="w-full bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:outline-none p-1 font-semibold dark:text-white"
                    />
                  ) : (
                    editableRoutine['Monday']?.[periodIndex]?.period || ''
                  )}
                </td>
                {days.map(day => {
                    const entry = editableRoutine[day]?.[periodIndex];
                    if (!entry) return <td key={day} className="px-6 py-4">-</td>;

                    if (isBreakOrLunch) {
                        return <td key={day} className="px-6 py-4 text-center">{entry.subject}</td>;
                    }

                    return (
                        <td key={day} className="px-6 py-4 align-top">
                          {isAdmin ? (
                            <div className="flex flex-col gap-1">
                              <input
                                type="text"
                                value={entry.subject}
                                onChange={(e) => handleInputChange(day, periodIndex, 'subject', e.target.value)}
                                className="w-full bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:outline-none p-1 font-semibold dark:text-white"
                                placeholder="Subject"
                              />
                              <input
                                type="text"
                                value={entry.teacher || ''}
                                onChange={(e) => handleInputChange(day, periodIndex, 'teacher', e.target.value)}
                                className="w-full bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:outline-none p-1 text-xs text-gray-500 dark:text-gray-400"
                                placeholder="Teacher"
                              />
                              <input
                                type="text"
                                value={entry.notes || ''}
                                onChange={(e) => handleInputChange(day, periodIndex, 'notes', e.target.value)}
                                className="w-full bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:outline-none p-1 text-xs text-gray-500 dark:text-gray-400"
                                placeholder="Notes"
                              />
                            </div>
                          ) : (
                            <div>
                              <p className="font-semibold">{entry.subject}</p>
                              {entry.teacher && <p className="text-sm text-gray-500 dark:text-gray-400">{entry.teacher}</p>}
                              {entry.notes && <p className="text-xs text-indigo-500 dark:text-indigo-400 mt-1 italic">{entry.notes}</p>}
                            </div>
                          )}
                        </td>
                      );
                })}
              </tr>
            )})}
          </tbody>
        </table>
      </div>
      {isAdmin && (
        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 flex justify-end">
          <button
            onClick={handleSaveChanges}
            disabled={!hasChanges}
            className="bg-indigo-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default RoutineTable;
