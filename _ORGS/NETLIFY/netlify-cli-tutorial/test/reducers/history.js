import expect from 'expect';
import { addHistory } from '../../src/actions/base';
import { history, startScreen } from '../../src/reducers/history';

describe('history', () => {
  it('should handle an empty state', () => {
    expect(history(undefined, {})).toEqual(startScreen.split('\n'));
  });

  it('should add a history event', () => {
    expect(history([], addHistory('hello'))).toEqual(['hello']);
  });

  it('should add multiple history events', () => {
    expect(history([], addHistory('hello', 'world'))).toEqual(['hello', 'world']);
  });
});
