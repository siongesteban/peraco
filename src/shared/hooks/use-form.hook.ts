import {
  useForm as useReactHookForm,
  UseFormMethods,
  UseFormOptions,
  FieldValues,
} from 'react-hook-form';

export const useForm = <
  TFieldValues extends FieldValues = FieldValues,
  TContext extends Record<string, unknown> = Record<string, unknown>
>(
  options?: UseFormOptions<TFieldValues, TContext>,
): UseFormMethods<TFieldValues> =>
  useReactHookForm({
    ...options,
    mode: options?.mode ?? 'onChange',
    shouldUnregister: options?.shouldUnregister ?? false,
  });
