import expect from 'expect';
import { warning } from '../../src/deploy';

describe('deploy', () => {
  it('should give no warning with no files', () => {
    expect(warning({})).toEqual(undefined);
  });

  it('should warn about deploying a jekyll folder', () => {
    expect(warning({'_config.yml': true})).toMatch(/jekyll/i);
  });

  it('should warn about deploy node_modules', () => {
    expect(warning({'node_modules': true})).toMatch(/node_modules/);
  });

  it('should warn about Gruntfile', () => {
    expect(warning({'Gruntfile.js': true})).toMatch(/grunt/);
  });

  it('should warn about gulfile', () => {
    expect(warning({'gulpfile.js': true})).toMatch(/gulp/);
  });

  it('should warn about package.json', () => {
    expect(warning({'package.json': true})).toMatch(/package.json/);
  });
});
