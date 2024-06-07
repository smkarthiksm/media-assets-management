import '@testing-library/jest-dom';
import { renderWithProviders } from '../test-utility';
import LoginComponent from '../../components/login/login';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import * as Api from '../../api';

describe('LoginComponent', () => {
  test('should render', () => {
    const { container } = renderWithProviders(<LoginComponent />);
    expect(container).toMatchSnapshot();
  });

  test('should update text fields on input change', () => {
    const { store } = renderWithProviders(<LoginComponent />);

    const emailInput = screen.getByPlaceholderText('Email');

    expect(store.getState().auth.email).toEqual('');
    fireEvent.change(emailInput, {
      target: { value: 'simon.nixon@gmail.com' },
    });
    expect(store.getState().auth.email).toEqual('simon.nixon@gmail.com');
  });

  test('should disable the login button when email is invalid or password is empty', () => {
    renderWithProviders(<LoginComponent />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    let submitButton = screen.getByRole('button');
    fireEvent.change(emailInput, {
      target: { value: '' },
    });
    fireEvent.change(passwordInput, {
      target: { value: '' },
    });
    expect(submitButton).toBeDisabled();

    submitButton = screen.getByRole('button');
    fireEvent.change(emailInput, {
      target: { value: 'invalid' },
    });
    fireEvent.change(passwordInput, {
      target: { value: '' },
    });
    expect(submitButton).toBeDisabled();

    submitButton = screen.getByRole('button');
    fireEvent.change(emailInput, {
      target: { value: 'simon.nixon@gmail.com' },
    });
    fireEvent.change(passwordInput, {
      target: { value: '' },
    });
    expect(submitButton).toBeDisabled();

    submitButton = screen.getByRole('button');
    fireEvent.change(emailInput, {
      target: { value: 'simon.nixon@gmail.com' },
    });
    fireEvent.change(passwordInput, {
      target: { value: 'dummyPassword' },
    });
    expect(submitButton).toBeEnabled();
  });

  test('should show error message when login fails', async () => {
    const { store } = renderWithProviders(<LoginComponent />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    fireEvent.change(emailInput, {
      target: { value: 'dummyemail@gmail.com' },
    });
    fireEvent.change(passwordInput, {
      target: { value: 'dummyPassword' },
    });

    const mockFunction = jest
      .spyOn(Api, 'getSession')
      .mockReturnValue(new Promise((res, rej) => rej(false)));

    const submitButton = screen.getByRole('button');
    await waitFor(() => fireEvent.click(submitButton));

    expect(store.getState().auth.loginError).toBeTruthy();
    expect(screen.getByText('Account not found!')).toBeInTheDocument();
    mockFunction.mockRestore();
  });

  test('should show error message when login fails', async () => {
    const { store } = renderWithProviders(<LoginComponent />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    fireEvent.change(emailInput, {
      target: { value: 'dummyemail@gmail.com' },
    });
    fireEvent.change(passwordInput, {
      target: { value: 'dummyPassword' },
    });

    const mockFunction = jest
      .spyOn(Api, 'getSession')
      .mockReturnValue(new Promise((res) => res(true)));

    const submitButton = screen.getByRole('button');
    await waitFor(() => fireEvent.click(submitButton));

    expect(store.getState().auth.loginError).toBeFalsy();
    mockFunction.mockRestore();
  });
});
