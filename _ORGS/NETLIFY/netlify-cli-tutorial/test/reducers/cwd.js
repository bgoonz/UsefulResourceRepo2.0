import expect from 'expect';
import { setCwd } from '../../src/actions/base';
import { cwd } from '../../src/reducers/cwd';

describe('cwd', () => {
  it('should handle an empty state', () => {
    expect(cwd(undefined, {})).toEqual('');
  });

  it('should set the cwd', () => {
    expect(cwd(undefined, setCwd('folder/test'))).toEqual('folder/test');
  });
});
