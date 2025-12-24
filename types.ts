
export enum Role {
  Teacher = 'teacher',
  Student = 'student',
  Admin = 'admin',
}

export interface User {
  id: string;
  username: string;
  password: string; // Not used for validation in this mock app
  name: string;
  role: Role;
}

export interface RoutineEntry {
  period: string;
  subject: string;
  teacher?: string; // Optional, might not apply to all periods
  notes?: string;
}

export type SchoolDay = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

export type SchoolRoutine = Record<SchoolDay, RoutineEntry[]>;

export type FullSchoolRoutine = Record<string, SchoolRoutine>;

export interface Note {
  id: string;
  content: string;
  author: string;
  timestamp: string;
}

export interface TeacherNote {
  [teacherId: string]: string;
}