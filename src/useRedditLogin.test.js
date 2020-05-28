import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import { renderHook, cleanup } from '@testing-library/react-hooks'
import { useRedditLogin } from './useRedditLogin';
import { LOGIN_STATE } from './constants';
import APIMock from './API';

jest.mock('./API');
jest.mock('./helpers');
const { location } = window;
beforeEach(() => {
  delete window.location;
  window.location = { search: '' };
});
afterEach(() => {
  window.location = location;
  APIMock.getAccessToken.mockClear();
  cleanup();
});

const renderRedditHook = (initState = LOGIN_STATE.INIT) => {
  const mockStore = configureStore();
  const mockedStore = mockStore({ login: { loginStatus: initState } });
  const wrapper = ({ children }) => <Provider store={mockedStore}>{children}</Provider>
  const result = renderHook(() => useRedditLogin(), { wrapper })
  return { ...result, mockedStore };
}

test('should start in init state', () => {
  const { result } = renderRedditHook();
  expect(result.current.loginStatus).toBe(LOGIN_STATE.INIT);
})

test('should attempt to login when authorization code is on the url', () => {
  window.location = { search: 'code=authorization_code', replace: jest.fn() };
  APIMock.getAccessToken.mockResolvedValue(Promise.resolve('ACCESS_TOKEN'));

  const { result } = renderRedditHook();

  expect(result.current.loginStatus).toBe(LOGIN_STATE.INIT);
  expect(APIMock.getAccessToken).toHaveBeenCalledWith('authorization_code');
})