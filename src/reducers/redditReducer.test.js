import reducer from './redditReducer';
import { setLoading, setTopData, markPostAsSeen } from '../actions';

const INIT_STATE = {
  data: {},
  loading: false,
  error: null,
  activeId: null
};

test('should start not loading with empty data', () => {
  const state = reducer(undefined, { type: 'init_action' });
  expect(state).toEqual(INIT_STATE);
});

test('should set loading when loading is triggered', () => {
  const state = reducer(INIT_STATE, setLoading(true));
  expect(state.loading).toEqual(true);
});

test('should store data normalized', () => {
  const state = reducer(INIT_STATE, setTopData([
    { id: 'id_1', data: 'hi' },
    { id: 'id_2', data: 'bye' }
  ]));
  expect(state.data).toEqual({
    id_1: { id: 'id_1', data: 'hi' },
    id_2: { id: 'id_2', data: 'bye' }
  });
});

test('should merge new data with old onw', () => {
  const oldState = INIT_STATE;
  oldState.data = {
    'id_2': { id: 'id_2', comments: 1, seen: true },
  }
  const state = reducer(oldState, setTopData([
    { id: 'id_1', data: 'hi', comments: 2 },
    { id: 'id_2', data: 'bye', comments: 3 },
  ]));
  expect(state.data).toEqual({
    id_1: { id: 'id_1', data: 'hi', comments: 2 },
    id_2: { id: 'id_2', data: 'bye', seen: true, comments: 3 },
  });
});

test('markPostAsSeen should only change seen porp to true', () => {
  const oldState = INIT_STATE;
  oldState.data = {
    id_1: { id: 'id_1', data: 'hi', comments: 2 },
    id_2: { id: 'id_2', data: 'bye', seen: true, comments: 3 },
  }
  const state = reducer(oldState, markPostAsSeen('id_1'));
  expect(state.data).toEqual({
    id_1: { id: 'id_1', data: 'hi', comments: 2, seen: true },
    id_2: { id: 'id_2', data: 'bye', seen: true, comments: 3 },
  });
})