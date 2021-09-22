const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const fileManager = require('../index');

const { expect } = chai;

chai.use(chaiAsPromised);

describe('fileManager tests', () => {
  const STORAGE_ROOT = `${__dirname}/fixtures/storage`;
  const FILE = `${STORAGE_ROOT}/t.txt`;
  const NEW_DIR = `${STORAGE_ROOT}/new`;
  const NEW_FILE = `${NEW_DIR}/new.txt`;
  const NEW_DIR_TREE = `${STORAGE_ROOT}/xxx/yyy/zzz`;
  const NEW_DIR_TREE_FILE = `${STORAGE_ROOT}/fff/ccc/mmm/new.txt`;

  describe('.stat(path)', () => {
    it('should get a dir stats', () =>
      expect(fileManager.stat(STORAGE_ROOT)).to.be.eventually.fulfilled
        .then((stats) => {
          expect(stats.isDirectory()).to.equal(true);
          expect(stats.size).to.be.above(0);
        }));

    it('should get a file stats', () =>
      expect(fileManager.stat(`${STORAGE_ROOT}/t.txt`))
        .to.be.eventually.fulfilled
        .then((stats) => {
          expect(stats.isFile()).to.equal(true);
          expect(stats.size).to.equal(19);
        }));

    it('should reject with an error when path not found', () =>
      expect(fileManager.stat(`${STORAGE_ROOT}/not_found.txt`)).to
        .be.eventually.rejected.and.to
        .have.property('code').and.to.equal('ENOENT'));
  });

  describe('.list(path)', () => {
    it('should list files and dirs inside a path', () =>
      expect(fileManager.list(STORAGE_ROOT)).to.be.eventually.fulfilled
        .then((entries) => {
          expect(entries.dirs.map(entry => entry.replace(STORAGE_ROOT, '')))
            .to.deep.equal(['/a', '/b']);
          expect(entries.files.map(entry => entry.replace(STORAGE_ROOT, '')))
            .to.deep.equal(['/t.txt']);
        }));
  });

  describe('.listDeep(path)', () => {
    it('should list files and dirs inside a path', () =>
      expect(fileManager.listDeep(STORAGE_ROOT)).to.be.eventually.fulfilled
        .then((entries) => {
          const dirs = entries.dirs.map(entry =>
            entry.replace(STORAGE_ROOT, ''));
          expect(dirs).to.have.members(['/a', '/b', '/b/c', '/b/c/d']);
          const files = entries.files.map(entry =>
            entry.replace(STORAGE_ROOT, ''));
          expect(files).to.have.members([
            '/t.txt',
            '/a/x.txt',
            '/a/y.txt',
            '/b/c/z.txt',
            '/b/c/d/d.txt'
          ]);
        }));
  });

  describe('.info(path)', () => {
    it('should get info object of a file', () =>
      expect(fileManager.info(`${STORAGE_ROOT}/t.txt`))
        .to.be.eventually.fulfilled
        .then((stats) => {
          expect(stats.size).to.equal(19);
          expect(stats.type).to.equal('file');
          expect(stats.atime).to.be.instanceof(Date);
          expect(stats.mtime).to.be.instanceof(Date);
          expect(stats.ctime).to.be.instanceof(Date);
        }));

    it('should get info object of a directory', () =>
      expect(fileManager.info(`${STORAGE_ROOT}`)).to.be.eventually.fulfilled
        .then((stats) => {
          expect(stats.size).to.equal(54);
          expect(stats.type).to.equal('directory');
          expect(stats.atime).to.be.instanceof(Date);
          expect(stats.mtime).to.be.instanceof(Date);
          expect(stats.ctime).to.be.instanceof(Date);
        }));
  });

  describe('.exists(path)', () => {
    it('should check that a path exists and resolve with true', () =>
      expect(fileManager.exists(STORAGE_ROOT)).to
        .be.eventually.fulfilled.and.to.equal(true));

    it('should check that a path exists resolve with false', () =>
      expect(fileManager.exists(`${STORAGE_ROOT}/not_found`)).to
        .be.eventually.fulfilled.and.to.equal(false));
  });

  describe('.createDir(path)', () => {
    it('should create a directory', () =>
      expect(fileManager.createDir(NEW_DIR)).to.be.eventually.fulfilled
        .then((path) => {
          expect(path).to.equal(NEW_DIR);
          return expect(fileManager.exists(NEW_DIR)).to
            .eventually.be.fulfilled.and.to.equal(true);
        }));

    it('should create a directory tree recursively', () =>
      expect(fileManager.createDir(NEW_DIR_TREE)).to.be.eventually.fulfilled
        .then((path) => {
          expect(path).to.equal(NEW_DIR_TREE);
          return expect(fileManager.exists(NEW_DIR_TREE)).to
            .eventually.be.fulfilled.and.to.equal(true);
        }));
  });

  describe('.createFile(path)', () => {
    it('should create a file', () =>
      expect(fileManager.createFile(NEW_FILE)).to.be.eventually.fulfilled
        .then((path) => {
          expect(path).to.equal(NEW_FILE);
          expect(fileManager.exists(NEW_FILE)).to
            .be.eventually.fulfilled.and.to.equal(true);
        }));

    it('should create a file inside a directory tree', () =>
      expect(fileManager.createFile(NEW_DIR_TREE_FILE))
        .to.be.eventually.fulfilled
        .then((path) => {
          expect(path).to.equal(NEW_DIR_TREE_FILE);
          expect(fileManager.exists(NEW_DIR_TREE_FILE)).to
            .eventually.be.fulfilled.and.to.equal(true);
        }));
  });

  describe('.readFile(path)', () => {
    it('should read file content', () =>
      expect(fileManager.readFile(FILE)).to.be.eventually
        .fulfilled.and.to.be.instanceof(Buffer));
  });

  describe('.removeFile(path)', () => {
    it('should remove an existing file', () =>
      expect(fileManager.removeFile(NEW_FILE)).to.be.eventually.fulfilled
        .then((path) => {
          expect(path).to.equal(NEW_FILE);
          expect(fileManager.exists(NEW_FILE)).to
            .eventually.be.fulfilled.and.to.equal(false);
        }));
  });

  describe('.removeDir(path)', () => {
    it('should remove an existing directory', () =>
      expect(fileManager.removeDir(NEW_DIR)).to.be.eventually.fulfilled
        .then((path) => {
          expect(path).to.equal(NEW_DIR);
          return expect(fileManager.exists(NEW_DIR)).to
            .be.eventually.fulfilled.and.to.equal(false);
        }));

    it('should remove an existing directory tree recursively', () =>
      expect(fileManager.removeDir(`${STORAGE_ROOT}/xxx`))
        .to.be.eventually.fulfilled
        .then((path) => {
          expect(path).to.equal(`${STORAGE_ROOT}/xxx`);
          return expect(fileManager.removeDir(`${STORAGE_ROOT}/fff`)).to
            .be.eventually.fulfilled;
        })
        .then((path) => {
          expect(path).to.equal(`${STORAGE_ROOT}/fff`);
          return expect(fileManager.exists(`${STORAGE_ROOT}/xxx`)).to
            .be.eventually.fulfilled.and.to.equal(false);
        })
        .then(() =>
          expect(fileManager.exists(`${STORAGE_ROOT}/fff`)).to
            .be.eventually.fulfilled.and.to.equal(false)));
  });

  describe('.rename(oldPath, newPath)', () => {
    it('should rename a file', () => {
      const newPath = `${STORAGE_ROOT}/r.txt`;
      const oldPath = `${STORAGE_ROOT}/t.txt`;
      return expect(fileManager.rename(oldPath, newPath)).to
        .be.eventually.fulfilled.and.to.equal(newPath)
        .then(() =>
          expect(fileManager.exists(oldPath)).to
            .be.eventually.fulfilled.and.to.equal(false))
        .then(() =>
          expect(fileManager.exists(newPath)).to
            .be.eventually.fulfilled.and.to.equal(true))
        .then(() => {
          expect(fileManager.rename(newPath, oldPath)).to
            .be.eventually.be.fulfilled.and.to.equal(oldPath);
        });
    });

    it('should rename a directory', () => {
      const newPath = `${STORAGE_ROOT}/r`;
      const oldPath = `${STORAGE_ROOT}/a`;
      return expect(fileManager.rename(oldPath, newPath)).to
        .be.eventually.be.fulfilled.and.to.equal(newPath)
        .then(() =>
          expect(fileManager.exists(oldPath)).to
            .be.eventually.fulfilled.and.to.equal(false))
        .then(() =>
          expect(fileManager.exists(newPath)).to
            .be.eventually.fulfilled.and.to.equal(true))
        .then(() =>
          expect(fileManager.rename(newPath, oldPath))
            .to.eventually.be.fulfilled.and.to.equal(oldPath));
    });
  });
});
