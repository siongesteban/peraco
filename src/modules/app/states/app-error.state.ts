import { atom, useAtom } from 'jotai';
import { SetStateAction } from 'jotai/core/types';

type AppErrorAtom = {
  message: string;
  error: Record<string, unknown>;
} | null;

type UseAppErrorState = () => AppErrorAtom;

type UseAppErrorAction = () => {
  setAppError: (update: SetStateAction<AppErrorAtom>) => void | Promise<void>;
};

export const appErrorAtom = atom<AppErrorAtom>(null);

appErrorAtom.debugLabel = '@peraco/APP_ERROR';

export const useAppErrorState: UseAppErrorState = () =>
  useAtom(appErrorAtom)[0];

export const useAppErrorAction: UseAppErrorAction = () => {
  const [, setAppError] = useAtom(appErrorAtom);

  return { setAppError };
};
