import expect from 'expect';
import { lookup } from '../../src/lib/filesystem';

describe('filesystem', () => {
  it('should lookup an empty path', () => {
    expect(lookup({test: 'hello'}, '', '')).toEqual({test: 'hello'});
  });

  it('should lookup a simple file', () => {
    expect(lookup({test: 'hello'}, '', 'test')).toEqual('hello');
  });

  it('should lookup a nested directory', () => {
    expect(lookup({a: {b: 'c'}}, '', 'a/b')).toEqual('c');
    expect(lookup({a: {b: 'c'}}, '', '/a/b')).toEqual('c');
  });

  it('should lookup relative to the current working dir', () => {
    expect(lookup({a: {b: 'c'}}, 'a', 'b')).toEqual('c');
  });
});
