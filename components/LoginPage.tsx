
import React, { useState } from 'react';
import { Role } from '../types';

interface LoginPageProps {
  onLogin: (username: string, password: string, role: Role) => boolean;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>(Role.Student);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!username.trim() || !password.trim()) {
      setError('Please enter all required fields.');
      return;
    }
    const success = onLogin(username, password, role);
    if (!success) {
      setError('Invalid credentials or role. Please try again.');
    }
  };

  const getUsernamePlaceholder = () => {
    switch (role) {
      case Role.Student:
        return "Class Number (e.g., 10)";
      case Role.Teacher:
        return "Username";
      case Role.Admin:
        return "Email address (e.g., biplovepradhan8@gmail.com)";
      default:
        return "Username";
    }
  };

  const getPasswordPlaceholder = () => {
    switch (role) {
      case Role.Student:
        return "Roll Number";
      case Role.Teacher:
        return "Password";
      case Role.Admin:
        return "Password";
      default:
        return "Password";
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">BAL KRISHNA KASAJU GOVERNMENT SENIOR SECONDARY SCHOOL NEWS AND ROUTINE</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Sign in to access your dashboard</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="username"
                name="username"
                type={role === Role.Admin ? 'email' : 'text'}
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder={getUsernamePlaceholder()}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder={getPasswordPlaceholder()}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-y-2 sm:gap-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value={Role.Student}
                checked={role === Role.Student}
                onChange={() => setRole(Role.Student)}
                className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
              />
              <span className="text-gray-700 dark:text-gray-300">I am a Student</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value={Role.Teacher}
                checked={role === Role.Teacher}
                onChange={() => setRole(Role.Teacher)}
                className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
              />
              <span className="text-gray-700 dark:text-gray-300">I am a Teacher</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value={Role.Admin}
                checked={role === Role.Admin}
                onChange={() => setRole(Role.Admin)}
                className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
              />
              <span className="text-gray-700 dark:text-gray-300">I am an Admin</span>
            </label>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;