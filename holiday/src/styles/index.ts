
// Export utility functions related to styling
export const applyTheme = (theme: 'light' | 'dark') => {
  if (theme === 'dark') {
    document.body.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
  } else {
    document.body.classList.add('light-theme');
    document.body.classList.remove('dark-theme');
  }
};

// Export type for theme
export type Theme = 'light' | 'dark';
