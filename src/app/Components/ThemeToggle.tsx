'use client';

import { useTheme } from '../context/ThemeContext';
import { SetStateAction, useEffect, useState } from 'react';

export default function ThemeToggle({isFenerMode} : {isFenerMode: (value: string | ((prev: string) => string)) => void}) {
  const { isDarkMode, toggleTheme } = useTheme();

  const handleClick = () => {
    toggleTheme();
    isFenerMode(isDarkMode ? 'Fenerbahce' : 'Besiktas');
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <button
      onClick={handleClick}
      className="theme-toggle"
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        background: isDarkMode ? '#FFFFFF' : '#000000',
        color: isDarkMode ? '#000000' : '#FFFFFF',
        border: `2px solid ${isDarkMode ? '#000000' : '#FFFFFF'}`,
        padding: '8px 16px',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
    >
      {isDarkMode ? '☀️ Besiktas' : '🌙 Fenerbahce'}
    </button>
  );
} 