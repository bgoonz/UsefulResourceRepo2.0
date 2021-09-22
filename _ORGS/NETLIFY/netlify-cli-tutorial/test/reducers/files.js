import expect from 'expect';
import { initFilesystem, addFile } from '../../src/actions/base';
import { files } from '../../src/reducers/files';

describe('files', () => {
  it('should handle an empty state', () => {
    expect(
      files(undefined, {})
    ).toEqual(
      {}
    );
  });

  it('should set file system', () => {
    expect(
      files(undefined, initFilesystem({'folder': {'README': 'hello'}}))
    ).toEqual(
      {'folder': {'README': 'hello'}}
    );
  });

  it('should add a file', () => {
    expect(
      files({folder: {'README': 'hello'}}, addFile('folder/.netlify', '{"site_id": "1234"}'))
    ).toEqual(
      {folder: {'README': 'hello', '.netlify': '{"site_id": "1234"}'}}
    );
  });
});
