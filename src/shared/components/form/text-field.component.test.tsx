import * as React from 'react';
import { render, screen, fireEvent, waitFor, userEvent } from 'test-utils';

import { useForm } from 'shared/hooks';

import { ParentFormProvider } from './parent-form.context';
import { TextField } from './text-field.component';

type WrapperProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValues?: Record<string, any>;
};

const Wrapper: React.FC<WrapperProps> = ({ children, defaultValues }) => {
  const form = useForm({ defaultValues });

  return (
    <ParentFormProvider form={form} onSubmit={() => null}>
      {children}
    </ParentFormProvider>
  );
};

test('Opens text field dialog when display field is clicked', async () => {
  render(
    <Wrapper>
      <TextField
        name="firstName"
        label="First Name"
        placeholder="Enter your first name"
      />
    </Wrapper>,
  );

  expect(screen.getByText(/First Name/)).toBeInTheDocument();
  expect(screen.getByText(/enter your first name/i)).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button'));

  await waitFor(() => {
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getAllByText(/First Name/)[1]).toBeInTheDocument();
    expect(
      screen.getAllByText(/enter your first name/i)[1],
    ).toBeInTheDocument();
    expect(screen.getByText(/cancel/i)).toBeInTheDocument();
    expect(screen.getByText(/ok/i)).toBeInTheDocument();
  });
});

test('Displays the default value instead of the placeholder', async () => {
  render(
    <Wrapper defaultValues={{ firstName: 'John' }}>
      <TextField
        name="firstName"
        label="First Name"
        placeholder="Enter your first name"
      />
    </Wrapper>,
  );

  expect(screen.getByText(/First Name/)).toBeInTheDocument();
  expect(screen.queryByText(/enter your first name/i)).not.toBeInTheDocument();
  expect(screen.getByText(/john/i)).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button'));

  await waitFor(() => {
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue('John');
  });
});

test('Closes the dialog when cancel or ok button is clicked, or enter key is pressed', async () => {
  render(
    <Wrapper>
      <TextField
        name="firstName"
        label="First Name"
        placeholder="Enter your first name"
      />
    </Wrapper>,
  );

  fireEvent.click(screen.getByRole('button'));

  await waitFor(() => {
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText(/cancel/i));

  await waitFor(() => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  fireEvent.click(screen.getByRole('button'));

  await waitFor(() => {
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText(/ok/i));

  await waitFor(() => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  fireEvent.click(screen.getByRole('button'));

  await waitFor(() => {
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  fireEvent.keyPress(screen.getByRole('textbox'), {
    key: 'Enter',
    code: 13,
    charCode: 13,
  });
});

test('Display field displays the typed text from the field dialog when ok button is clicked or enter key is pressed', async () => {
  render(
    <Wrapper>
      <TextField
        name="firstName"
        label="First Name"
        placeholder="Enter your first name"
      />
    </Wrapper>,
  );

  fireEvent.click(screen.getByRole('button'));
  userEvent.type(screen.getByRole('textbox'), 'Cardo');

  await waitFor(() => {
    expect(screen.getByRole('textbox')).toHaveValue('Cardo');
  });

  fireEvent.click(screen.getByText(/ok/i));

  await waitFor(() => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  expect(screen.getByText(/cardo/i)).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button'));
  userEvent.type(screen.getByRole('textbox'), 'Dalisay');

  await waitFor(() => {
    expect(screen.getByRole('textbox')).toHaveValue('Dalisay');
  });

  fireEvent.keyPress(screen.getByRole('textbox'), {
    key: 'Enter',
    code: 13,
    charCode: 13,
  });

  await waitFor(() => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  expect(screen.getByText(/dalisay/i)).toBeInTheDocument();
});

test('Discards the newly typed text when cancel button is clicked', async () => {
  render(
    <Wrapper defaultValues={{ firstName: 'Will' }}>
      <TextField
        name="firstName"
        label="First Name"
        placeholder="Enter your first name"
      />
    </Wrapper>,
  );

  fireEvent.click(screen.getByRole('button'));

  await waitFor(() => {
    expect(screen.queryByRole('dialog')).toBeInTheDocument();
  });

  userEvent.type(screen.getByRole('textbox'), 'Smith');

  await waitFor(() => {
    expect(screen.getByRole('textbox')).toHaveValue('Smith');
  });

  fireEvent.click(screen.getByText(/cancel/i));

  await waitFor(() => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  expect(screen.queryByText(/smith/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/will/i)).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button'));

  await waitFor(() => {
    expect(screen.queryByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue('Will');
  });
});
