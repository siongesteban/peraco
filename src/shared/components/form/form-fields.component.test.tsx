import React from 'react';
import { render, screen } from 'test-utils';

import { useForm } from 'shared/hooks';

import { ParentFormProvider } from './parent-form.context';
import { FormFields } from './form-fields.component';

const Wrapper: React.FC = ({ children }) => {
  const form = useForm({
    defaultValues: {
      firstName: 'John',
      lastName: 'Doe',
      currentJob: 'Dev',
    },
  });

  return (
    <ParentFormProvider form={form} onSubmit={() => null}>
      {children}
    </ParentFormProvider>
  );
};

test('Displays all the fields correctly', () => {
  render(
    <Wrapper>
      <FormFields
        groups={[
          {
            title: 'Basic Details',
            fields: [
              {
                name: 'firstName',
                label: 'First Name',
                placeholder: 'Enter first name',
              },
              {
                name: 'lastName',
                label: 'Last Name',
                placeholder: 'Enter last name',
              },
            ],
          },
          {
            title: 'Work',
            fields: [
              {
                name: 'currentJob',
                label: 'Current Job',
                placeholder: 'Enter current job',
              },
            ],
          },
        ]}
      />
    </Wrapper>,
  );

  expect(screen.getByText(/basic details/i)).toBeInTheDocument();
  expect(screen.getByText(/first name/i)).toBeInTheDocument();
  expect(screen.getByText(/john/i)).toBeInTheDocument();
  expect(screen.getByText(/last name/i)).toBeInTheDocument();
  expect(screen.getByText(/doe/i)).toBeInTheDocument();

  expect(screen.getByText(/work/i)).toBeInTheDocument();
  expect(screen.getByText(/current job/i)).toBeInTheDocument();
  expect(screen.getByText(/dev/i)).toBeInTheDocument();
});
