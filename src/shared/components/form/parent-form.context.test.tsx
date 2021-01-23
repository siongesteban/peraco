import * as React from 'react';
import { render, screen, fireEvent, waitFor } from 'test-utils';

import { useForm } from 'shared/hooks';

import { ParentFormProvider, useParentForm } from './parent-form.context';

type WrapperProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValues: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => void;
};

const Wrapper: React.FC<WrapperProps> = ({
  children,
  defaultValues,
  onSubmit,
}) => {
  const form = useForm({ defaultValues });

  return (
    <ParentFormProvider form={form} onSubmit={onSubmit}>
      {children}
    </ParentFormProvider>
  );
};

const SomeChild: React.FC = () => {
  const { parentForm } = useParentForm();

  return (
    <>
      <input name="firstName" type="text" ref={parentForm.register} />
      <input type="submit" />
    </>
  );
};

test('Renders form correctly', async () => {
  const handleSubmit = jest.fn();

  render(
    <Wrapper defaultValues={{ firstName: 'Kuya Wil' }} onSubmit={handleSubmit}>
      <SomeChild />
    </Wrapper>,
  );

  expect(screen.getByRole('textbox')).toHaveValue('Kuya Wil');

  fireEvent.click(screen.getByRole('button'));

  await waitFor(() => {
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
