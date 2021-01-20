import { atom } from 'jotai';

export type ThemeAtom = 'light' | 'dark' | 'system';

export const themeAtom = atom<ThemeAtom>('dark');
