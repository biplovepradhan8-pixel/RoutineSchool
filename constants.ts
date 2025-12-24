
import { User, Role, SchoolRoutine, Note, TeacherNote, FullSchoolRoutine } from './types';

export const MOCK_USERS: User[] = [
  { id: 't1', username: 'teacher', password: 'school', name: 'Teacher', role: Role.Teacher },
  { id: 's1', username: '10', password: '1', name: 'Alex Johnson', role: Role.Student },
  { id: 's2', username: '9', password: '2', name: 'Mia Williams', role: Role.Student },
  { id: 'a1', username: 'biplovepradhan8@gmail.com', password: 'bipLove@1', name: 'Principal', role: Role.Admin },
];

const generateBaseRoutine = (): SchoolRoutine => ({
    Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: []
});

const CLASSES = ['LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

const MOCK_FULL_ROUTINE: FullSchoolRoutine = {};

const basePeriods = [
  '1 (9:00-9:45)',
  '2 (9:45-10:30)',
  '3 (10:30-11:15)',
  'Break (11:15-11:30)',
  '4 (11:30-12:15)',
  '5 (12:15-1:00)',
  'Lunch (1:00-1:45)',
  '6 (1:45-2:30)',
  '7 (2:30-3:15)',
  '8 (3:15-4:00)',
];

// Simplified routine for younger classes
const juniorSubjects = ['English', 'Nepali', 'Math', 'Drawing', 'Games', 'Music', 'Rhymes', 'Story Time'];
// Standard routine for middle classes
const middleSubjects = ['English', 'Nepali', 'Math', 'Science', 'Social Studies', 'Computer', 'Art', 'P.E.'];
// Advanced routine for senior classes
const seniorSubjects = ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'English', 'Computer Science', 'Economics', 'Accountancy'];

CLASSES.forEach(className => {
  const routine = generateBaseRoutine();
  const classNum = parseInt(className, 10);
  let subjects = middleSubjects;
  if (className === 'LKG' || className === 'UKG') subjects = juniorSubjects;
  if (classNum >= 9) subjects = seniorSubjects;

  Object.keys(routine).forEach(day => {
    if (day === 'Saturday') {
        routine[day] = [
            { period: '1 (9:00-10:30)', subject: 'Extra Curricular Activities', notes: 'Check notice board for details' },
            { period: '2 (10:30-12:00)', subject: 'Sports Training', teacher: 'Coach Lee' },
        ];
        return;
    }

    let periodIndex = 0;
    basePeriods.forEach(p => {
        if(p.startsWith('Break') || p.startsWith('Lunch')){
            routine[day].push({ period: p, subject: p.split(' ')[0] });
        } else {
            const subject = subjects[(periodIndex + classNum + (day.length % 5)) % subjects.length];
            routine[day].push({ period: p, subject, teacher: 'TBD', notes: '' });
            periodIndex++;
        }
    })
  });
  MOCK_FULL_ROUTINE[className] = routine;
});

// Overwrite Class 10 with more detailed data
MOCK_FULL_ROUTINE['10'] = {
  Monday: [
    { period: '1 (9:00-9:45)', subject: 'Mathematics', teacher: 'Teacher', notes: 'Chapter 5: Algebra' },
    { period: '2 (9:45-10:30)', subject: 'Physics', teacher: 'Teacher', notes: 'Lab session in Physics Lab' },
    { period: '3 (10:30-11:15)', subject: 'English', teacher: 'Ms. Davis' },
    { period: 'Break (11:15-11:30)', subject: 'Break' },
    { period: '4 (11:30-12:15)', subject: 'History', teacher: 'Mr. Smith' },
    { period: '5 (12:15-1:00)', subject: 'Art', teacher: 'Mrs. Chen' },
    { period: 'Lunch (1:00-1:45)', subject: 'Lunch' },
    { period: '6 (1:45-2:30)', subject: 'Library', teacher: 'Ms. Vera' },
    { period: '7 (2:30-3:15)', subject: 'Study Hall', teacher: 'Mr. Smith' },
    { period: '8 (3:15-4:00)', subject: 'Club Activities', teacher: 'Various' },
  ],
  Tuesday: [
    { period: '1 (9:00-9:45)', subject: 'Chemistry', teacher: 'Teacher' },
    { period: '2 (9:45-10:30)', subject: 'Mathematics', teacher: 'Teacher' },
    { period: '3 (10:30-11:15)', subject: 'Geography', teacher: 'Mr. Smith' },
    { period: 'Break (11:15-11:30)', subject: 'Break' },
    { period: '4 (11:30-12:15)', subject: 'English', teacher: 'Ms. Davis' },
    { period: '5 (12:15-1:00)', subject: 'Physical Education', teacher: 'Coach Lee' },
    { period: 'Lunch (1:00-1:45)', subject: 'Lunch' },
    { period: '6 (1:45-2:30)', subject: 'Computer Science', teacher: 'Teacher' },
    { period: '7 (2:30-3:15)', subject: 'Library', teacher: 'Ms. Vera' },
    { period: '8 (3:15-4:00)', subject: 'Music', teacher: 'Mrs. Chen' },
  ],
  Wednesday: [
    { period: '1 (9:00-9:45)', subject: 'History', teacher: 'Mr. Smith' },
    { period: '2 (9:45-10:30)', subject: 'Biology', teacher: 'Teacher', notes: 'Bring lab coats' },
    { period: '3 (10:30-11:15)', subject: 'Physics', teacher: 'Teacher' },
    { period: 'Break (11:15-11:30)', subject: 'Break' },
    { period: '4 (11:30-12:15)', subject: 'Music', teacher: 'Mrs. Chen' },
    { period: '5 (12:15-1:00)', subject: 'Mathematics', teacher: 'Teacher' },
    { period: 'Lunch (1:00-1:45)', subject: 'Lunch' },
    { period: '6 (1:45-2:30)', subject: 'English', teacher: 'Ms. Davis', notes: 'Poetry submission due' },
    { period: '7 (2:30-3:15)', subject: 'Study Hall', teacher: 'Mr. Smith' },
    { period: '8 (3:15-4:00)', subject: 'Club Activities', teacher: 'Various' },
  ],
  Thursday: [
    { period: '1 (9:00-9:45)', subject: 'English', teacher: 'Ms. Davis' },
    { period: '2 (9:45-10:30)', subject: 'Physical Education', teacher: 'Coach Lee' },
    { period: '3 (10:30-11:15)', subject: 'Mathematics', teacher: 'Teacher' },
    { period: 'Break (11:15-11:30)', subject: 'Break' },
    { period: '4 (11:30-12:15)', subject: 'Chemistry', teacher: 'Teacher' },
    { period: '5 (12:15-1:00)', subject: 'Computer Science', teacher: 'Teacher' },
    { period: 'Lunch (1:00-1:45)', subject: 'Lunch' },
    { period: '6 (1:45-2:30)', subject: 'Geography', teacher: 'Mr. Smith' },
    { period: '7 (2:30-3:15)', subject: 'Art', teacher: 'Mrs. Chen' },
    { period: '8 (3:15-4:00)', subject: 'Library', teacher: 'Ms. Vera' },
  ],
  Friday: [
    { period: '1 (9:00-9:45)', subject: 'Biology', teacher: 'Teacher' },
    { period: '2 (9:45-10:30)', subject: 'History', teacher: 'Mr. Smith' },
    { period: '3 (10:30-11:15)', subject: 'Art', teacher: 'Mrs. Chen' },
    { period: 'Break (11:15-11:30)', subject: 'Break' },
    { period: '4 (11:30-12:15)', subject: 'English', teacher: 'Ms. Davis' },
    { period: '5 (12:15-1:00)', subject: 'Assembly', teacher: 'All Staff' },
    { period: 'Lunch (1:00-1:45)', subject: 'Lunch' },
    { period: '6 (1:45-2:30)', subject: 'Physics', teacher: 'Teacher' },
    { period: '7 (2:30-3:15)', subject: 'Mathematics', teacher: 'Teacher' },
    { period: '8 (3:15-4:00)', subject: 'Physical Education', teacher: 'Coach Lee' },
  ],
  Saturday: [
    { period: '1 (9:00-9:50)', subject: 'Yoga/Meditation', teacher: 'Ms. Devi' },
    { period: '2 (9:50-10:40)', subject: 'Music Workshop', teacher: 'Mrs. Chen' },
    { period: '3 (11:00-11:50)', subject: 'Sports Practice', teacher: 'Coach Lee' },
    { period: '4 (11:50-12:40)', subject: 'Debate Club', teacher: 'Ms. Davis' },
  ],
};

export const FULL_SCHOOL_ROUTINE = MOCK_FULL_ROUTINE;

export const MOCK_IMPORTANT_NOTES: Note[] = [
  {
    id: 'note-1',
    content: 'Parent-teacher meetings are scheduled for next Friday. Please sign up for a slot in the main office.',
    author: 'Principal',
    timestamp: '203-10-26T10:00:00Z',
  },
  {
    id: 'note-2',
    content: 'The science fair has been postponed to November 15th. All project submissions are now due by November 10th.',
    author: 'Mr. Ben Carter',
    timestamp: '2023-10-25T14:30:00Z',
  },
];

export const MOCK_TEACHER_NOTES: TeacherNote = {
  't1': 'Lesson plan for next week:\n- Monday: Introduction to Algebra II\n- Wednesday: Lab session on cellular mitosis\n- Friday: Review for mid-term exams.\n\nRemember to grade the pop quiz from last week.',
  'a1': 'School-wide announcements draft:\n- Finalize budget for Q4.\n- Schedule fire drill for next month.\n- Review new curriculum proposals.\n\n- Teacher appreciation day planning.',
};
