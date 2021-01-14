import { atom } from 'jotai';

export type LoaderMessageAtom = string | null;

export const loaderMessageAtom = atom<LoaderMessageAtom>(null);
