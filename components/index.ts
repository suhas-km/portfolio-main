/**
 * Components Export Index
 * 
 * This file serves as the central export point for all components in the application.
 * It provides a clean, organized way to import components throughout the codebase.
 */

// Export section components
export * from './sections';

// Export layout components
export * from './layout';

// Export UI components
export * from './ui';

// Named exports for our refactored components
export { default as Experience } from './sections/Experience';
export { default as Projects } from './sections/Projects';
export { default as Research } from './sections/Research';
export { default as Skills } from './sections/Skills';

// These will be exported directly until migrated to the new structure
export { default as About } from './about';
export { default as Contact } from './contact';
export { default as Footer } from './footer';
export { default as Header } from './header';
export { default as Intro } from './intro';
// export { default as Skills } from './skills'; - Using new refactored component now
export { default as SectionDivider } from './section-divider';
export { default as ThemeSwitch } from './theme-switch';
export { default as SubmitBtn } from './submit-btn';
