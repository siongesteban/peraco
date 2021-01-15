import { atom } from 'jotai';

export type SnackbarAppearance = Partial<
  Record<'overBottomNavigation' | 'overFloatingAction', boolean>
>;

export type SnackbarAtom = {
  open: boolean;
  appearance?: SnackbarAppearance | null;
  message: string;
  error?: string | null;
};

export const snackbarAtom = atom<SnackbarAtom>({
  open: false,
  message: '',
});

export const closeSnackbarAtom = atom<null, undefined>(null, (_, set) =>
  set(snackbarAtom, (prev) => ({ ...prev, open: false })),
);

export const setSnackbarMessageAtom = atom<null, Omit<SnackbarAtom, 'open'>>(
  null,
  (_, set, args) =>
    set(snackbarAtom, (prev) => ({
      ...prev,
      ...args,
      open: true,
      appearance: args.appearance ?? null,
    })),
);
