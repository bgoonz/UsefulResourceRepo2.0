# File system | Node.js v14.13.1 Documentation

> Source Code: lib/fs.js

**Source Code:** [lib/fs.js](https://github.com/nodejs/node/blob/v14.13.1/lib/fs.js)

The `fs` module enables interacting with the file system in a way modeled on standard POSIX functions.

To use this module:

    const fs = require('fs');

All file system operations have synchronous, callback, and promise-based forms.

Synchronous example[#](#fs_synchronous_example)
-----------------------------------------------

The synchronous form blocks the Node.js event loop and further JavaScript execution until the operation is complete. Exceptions are thrown immediately and can be handled using `try…catch`, or can be allowed to bubble up.

    const fs = require('fs');
    
    try {
      fs.unlinkSync('/tmp/hello');
      console.log('successfully deleted /tmp/hello');
    } catch (err) {
      
    }

Callback example[#](#fs_callback_example)
-----------------------------------------

The callback form takes a completion callback function as its last argument and invokes the operation asynchronously. The arguments passed to the completion callback depend on the method, but the first argument is always reserved for an exception. If the operation is completed successfully, then the first argument is `null` or `undefined`.

    const fs = require('fs');
    
    fs.unlink('/tmp/hello', (err) => {
      if (err) throw err;
      console.log('successfully deleted /tmp/hello');
    });

Promise example[#](#fs_promise_example)
---------------------------------------

Promise-based operations return a `Promise` that is resolved when the asynchronous operation is complete.

    const fs = require('fs/promises');
    
    (async function(path) {
      try {
        await fs.unlink(path);
        console.log(`successfully deleted ${path}`);
      } catch (error) {
        console.error('there was an error:', error.message);
      }
    })('/tmp/hello');

Ordering of callback and promise-based operations[#](#fs_ordering_of_callback_and_promise_based_operations)
-----------------------------------------------------------------------------------------------------------

There is no guaranteed ordering when using either the callback or promise-based methods. For example, the following is prone to error because the `fs.stat()` operation might complete before the `fs.rename()` operation:

    fs.rename('/tmp/hello', '/tmp/world', (err) => {
      if (err) throw err;
      console.log('renamed complete');
    });
    fs.stat('/tmp/world', (err, stats) => {
      if (err) throw err;
      console.log(`stats: ${JSON.stringify(stats)}`);
    });

To correctly order the operations, move the `fs.stat()` call into the callback of the `fs.rename()` operation:

    fs.rename('/tmp/hello', '/tmp/world', (err) => {
      if (err) throw err;
      fs.stat('/tmp/world', (err, stats) => {
        if (err) throw err;
        console.log(`stats: ${JSON.stringify(stats)}`);
      });
    });

Or, use the promise-based API:

    const fs = require('fs/promises');
    
    (async function(from, to) {
      try {
        await fs.rename(from, to);
        const stats = await fs.stat(to);
        console.log(`stats: ${JSON.stringify(stats)}`);
      } catch (error) {
        console.error('there was an error:', error.message);
      }
    })('/tmp/hello', '/tmp/world');

File paths[#](#fs_file_paths)
-----------------------------

Most `fs` operations accept filepaths that may be specified in the form of a string, a [`Buffer`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_buffer), or a [`URL`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api) object using the `file:` protocol.

String form paths are interpreted as UTF-8 character sequences identifying the absolute or relative filename. Relative paths will be resolved relative to the current working directory as determined by calling `process.cwd()`.

Example using an absolute path on POSIX:

    const fs = require('fs');
    
    fs.open('/open/some/file.txt', 'r', (err, fd) => {
      if (err) throw err;
      fs.close(fd, (err) => {
        if (err) throw err;
      });
    });

Example using a relative path on POSIX (relative to `process.cwd()`):

    fs.open('file.txt', 'r', (err, fd) => {
      if (err) throw err;
      fs.close(fd, (err) => {
        if (err) throw err;
      });
    });

Paths specified using a [`Buffer`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_buffer) are useful primarily on certain POSIX operating systems that treat file paths as opaque byte sequences. On such systems, it is possible for a single file path to contain sub-sequences that use multiple character encodings. As with string paths, `Buffer` paths may be relative or absolute:

Example using an absolute path on POSIX:

    fs.open(Buffer.from('/open/some/file.txt'), 'r', (err, fd) => {
      if (err) throw err;
      fs.close(fd, (err) => {
        if (err) throw err;
      });
    });

On Windows, Node.js follows the concept of per-drive working directory. This behavior can be observed when using a drive path without a backslash. For example `fs.readdirSync('C:\\')` can potentially return a different result than `fs.readdirSync('C:')`. For more information, see [this MSDN page](https://docs.microsoft.com/en-us/windows/desktop/FileIO/naming-a-file#fully-qualified-vs-relative-paths).

### URL object support[#](#fs_url_object_support)

Added in: v7.6.0

For most `fs` module functions, the `path` or `filename` argument may be passed as a WHATWG [`URL`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api) object. Only [`URL`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api) objects using the `file:` protocol are supported.

    const fs = require('fs');
    const fileUrl = new URL('file:///tmp/hello');
    
    fs.readFileSync(fileUrl);

`file:` URLs are always absolute paths.

Using WHATWG [`URL`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api) objects might introduce platform-specific behaviors.

On Windows, `file:` URLs with a host name convert to UNC paths, while `file:` URLs with drive letters convert to local absolute paths. `file:` URLs without a host name nor a drive letter will result in a throw:

    
    
    
    
    fs.readFileSync(new URL('file://hostname/p/a/t/h/file'));
    
    
    
    fs.readFileSync(new URL('file:///C:/tmp/hello'));
    
    
    fs.readFileSync(new URL('file:///notdriveletter/p/a/t/h/file'));
    fs.readFileSync(new URL('file:///c/p/a/t/h/file'));
    

`file:` URLs with drive letters must use `:` as a separator just after the drive letter. Using another separator will result in a throw.

On all other platforms, `file:` URLs with a host name are unsupported and will result in a throw:

    
    
    
    
    fs.readFileSync(new URL('file://hostname/p/a/t/h/file'));
    
    
    
    
    fs.readFileSync(new URL('file:///tmp/hello'));

A `file:` URL having encoded slash characters will result in a throw on all platforms:

    
    fs.readFileSync(new URL('file:///C:/p/a/t/h/%2F'));
    fs.readFileSync(new URL('file:///C:/p/a/t/h/%2f'));
    
    
    
    fs.readFileSync(new URL('file:///p/a/t/h/%2F'));
    fs.readFileSync(new URL('file:///p/a/t/h/%2f'));
    

On Windows, `file:` URLs having encoded backslash will result in a throw:

    
    fs.readFileSync(new URL('file:///C:/path/%5C'));
    fs.readFileSync(new URL('file:///C:/path/%5c'));
    

File descriptors[#](#fs_file_descriptors)
-----------------------------------------

On POSIX systems, for every process, the kernel maintains a table of currently open files and resources. Each open file is assigned a simple numeric identifier called a _file descriptor_. At the system-level, all file system operations use these file descriptors to identify and track each specific file. Windows systems use a different but conceptually similar mechanism for tracking resources. To simplify things for users, Node.js abstracts away the specific differences between operating systems and assigns all open files a numeric file descriptor.

The `fs.open()` method is used to allocate a new file descriptor. Once allocated, the file descriptor may be used to read data from, write data to, or request information about the file.

    fs.open('/open/some/file.txt', 'r', (err, fd) => {
      if (err) throw err;
      fs.fstat(fd, (err, stat) => {
        if (err) throw err;
        
    
        
        fs.close(fd, (err) => {
          if (err) throw err;
        });
      });
    });

Most operating systems limit the number of file descriptors that may be open at any given time so it is critical to close the descriptor when operations are completed. Failure to do so will result in a memory leak that will eventually cause an application to crash.

Threadpool usage[#](#fs_threadpool_usage)
-----------------------------------------

All file system APIs except `fs.FSWatcher()` and those that are explicitly synchronous use libuv's threadpool, which can have surprising and negative performance implications for some applications. See the [`UV_THREADPOOL_SIZE`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/cli.html#cli_uv_threadpool_size_size) documentation for more information.

Class: `fs.Dir`[#](#fs_class_fs_dir)
------------------------------------

Added in: v12.12.0

A class representing a directory stream.

Created by [`fs.opendir()`](#fs_fs_opendir_path_options_callback), [`fs.opendirSync()`](#fs_fs_opendirsync_path_options), or [`fsPromises.opendir()`](#fs_fspromises_opendir_path_options).

    const fs = require('fs');
    
    async function print(path) {
      const dir = await fs.promises.opendir(path);
      for await (const dirent of dir) {
        console.log(dirent.name);
      }
    }
    print('./').catch(console.error);

### `dir.close()`[#](#fs_dir_close)

Added in: v12.12.0

*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Asynchronously close the directory's underlying resource handle. Subsequent reads will result in errors.

A `Promise` is returned that will be resolved after the resource has been closed.

### `dir.close(callback)`[#](#fs_dir_close_callback)

Added in: v12.12.0

*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    *   `err` [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Asynchronously close the directory's underlying resource handle. Subsequent reads will result in errors.

The `callback` will be called after the resource handle has been closed.

### `dir.closeSync()`[#](#fs_dir_closesync)

Added in: v12.12.0

Synchronously close the directory's underlying resource handle. Subsequent reads will result in errors.

### `dir.path`[#](#fs_dir_path)

Added in: v12.12.0

*   [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

The read-only path of this directory as was provided to [`fs.opendir()`](#fs_fs_opendir_path_options_callback), [`fs.opendirSync()`](#fs_fs_opendirsync_path_options), or [`fsPromises.opendir()`](#fs_fspromises_opendir_path_options).

### `dir.read()`[#](#fs_dir_read)

Added in: v12.12.0

*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) containing [<fs.Dirent>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/fs.html#fs_class_fs_dirent) | [<null>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type)

Asynchronously read the next directory entry via [`readdir(3)`](http://man7.org/linux/man-pages/man3/readdir.3.html) as an [`fs.Dirent`](#fs_class_fs_dirent).

After the read is completed, a `Promise` is returned that will be resolved with an [`fs.Dirent`](#fs_class_fs_dirent), or `null` if there are no more directory entries to read.

Directory entries returned by this function are in no particular order as provided by the operating system's underlying directory mechanisms. Entries added or removed while iterating over the directory may or may not be included in the iteration results.

### `dir.read(callback)`[#](#fs_dir_read_callback)

Added in: v12.12.0

*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    *   `err` [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
    *   `dirent` [<fs.Dirent>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/fs.html#fs_class_fs_dirent) | [<null>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type)

Asynchronously read the next directory entry via [`readdir(3)`](http://man7.org/linux/man-pages/man3/readdir.3.html) as an [`fs.Dirent`](#fs_class_fs_dirent).

After the read is completed, the `callback` will be called with an [`fs.Dirent`](#fs_class_fs_dirent), or `null` if there are no more directory entries to read.

Directory entries returned by this function are in no particular order as provided by the operating system's underlying directory mechanisms. Entries added or removed while iterating over the directory may or may not be included in the iteration results.

### `dir.readSync()`[#](#fs_dir_readsync)

Added in: v12.12.0

*   Returns: [<fs.Dirent>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/fs.html#fs_class_fs_dirent) | [<null>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type)

Synchronously read the next directory entry via [`readdir(3)`](http://man7.org/linux/man-pages/man3/readdir.3.html) as an [`fs.Dirent`](#fs_class_fs_dirent).

If there are no more directory entries to read, `null` will be returned.

Directory entries returned by this function are in no particular order as provided by the operating system's underlying directory mechanisms. Entries added or removed while iterating over the directory may or may not be included in the iteration results.

### `dir[Symbol.asyncIterator]()`[#](#fs_dir_symbol_asynciterator)

Added in: v12.12.0

*   Returns: [<AsyncIterator>](https://tc39.github.io/ecma262/#sec-asynciterator-interface) of [<fs.Dirent>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/fs.html#fs_class_fs_dirent)

Asynchronously iterates over the directory via [`readdir(3)`](http://man7.org/linux/man-pages/man3/readdir.3.html) until all entries have been read.

Entries returned by the async iterator are always an [`fs.Dirent`](#fs_class_fs_dirent). The `null` case from `dir.read()` is handled internally.

See [`fs.Dir`](#fs_class_fs_dir) for an example.

Directory entries returned by this iterator are in no particular order as provided by the operating system's underlying directory mechanisms. Entries added or removed while iterating over the directory may or may not be included in the iteration results.

Class: `fs.Dirent`[#](#fs_class_fs_dirent)
------------------------------------------

Added in: v10.10.0

A representation of a directory entry, which can be a file or a subdirectory within the directory, as returned by reading from an [`fs.Dir`](#fs_class_fs_dir). The directory entry is a combination of the file name and file type pairs.

Additionally, when [`fs.readdir()`](#fs_fs_readdir_path_options_callback) or [`fs.readdirSync()`](#fs_fs_readdirsync_path_options) is called with the `withFileTypes` option set to `true`, the resulting array is filled with `fs.Dirent` objects, rather than strings or `Buffers`.

### `dirent.isBlockDevice()`[#](#fs_dirent_isblockdevice)

Added in: v10.10.0

*   Returns: [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Returns `true` if the `fs.Dirent` object describes a block device.

### `dirent.isCharacterDevice()`[#](#fs_dirent_ischaracterdevice)

Added in: v10.10.0

*   Returns: [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Returns `true` if the `fs.Dirent` object describes a character device.

### `dirent.isDirectory()`[#](#fs_dirent_isdirectory)

Added in: v10.10.0

*   Returns: [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Returns `true` if the `fs.Dirent` object describes a file system directory.

### `dirent.isFIFO()`[#](#fs_dirent_isfifo)

Added in: v10.10.0

*   Returns: [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Returns `true` if the `fs.Dirent` object describes a first-in-first-out (FIFO) pipe.

### `dirent.isFile()`[#](#fs_dirent_isfile)

Added in: v10.10.0

*   Returns: [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Returns `true` if the `fs.Dirent` object describes a regular file.

### `dirent.isSocket()`[#](#fs_dirent_issocket)

Added in: v10.10.0

*   Returns: [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Returns `true` if the `fs.Dirent` object describes a socket.

### `dirent.isSymbolicLink()`[#](#fs_dirent_issymboliclink)

Added in: v10.10.0

*   Returns: [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Returns `true` if the `fs.Dirent` object describes a symbolic link.

### `dirent.name`[#](#fs_dirent_name)

Added in: v10.10.0

*   [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer)

The file name that this `fs.Dirent` object refers to. The type of this value is determined by the `options.encoding` passed to [`fs.readdir()`](#fs_fs_readdir_path_options_callback) or [`fs.readdirSync()`](#fs_fs_readdirsync_path_options).

Class: `fs.FSWatcher`[#](#fs_class_fs_fswatcher)
------------------------------------------------

Added in: v0.5.8

*   Extends [<EventEmitter>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/events.html#events_class_eventemitter)

A successful call to [`fs.watch()`](#fs_fs_watch_filename_options_listener) method will return a new `fs.FSWatcher` object.

All `fs.FSWatcher` objects emit a `'change'` event whenever a specific watched file is modified.

### Event: `'change'`[#](#fs_event_change)

Added in: v0.5.8

*   `eventType` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) The type of change event that has occurred
*   `filename` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) The filename that changed (if relevant/available)

Emitted when something changes in a watched directory or file. See more details in [`fs.watch()`](#fs_fs_watch_filename_options_listener).

The `filename` argument may not be provided depending on operating system support. If `filename` is provided, it will be provided as a `Buffer` if `fs.watch()` is called with its `encoding` option set to `'buffer'`, otherwise `filename` will be a UTF-8 string.

    
    fs.watch('./tmp', { encoding: 'buffer' }, (eventType, filename) => {
      if (filename) {
        console.log(filename);
        
      }
    });

### Event: `'close'`[#](#fs_event_close)

Added in: v10.0.0

Emitted when the watcher stops watching for changes. The closed `fs.FSWatcher` object is no longer usable in the event handler.

### Event: `'error'`[#](#fs_event_error)

Added in: v0.5.8

*   `error` [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Emitted when an error occurs while watching the file. The errored `fs.FSWatcher` object is no longer usable in the event handler.

### `watcher.close()`[#](#fs_watcher_close)

Added in: v0.5.8

Stop watching for changes on the given `fs.FSWatcher`. Once stopped, the `fs.FSWatcher` object is no longer usable.

### `watcher.ref()`[#](#fs_watcher_ref)

Added in: v14.3.0

*   Returns: [<fs.FSWatcher>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/fs.html#fs_class_fs_fswatcher)

When called, requests that the Node.js event loop _not_ exit so long as the `FSWatcher` is active. Calling `watcher.ref()` multiple times will have no effect.

By default, all `FSWatcher` objects are "ref'ed", making it normally unnecessary to call `watcher.ref()` unless `watcher.unref()` had been called previously.

### `watcher.unref()`[#](#fs_watcher_unref)

Added in: v14.3.0

*   Returns: [<fs.FSWatcher>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/fs.html#fs_class_fs_fswatcher)

When called, the active `FSWatcher` object will not require the Node.js event loop to remain active. If there is no other activity keeping the event loop running, the process may exit before the `FSWatcher` object's callback is invoked. Calling `watcher.unref()` multiple times will have no effect.

Class: `fs.StatWatcher`[#](#fs_class_fs_statwatcher)
----------------------------------------------------

Added in: v14.3.0

*   Extends [<EventEmitter>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/events.html#events_class_eventemitter)

A successful call to `fs.watchFile()` method will return a new `fs.StatWatcher` object.

### `watcher.ref()`[#](#fs_watcher_ref_1)

Added in: v14.3.0

*   Returns: [<fs.StatWatcher>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/fs.html#fs_class_fs_statwatcher)

When called, requests that the Node.js event loop _not_ exit so long as the `StatWatcher` is active. Calling `watcher.ref()` multiple times will have no effect.

By default, all `StatWatcher` objects are "ref'ed", making it normally unnecessary to call `watcher.ref()` unless `watcher.unref()` had been called previously.

### `watcher.unref()`[#](#fs_watcher_unref_1)

Added in: v14.3.0

*   Returns: [<fs.StatWatcher>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/fs.html#fs_class_fs_statwatcher)

When called, the active `StatWatcher` object will not require the Node.js event loop to remain active. If there is no other activity keeping the event loop running, the process may exit before the `StatWatcher` object's callback is invoked. Calling `watcher.unref()` multiple times will have no effect.

Class: `fs.ReadStream`[#](#fs_class_fs_readstream)
--------------------------------------------------

Added in: v0.1.93

*   Extends: [<stream.Readable>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/stream.html#stream_class_stream_readable)

Instances of `fs.ReadStream` are created and returned using the [`fs.createReadStream()`](#fs_fs_createreadstream_path_options) function.

### Event: `'close'`[#](#fs_event_close_1)

Added in: v0.1.93

Emitted when the `fs.ReadStream`'s underlying file descriptor has been closed.

### Event: `'open'`[#](#fs_event_open)

Added in: v0.1.93

*   `fd` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Integer file descriptor used by the `ReadStream`.

Emitted when the `fs.ReadStream`'s file descriptor has been opened.

### Event: `'ready'`[#](#fs_event_ready)

Added in: v9.11.0

Emitted when the `fs.ReadStream` is ready to be used.

Fires immediately after `'open'`.

### `readStream.bytesRead`[#](#fs_readstream_bytesread)

Added in: v6.4.0

*   [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

The number of bytes that have been read so far.

### `readStream.path`[#](#fs_readstream_path)

Added in: v0.1.93

*   [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer)

The path to the file the stream is reading from as specified in the first argument to `fs.createReadStream()`. If `path` is passed as a string, then `readStream.path` will be a string. If `path` is passed as a `Buffer`, then `readStream.path` will be a `Buffer`.

### `readStream.pending`[#](#fs_readstream_pending)

Added in: v11.2.0, v10.16.0

*   [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

This property is `true` if the underlying file has not been opened yet, i.e. before the `'ready'` event is emitted.

Class: `fs.Stats`[#](#fs_class_fs_stats)
----------------------------------------

A `fs.Stats` object provides information about a file.

Objects returned from [`fs.stat()`](#fs_fs_stat_path_options_callback), [`fs.lstat()`](#fs_fs_lstat_path_options_callback) and [`fs.fstat()`](#fs_fs_fstat_fd_options_callback) and their synchronous counterparts are of this type. If `bigint` in the `options` passed to those methods is true, the numeric values will be `bigint` instead of `number`, and the object will contain additional nanosecond-precision properties suffixed with `Ns`.

    Stats {
      dev: 2114,
      ino: 48064969,
      mode: 33188,
      nlink: 1,
      uid: 85,
      gid: 100,
      rdev: 0,
      size: 527,
      blksize: 4096,
      blocks: 8,
      atimeMs: 1318289051000.1,
      mtimeMs: 1318289051000.1,
      ctimeMs: 1318289051000.1,
      birthtimeMs: 1318289051000.1,
      atime: Mon, 10 Oct 2011 23:24:11 GMT,
      mtime: Mon, 10 Oct 2011 23:24:11 GMT,
      ctime: Mon, 10 Oct 2011 23:24:11 GMT,
      birthtime: Mon, 10 Oct 2011 23:24:11 GMT }

`bigint` version:

    BigIntStats {
      dev: 2114n,
      ino: 48064969n,
      mode: 33188n,
      nlink: 1n,
      uid: 85n,
      gid: 100n,
      rdev: 0n,
      size: 527n,
      blksize: 4096n,
      blocks: 8n,
      atimeMs: 1318289051000n,
      mtimeMs: 1318289051000n,
      ctimeMs: 1318289051000n,
      birthtimeMs: 1318289051000n,
      atimeNs: 1318289051000000000n,
      mtimeNs: 1318289051000000000n,
      ctimeNs: 1318289051000000000n,
      birthtimeNs: 1318289051000000000n,
      atime: Mon, 10 Oct 2011 23:24:11 GMT,
      mtime: Mon, 10 Oct 2011 23:24:11 GMT,
      ctime: Mon, 10 Oct 2011 23:24:11 GMT,
      birthtime: Mon, 10 Oct 2011 23:24:11 GMT }

### `stats.isBlockDevice()`[#](#fs_stats_isblockdevice)

Added in: v0.1.10

*   Returns: [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Returns `true` if the `fs.Stats` object describes a block device.

### `stats.isCharacterDevice()`[#](#fs_stats_ischaracterdevice)

Added in: v0.1.10

*   Returns: [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Returns `true` if the `fs.Stats` object describes a character device.

### `stats.isDirectory()`[#](#fs_stats_isdirectory)

Added in: v0.1.10

*   Returns: [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Returns `true` if the `fs.Stats` object describes a file system directory.

### `stats.isFIFO()`[#](#fs_stats_isfifo)

Added in: v0.1.10

*   Returns: [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Returns `true` if the `fs.Stats` object describes a first-in-first-out (FIFO) pipe.

### `stats.isFile()`[#](#fs_stats_isfile)

Added in: v0.1.10

*   Returns: [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Returns `true` if the `fs.Stats` object describes a regular file.

### `stats.isSocket()`[#](#fs_stats_issocket)

Added in: v0.1.10

*   Returns: [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Returns `true` if the `fs.Stats` object describes a socket.

### `stats.isSymbolicLink()`[#](#fs_stats_issymboliclink)

Added in: v0.1.10

*   Returns: [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Returns `true` if the `fs.Stats` object describes a symbolic link.

This method is only valid when using [`fs.lstat()`](#fs_fs_lstat_path_options_callback).

### `stats.dev`[#](#fs_stats_dev)

*   [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [<bigint>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

The numeric identifier of the device containing the file.

### `stats.ino`[#](#fs_stats_ino)

*   [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [<bigint>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

The file system specific "Inode" number for the file.

### `stats.mode`[#](#fs_stats_mode)

*   [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [<bigint>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

A bit-field describing the file type and mode.

### `stats.nlink`[#](#fs_stats_nlink)

*   [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [<bigint>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

The number of hard-links that exist for the file.

### `stats.uid`[#](#fs_stats_uid)

*   [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [<bigint>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

The numeric user identifier of the user that owns the file (POSIX).

### `stats.gid`[#](#fs_stats_gid)

*   [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [<bigint>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

The numeric group identifier of the group that owns the file (POSIX).

### `stats.rdev`[#](#fs_stats_rdev)

*   [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [<bigint>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

A numeric device identifier if the file represents a device.

### `stats.size`[#](#fs_stats_size)

*   [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [<bigint>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

The size of the file in bytes.

### `stats.blksize`[#](#fs_stats_blksize)

*   [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [<bigint>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

The file system block size for i/o operations.

### `stats.blocks`[#](#fs_stats_blocks)

*   [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [<bigint>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

The number of blocks allocated for this file.

### `stats.atimeMs`[#](#fs_stats_atimems)

Added in: v8.1.0

*   [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [<bigint>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

The timestamp indicating the last time this file was accessed expressed in milliseconds since the POSIX Epoch.

### `stats.mtimeMs`[#](#fs_stats_mtimems)

Added in: v8.1.0

*   [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [<bigint>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

The timestamp indicating the last time this file was modified expressed in milliseconds since the POSIX Epoch.

### `stats.ctimeMs`[#](#fs_stats_ctimems)

Added in: v8.1.0

*   [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [<bigint>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

The timestamp indicating the last time the file status was changed expressed in milliseconds since the POSIX Epoch.

### `stats.birthtimeMs`[#](#fs_stats_birthtimems)

Added in: v8.1.0

*   [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [<bigint>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

The timestamp indicating the creation time of this file expressed in milliseconds since the POSIX Epoch.

### `stats.atimeNs`[#](#fs_stats_atimens)

Added in: v12.10.0

*   [<bigint>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

Only present when `bigint: true` is passed into the method that generates the object. The timestamp indicating the last time this file was accessed expressed in nanoseconds since the POSIX Epoch.

### `stats.mtimeNs`[#](#fs_stats_mtimens)

Added in: v12.10.0

*   [<bigint>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

Only present when `bigint: true` is passed into the method that generates the object. The timestamp indicating the last time this file was modified expressed in nanoseconds since the POSIX Epoch.

### `stats.ctimeNs`[#](#fs_stats_ctimens)

Added in: v12.10.0

*   [<bigint>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

Only present when `bigint: true` is passed into the method that generates the object. The timestamp indicating the last time the file status was changed expressed in nanoseconds since the POSIX Epoch.

### `stats.birthtimeNs`[#](#fs_stats_birthtimens)

Added in: v12.10.0

*   [<bigint>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

Only present when `bigint: true` is passed into the method that generates the object. The timestamp indicating the creation time of this file expressed in nanoseconds since the POSIX Epoch.

### `stats.atime`[#](#fs_stats_atime)

Added in: v0.11.13

*   [<Date>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

The timestamp indicating the last time this file was accessed.

### `stats.mtime`[#](#fs_stats_mtime)

Added in: v0.11.13

*   [<Date>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

The timestamp indicating the last time this file was modified.

### `stats.ctime`[#](#fs_stats_ctime)

Added in: v0.11.13

*   [<Date>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

The timestamp indicating the last time the file status was changed.

### `stats.birthtime`[#](#fs_stats_birthtime)

Added in: v0.11.13

*   [<Date>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

The timestamp indicating the creation time of this file.

### Stat time values[#](#fs_stat_time_values)

The `atimeMs`, `mtimeMs`, `ctimeMs`, `birthtimeMs` properties are numeric values that hold the corresponding times in milliseconds. Their precision is platform specific. When `bigint: true` is passed into the method that generates the object, the properties will be [bigints](https://tc39.github.io/proposal-bigint), otherwise they will be [numbers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type).

The `atimeNs`, `mtimeNs`, `ctimeNs`, `birthtimeNs` properties are [bigints](https://tc39.github.io/proposal-bigint) that hold the corresponding times in nanoseconds. They are only present when `bigint: true` is passed into the method that generates the object. Their precision is platform specific.

`atime`, `mtime`, `ctime`, and `birthtime` are [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object alternate representations of the various times. The `Date` and number values are not connected. Assigning a new number value, or mutating the `Date` value, will not be reflected in the corresponding alternate representation.

The times in the stat object have the following semantics:

*   `atime` "Access Time": Time when file data last accessed. Changed by the [`mknod(2)`](http://man7.org/linux/man-pages/man2/mknod.2.html), [`utimes(2)`](http://man7.org/linux/man-pages/man2/utimes.2.html), and [`read(2)`](http://man7.org/linux/man-pages/man2/read.2.html) system calls.
*   `mtime` "Modified Time": Time when file data last modified. Changed by the [`mknod(2)`](http://man7.org/linux/man-pages/man2/mknod.2.html), [`utimes(2)`](http://man7.org/linux/man-pages/man2/utimes.2.html), and [`write(2)`](http://man7.org/linux/man-pages/man2/write.2.html) system calls.
*   `ctime` "Change Time": Time when file status was last changed (inode data modification). Changed by the [`chmod(2)`](http://man7.org/linux/man-pages/man2/chmod.2.html), [`chown(2)`](http://man7.org/linux/man-pages/man2/chown.2.html), [`link(2)`](http://man7.org/linux/man-pages/man2/link.2.html), [`mknod(2)`](http://man7.org/linux/man-pages/man2/mknod.2.html), [`rename(2)`](http://man7.org/linux/man-pages/man2/rename.2.html), [`unlink(2)`](http://man7.org/linux/man-pages/man2/unlink.2.html), [`utimes(2)`](http://man7.org/linux/man-pages/man2/utimes.2.html), [`read(2)`](http://man7.org/linux/man-pages/man2/read.2.html), and [`write(2)`](http://man7.org/linux/man-pages/man2/write.2.html) system calls.
*   `birthtime` "Birth Time": Time of file creation. Set once when the file is created. On filesystems where birthtime is not available, this field may instead hold either the `ctime` or `1970-01-01T00:00Z` (ie, Unix epoch timestamp `0`). This value may be greater than `atime` or `mtime` in this case. On Darwin and other FreeBSD variants, also set if the `atime` is explicitly set to an earlier value than the current `birthtime` using the [`utimes(2)`](http://man7.org/linux/man-pages/man2/utimes.2.html) system call.

Prior to Node.js 0.12, the `ctime` held the `birthtime` on Windows systems. As of 0.12, `ctime` is not "creation time", and on Unix systems, it never was.

Class: `fs.WriteStream`[#](#fs_class_fs_writestream)
----------------------------------------------------

Added in: v0.1.93

*   Extends [<stream.Writable>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/stream.html#stream_class_stream_writable)

Instances of `fs.WriteStream` are created and returned using the [`fs.createWriteStream()`](#fs_fs_createwritestream_path_options) function.

### Event: `'close'`[#](#fs_event_close_2)

Added in: v0.1.93

Emitted when the `WriteStream`'s underlying file descriptor has been closed.

### Event: `'open'`[#](#fs_event_open_1)

Added in: v0.1.93

*   `fd` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Integer file descriptor used by the `WriteStream`.

Emitted when the `WriteStream`'s file is opened.

### Event: `'ready'`[#](#fs_event_ready_1)

Added in: v9.11.0

Emitted when the `fs.WriteStream` is ready to be used.

Fires immediately after `'open'`.

### `writeStream.bytesWritten`[#](#fs_writestream_byteswritten)

Added in: v0.4.7

The number of bytes written so far. Does not include data that is still queued for writing.

### `writeStream.path`[#](#fs_writestream_path)

Added in: v0.1.93

The path to the file the stream is writing to as specified in the first argument to [`fs.createWriteStream()`](#fs_fs_createwritestream_path_options). If `path` is passed as a string, then `writeStream.path` will be a string. If `path` is passed as a `Buffer`, then `writeStream.path` will be a `Buffer`.

### `writeStream.pending`[#](#fs_writestream_pending)

Added in: v11.2.0

*   [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

This property is `true` if the underlying file has not been opened yet, i.e. before the `'ready'` event is emitted.

`fs.access(path[, mode], callback)`[#](#fs_fs_access_path_mode_callback)
------------------------------------------------------------------------

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `mode` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `fs.constants.F_OK`
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    *   `err` [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Tests a user's permissions for the file or directory specified by `path`. The `mode` argument is an optional integer that specifies the accessibility checks to be performed. Check [File access constants](#fs_file_access_constants) for possible values of `mode`. It is possible to create a mask consisting of the bitwise OR of two or more values (e.g. `fs.constants.W_OK | fs.constants.R_OK`).

The final argument, `callback`, is a callback function that is invoked with a possible error argument. If any of the accessibility checks fail, the error argument will be an `Error` object. The following examples check if `package.json` exists, and if it is readable or writable.

    const file = 'package.json';
    
    
    fs.access(file, fs.constants.F_OK, (err) => {
      console.log(`${file} ${err ? 'does not exist' : 'exists'}`);
    });
    
    
    fs.access(file, fs.constants.R_OK, (err) => {
      console.log(`${file} ${err ? 'is not readable' : 'is readable'}`);
    });
    
    
    fs.access(file, fs.constants.W_OK, (err) => {
      console.log(`${file} ${err ? 'is not writable' : 'is writable'}`);
    });
    
    
    fs.access(file, fs.constants.F_OK | fs.constants.W_OK, (err) => {
      if (err) {
        console.error(
          `${file} ${err.code === 'ENOENT' ? 'does not exist' : 'is read-only'}`);
      } else {
        console.log(`${file} exists, and it is writable`);
      }
    });

Do not use `fs.access()` to check for the accessibility of a file before calling `fs.open()`, `fs.readFile()` or `fs.writeFile()`. Doing so introduces a race condition, since other processes may change the file's state between the two calls. Instead, user code should open/read/write the file directly and handle the error raised if the file is not accessible.

**write (NOT RECOMMENDED)**

    fs.access('myfile', (err) => {
      if (!err) {
        console.error('myfile already exists');
        return;
      }
    
      fs.open('myfile', 'wx', (err, fd) => {
        if (err) throw err;
        writeMyData(fd);
      });
    });

**write (RECOMMENDED)**

    fs.open('myfile', 'wx', (err, fd) => {
      if (err) {
        if (err.code === 'EEXIST') {
          console.error('myfile already exists');
          return;
        }
    
        throw err;
      }
    
      writeMyData(fd);
    });

**read (NOT RECOMMENDED)**

    fs.access('myfile', (err) => {
      if (err) {
        if (err.code === 'ENOENT') {
          console.error('myfile does not exist');
          return;
        }
    
        throw err;
      }
    
      fs.open('myfile', 'r', (err, fd) => {
        if (err) throw err;
        readMyData(fd);
      });
    });

**read (RECOMMENDED)**

    fs.open('myfile', 'r', (err, fd) => {
      if (err) {
        if (err.code === 'ENOENT') {
          console.error('myfile does not exist');
          return;
        }
    
        throw err;
      }
    
      readMyData(fd);
    });

The "not recommended" examples above check for accessibility and then use the file; the "recommended" examples are better because they use the file directly and handle the error, if any.

In general, check for the accessibility of a file only if the file will not be used directly, for example when its accessibility is a signal from another process.

On Windows, access-control policies (ACLs) on a directory may limit access to a file or directory. The `fs.access()` function, however, does not check the ACL and therefore may report that a path is accessible even if the ACL restricts the user from reading or writing to it.

`fs.accessSync(path[, mode])`[#](#fs_fs_accesssync_path_mode)
-------------------------------------------------------------

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `mode` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `fs.constants.F_OK`

Synchronously tests a user's permissions for the file or directory specified by `path`. The `mode` argument is an optional integer that specifies the accessibility checks to be performed. Check [File access constants](#fs_file_access_constants) for possible values of `mode`. It is possible to create a mask consisting of the bitwise OR of two or more values (e.g. `fs.constants.W_OK | fs.constants.R_OK`).

If any of the accessibility checks fail, an `Error` will be thrown. Otherwise, the method will return `undefined`.

    try {
      fs.accessSync('etc/passwd', fs.constants.R_OK | fs.constants.W_OK);
      console.log('can read/write');
    } catch (err) {
      console.error('no access!');
    }

`fs.appendFile(path, data[, options], callback)`[#](#fs_fs_appendfile_path_data_options_callback)
-------------------------------------------------------------------------------------------------

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api) | [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) filename or file descriptor
*   `data` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer)
*   `options` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
    *   `encoding` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<null>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `'utf8'`
    *   `mode` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0o666`
    *   `flag` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) See [support of file system `flags`](#fs_file_system_flags). **Default:** `'a'`.
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    *   `err` [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Asynchronously append data to a file, creating the file if it does not yet exist. `data` can be a string or a [`Buffer`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_buffer).

    fs.appendFile('message.txt', 'data to append', (err) => {
      if (err) throw err;
      console.log('The "data to append" was appended to file!');
    });

If `options` is a string, then it specifies the encoding:

    fs.appendFile('message.txt', 'data to append', 'utf8', callback);

The `path` may be specified as a numeric file descriptor that has been opened for appending (using `fs.open()` or `fs.openSync()`). The file descriptor will not be closed automatically.

    fs.open('message.txt', 'a', (err, fd) => {
      if (err) throw err;
      fs.appendFile(fd, 'data to append', 'utf8', (err) => {
        fs.close(fd, (err) => {
          if (err) throw err;
        });
        if (err) throw err;
      });
    });

`fs.appendFileSync(path, data[, options])`[#](#fs_fs_appendfilesync_path_data_options)
--------------------------------------------------------------------------------------

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api) | [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) filename or file descriptor
*   `data` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer)
*   `options` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
    *   `encoding` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<null>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `'utf8'`
    *   `mode` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0o666`
    *   `flag` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) See [support of file system `flags`](#fs_file_system_flags). **Default:** `'a'`.

Synchronously append data to a file, creating the file if it does not yet exist. `data` can be a string or a [`Buffer`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_buffer).

    try {
      fs.appendFileSync('message.txt', 'data to append');
      console.log('The "data to append" was appended to file!');
    } catch (err) {
      
    }

If `options` is a string, then it specifies the encoding:

    fs.appendFileSync('message.txt', 'data to append', 'utf8');

The `path` may be specified as a numeric file descriptor that has been opened for appending (using `fs.open()` or `fs.openSync()`). The file descriptor will not be closed automatically.

    let fd;
    
    try {
      fd = fs.openSync('message.txt', 'a');
      fs.appendFileSync(fd, 'data to append', 'utf8');
    } catch (err) {
      
    } finally {
      if (fd !== undefined)
        fs.closeSync(fd);
    }

`fs.chmod(path, mode, callback)`[#](#fs_fs_chmod_path_mode_callback)
--------------------------------------------------------------------

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `mode` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    *   `err` [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Asynchronously changes the permissions of a file. No arguments other than a possible exception are given to the completion callback.

See also: [`chmod(2)`](http://man7.org/linux/man-pages/man2/chmod.2.html).

    fs.chmod('my_file.txt', 0o775, (err) => {
      if (err) throw err;
      console.log('The permissions for file "my_file.txt" have been changed!');
    });

### File modes[#](#fs_file_modes)

The `mode` argument used in both the `fs.chmod()` and `fs.chmodSync()` methods is a numeric bitmask created using a logical OR of the following constants:

| Constant | Octal | Description |
| --- | --- | --- |
| `fs.constants.S_IRUSR` | `0o400` | read by owner |
| `fs.constants.S_IWUSR` | `0o200` | write by owner |
| `fs.constants.S_IXUSR` | `0o100` | execute/search by owner |
| `fs.constants.S_IRGRP` | `0o40` | read by group |
| `fs.constants.S_IWGRP` | `0o20` | write by group |
| `fs.constants.S_IXGRP` | `0o10` | execute/search by group |
| `fs.constants.S_IROTH` | `0o4` | read by others |
| `fs.constants.S_IWOTH` | `0o2` | write by others |
| `fs.constants.S_IXOTH` | `0o1` | execute/search by others |

An easier method of constructing the `mode` is to use a sequence of three octal digits (e.g. `765`). The left-most digit (`7` in the example), specifies the permissions for the file owner. The middle digit (`6` in the example), specifies permissions for the group. The right-most digit (`5` in the example), specifies the permissions for others.

| Number | Description |
| --- | --- |
| `7` | read, write, and execute |
| `6` | read and write |
| `5` | read and execute |
| `4` | read only |
| `3` | write and execute |
| `2` | write only |
| `1` | execute only |
| `0` | no permission |

For example, the octal value `0o765` means:

*   The owner may read, write and execute the file.
*   The group may read and write the file.
*   Others may read and execute the file.

When using raw numbers where file modes are expected, any value larger than `0o777` may result in platform-specific behaviors that are not supported to work consistently. Therefore constants like `S_ISVTX`, `S_ISGID` or `S_ISUID` are not exposed in `fs.constants`.

Caveats: on Windows only the write permission can be changed, and the distinction among the permissions of group, owner or others is not implemented.

`fs.chmodSync(path, mode)`[#](#fs_fs_chmodsync_path_mode)
---------------------------------------------------------

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `mode` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

For detailed information, see the documentation of the asynchronous version of this API: [`fs.chmod()`](#fs_fs_chmod_path_mode_callback).

See also: [`chmod(2)`](http://man7.org/linux/man-pages/man2/chmod.2.html).

`fs.chown(path, uid, gid, callback)`[#](#fs_fs_chown_path_uid_gid_callback)
---------------------------------------------------------------------------

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `uid` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `gid` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    *   `err` [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Asynchronously changes owner and group of a file. No arguments other than a possible exception are given to the completion callback.

See also: [`chown(2)`](http://man7.org/linux/man-pages/man2/chown.2.html).

`fs.chownSync(path, uid, gid)`[#](#fs_fs_chownsync_path_uid_gid)
----------------------------------------------------------------

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `uid` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `gid` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

Synchronously changes owner and group of a file. Returns `undefined`. This is the synchronous version of [`fs.chown()`](#fs_fs_chown_path_uid_gid_callback).

See also: [`chown(2)`](http://man7.org/linux/man-pages/man2/chown.2.html).

`fs.close(fd, callback)`[#](#fs_fs_close_fd_callback)
-----------------------------------------------------

*   `fd` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    *   `err` [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Asynchronous [`close(2)`](http://man7.org/linux/man-pages/man2/close.2.html). No arguments other than a possible exception are given to the completion callback.

Calling `fs.close()` on any file descriptor (`fd`) that is currently in use through any other `fs` operation may lead to undefined behavior.

`fs.closeSync(fd)`[#](#fs_fs_closesync_fd)
------------------------------------------

Added in: v0.1.21

*   `fd` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

Synchronous [`close(2)`](http://man7.org/linux/man-pages/man2/close.2.html). Returns `undefined`.

Calling `fs.closeSync()` on any file descriptor (`fd`) that is currently in use through any other `fs` operation may lead to undefined behavior.

`fs.constants`[#](#fs_fs_constants)
-----------------------------------

*   [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

Returns an object containing commonly used constants for file system operations. The specific constants currently defined are described in [FS constants](#fs_fs_constants_1).

`fs.copyFile(src, dest[, mode], callback)`[#](#fs_fs_copyfile_src_dest_mode_callback)
-------------------------------------------------------------------------------------

*   `src` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api) source filename to copy
*   `dest` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api) destination filename of the copy operation
*   `mode` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) modifiers for copy operation. **Default:** `0`.
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

Asynchronously copies `src` to `dest`. By default, `dest` is overwritten if it already exists. No arguments other than a possible exception are given to the callback function. Node.js makes no guarantees about the atomicity of the copy operation. If an error occurs after the destination file has been opened for writing, Node.js will attempt to remove the destination.

`mode` is an optional integer that specifies the behavior of the copy operation. It is possible to create a mask consisting of the bitwise OR of two or more values (e.g. `fs.constants.COPYFILE_EXCL | fs.constants.COPYFILE_FICLONE`).

*   `fs.constants.COPYFILE_EXCL`: The copy operation will fail if `dest` already exists.
*   `fs.constants.COPYFILE_FICLONE`: The copy operation will attempt to create a copy-on-write reflink. If the platform does not support copy-on-write, then a fallback copy mechanism is used.
*   `fs.constants.COPYFILE_FICLONE_FORCE`: The copy operation will attempt to create a copy-on-write reflink. If the platform does not support copy-on-write, then the operation will fail.

    const fs = require('fs');
    const { COPYFILE_EXCL } = fs.constants;
    
    function callback(err) {
      if (err) throw err;
      console.log('source.txt was copied to destination.txt');
    }
    
    
    fs.copyFile('source.txt', 'destination.txt', callback);
    
    
    fs.copyFile('source.txt', 'destination.txt', COPYFILE_EXCL, callback);

`fs.copyFileSync(src, dest[, mode])`[#](#fs_fs_copyfilesync_src_dest_mode)
--------------------------------------------------------------------------

*   `src` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api) source filename to copy
*   `dest` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api) destination filename of the copy operation
*   `mode` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) modifiers for copy operation. **Default:** `0`.

Synchronously copies `src` to `dest`. By default, `dest` is overwritten if it already exists. Returns `undefined`. Node.js makes no guarantees about the atomicity of the copy operation. If an error occurs after the destination file has been opened for writing, Node.js will attempt to remove the destination.

`mode` is an optional integer that specifies the behavior of the copy operation. It is possible to create a mask consisting of the bitwise OR of two or more values (e.g. `fs.constants.COPYFILE_EXCL | fs.constants.COPYFILE_FICLONE`).

*   `fs.constants.COPYFILE_EXCL`: The copy operation will fail if `dest` already exists.
*   `fs.constants.COPYFILE_FICLONE`: The copy operation will attempt to create a copy-on-write reflink. If the platform does not support copy-on-write, then a fallback copy mechanism is used.
*   `fs.constants.COPYFILE_FICLONE_FORCE`: The copy operation will attempt to create a copy-on-write reflink. If the platform does not support copy-on-write, then the operation will fail.

    const fs = require('fs');
    const { COPYFILE_EXCL } = fs.constants;
    
    
    fs.copyFileSync('source.txt', 'destination.txt');
    console.log('source.txt was copied to destination.txt');
    
    
    fs.copyFileSync('source.txt', 'destination.txt', COPYFILE_EXCL);

`fs.createReadStream(path[, options])`[#](#fs_fs_createreadstream_path_options)
-------------------------------------------------------------------------------

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `options` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    *   `flags` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) See [support of file system `flags`](#fs_file_system_flags). **Default:** `'r'`.
    *   `encoding` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) **Default:** `null`
    *   `fd` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `null`
    *   `mode` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0o666`
    *   `autoClose` [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) **Default:** `true`
    *   `emitClose` [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) **Default:** `false`
    *   `start` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
    *   `end` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `Infinity`
    *   `highWaterMark` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `64 * 1024`
    *   `fs` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [<null>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `null`
*   Returns: [<fs.ReadStream>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/fs.html#fs_class_fs_readstream) See [Readable Stream](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/stream.html#stream_class_stream_readable).

Unlike the 16 kb default `highWaterMark` for a readable stream, the stream returned by this method has a default `highWaterMark` of 64 kb.

`options` can include `start` and `end` values to read a range of bytes from the file instead of the entire file. Both `start` and `end` are inclusive and start counting at 0, allowed values are in the \[0, [`Number.MAX_SAFE_INTEGER`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER)\] range. If `fd` is specified and `start` is omitted or `undefined`, `fs.createReadStream()` reads sequentially from the current file position. The `encoding` can be any one of those accepted by [`Buffer`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_buffer).

If `fd` is specified, `ReadStream` will ignore the `path` argument and will use the specified file descriptor. This means that no `'open'` event will be emitted. `fd` should be blocking; non-blocking `fd`s should be passed to [`net.Socket`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/net.html#net_class_net_socket).

If `fd` points to a character device that only supports blocking reads (such as keyboard or sound card), read operations do not finish until data is available. This can prevent the process from exiting and the stream from closing naturally.

By default, the stream will not emit a `'close'` event after it has been destroyed. This is the opposite of the default for other `Readable` streams. Set the `emitClose` option to `true` to change this behavior.

By providing the `fs` option, it is possible to override the corresponding `fs` implementations for `open`, `read`, and `close`. When providing the `fs` option, overrides for `open`, `read`, and `close` are required.

    const fs = require('fs');
    
    const stream = fs.createReadStream('/dev/input/event0');
    setTimeout(() => {
      stream.close(); 
      
      
      
      
      
      stream.push(null);
      stream.read(0);
    }, 100);

If `autoClose` is false, then the file descriptor won't be closed, even if there's an error. It is the application's responsibility to close it and make sure there's no file descriptor leak. If `autoClose` is set to true (default behavior), on `'error'` or `'end'` the file descriptor will be closed automatically.

`mode` sets the file mode (permission and sticky bits), but only if the file was created.

An example to read the last 10 bytes of a file which is 100 bytes long:

    fs.createReadStream('sample.txt', { start: 90, end: 99 });

If `options` is a string, then it specifies the encoding.

`fs.createWriteStream(path[, options])`[#](#fs_fs_createwritestream_path_options)
---------------------------------------------------------------------------------

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `options` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    *   `flags` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) See [support of file system `flags`](#fs_file_system_flags). **Default:** `'w'`.
    *   `encoding` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) **Default:** `'utf8'`
    *   `fd` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `null`
    *   `mode` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0o666`
    *   `autoClose` [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) **Default:** `true`
    *   `emitClose` [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) **Default:** `false`
    *   `start` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
    *   `fs` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [<null>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `null`
*   Returns: [<fs.WriteStream>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/fs.html#fs_class_fs_writestream) See [Writable Stream](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/stream.html#stream_class_stream_writable).

`options` may also include a `start` option to allow writing data at some position past the beginning of the file, allowed values are in the \[0, [`Number.MAX_SAFE_INTEGER`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER)\] range. Modifying a file rather than replacing it may require the `flags` option to be set to `r+` rather than the default `w`. The `encoding` can be any one of those accepted by [`Buffer`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_buffer).

If `autoClose` is set to true (default behavior) on `'error'` or `'finish'` the file descriptor will be closed automatically. If `autoClose` is false, then the file descriptor won't be closed, even if there's an error. It is the application's responsibility to close it and make sure there's no file descriptor leak.

By default, the stream will not emit a `'close'` event after it has been destroyed. This is the opposite of the default for other `Writable` streams. Set the `emitClose` option to `true` to change this behavior.

By providing the `fs` option it is possible to override the corresponding `fs` implementations for `open`, `write`, `writev` and `close`. Overriding `write()` without `writev()` can reduce performance as some optimizations (`_writev()`) will be disabled. When providing the `fs` option, overrides for `open`, `close`, and at least one of `write` and `writev` are required.

Like [`ReadStream`](#fs_class_fs_readstream), if `fd` is specified, [`WriteStream`](#fs_class_fs_writestream) will ignore the `path` argument and will use the specified file descriptor. This means that no `'open'` event will be emitted. `fd` should be blocking; non-blocking `fd`s should be passed to [`net.Socket`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/net.html#net_class_net_socket).

If `options` is a string, then it specifies the encoding.

`fs.exists(path, callback)`[#](#fs_fs_exists_path_callback)
-----------------------------------------------------------

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    *   `exists` [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Test whether or not the given path exists by checking with the file system. Then call the `callback` argument with either true or false:

    fs.exists('/etc/passwd', (exists) => {
      console.log(exists ? 'it\'s there' : 'no passwd!');
    });

**The parameters for this callback are not consistent with other Node.js callbacks.** Normally, the first parameter to a Node.js callback is an `err` parameter, optionally followed by other parameters. The `fs.exists()` callback has only one boolean parameter. This is one reason `fs.access()` is recommended instead of `fs.exists()`.

Using `fs.exists()` to check for the existence of a file before calling `fs.open()`, `fs.readFile()` or `fs.writeFile()` is not recommended. Doing so introduces a race condition, since other processes may change the file's state between the two calls. Instead, user code should open/read/write the file directly and handle the error raised if the file does not exist.

**write (NOT RECOMMENDED)**

    fs.exists('myfile', (exists) => {
      if (exists) {
        console.error('myfile already exists');
      } else {
        fs.open('myfile', 'wx', (err, fd) => {
          if (err) throw err;
          writeMyData(fd);
        });
      }
    });

**write (RECOMMENDED)**

    fs.open('myfile', 'wx', (err, fd) => {
      if (err) {
        if (err.code === 'EEXIST') {
          console.error('myfile already exists');
          return;
        }
    
        throw err;
      }
    
      writeMyData(fd);
    });

**read (NOT RECOMMENDED)**

    fs.exists('myfile', (exists) => {
      if (exists) {
        fs.open('myfile', 'r', (err, fd) => {
          if (err) throw err;
          readMyData(fd);
        });
      } else {
        console.error('myfile does not exist');
      }
    });

**read (RECOMMENDED)**

    fs.open('myfile', 'r', (err, fd) => {
      if (err) {
        if (err.code === 'ENOENT') {
          console.error('myfile does not exist');
          return;
        }
    
        throw err;
      }
    
      readMyData(fd);
    });

The "not recommended" examples above check for existence and then use the file; the "recommended" examples are better because they use the file directly and handle the error, if any.

In general, check for the existence of a file only if the file won’t be used directly, for example when its existence is a signal from another process.

`fs.existsSync(path)`[#](#fs_fs_existssync_path)
------------------------------------------------

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   Returns: [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type)

Returns `true` if the path exists, `false` otherwise.

For detailed information, see the documentation of the asynchronous version of this API: [`fs.exists()`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/fs.html#fs_fs_exists_path_callback).

`fs.exists()` is deprecated, but `fs.existsSync()` is not. The `callback` parameter to `fs.exists()` accepts parameters that are inconsistent with other Node.js callbacks. `fs.existsSync()` does not use a callback.

    if (fs.existsSync('/etc/passwd')) {
      console.log('The path exists.');
    }

`fs.fchmod(fd, mode, callback)`[#](#fs_fs_fchmod_fd_mode_callback)
------------------------------------------------------------------

*   `fd` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `mode` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    *   `err` [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Asynchronous [`fchmod(2)`](http://man7.org/linux/man-pages/man2/fchmod.2.html). No arguments other than a possible exception are given to the completion callback.

`fs.fchmodSync(fd, mode)`[#](#fs_fs_fchmodsync_fd_mode)
-------------------------------------------------------

Added in: v0.4.7

*   `fd` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `mode` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

Synchronous [`fchmod(2)`](http://man7.org/linux/man-pages/man2/fchmod.2.html). Returns `undefined`.

`fs.fchown(fd, uid, gid, callback)`[#](#fs_fs_fchown_fd_uid_gid_callback)
-------------------------------------------------------------------------

*   `fd` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `uid` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `gid` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    *   `err` [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Asynchronous [`fchown(2)`](http://man7.org/linux/man-pages/man2/fchown.2.html). No arguments other than a possible exception are given to the completion callback.

`fs.fchownSync(fd, uid, gid)`[#](#fs_fs_fchownsync_fd_uid_gid)
--------------------------------------------------------------

Added in: v0.4.7

*   `fd` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `uid` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `gid` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

Synchronous [`fchown(2)`](http://man7.org/linux/man-pages/man2/fchown.2.html). Returns `undefined`.

`fs.fdatasync(fd, callback)`[#](#fs_fs_fdatasync_fd_callback)
-------------------------------------------------------------

*   `fd` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    *   `err` [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Asynchronous [`fdatasync(2)`](http://man7.org/linux/man-pages/man2/fdatasync.2.html). No arguments other than a possible exception are given to the completion callback.

`fs.fdatasyncSync(fd)`[#](#fs_fs_fdatasyncsync_fd)
--------------------------------------------------

Added in: v0.1.96

*   `fd` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

Synchronous [`fdatasync(2)`](http://man7.org/linux/man-pages/man2/fdatasync.2.html). Returns `undefined`.

`fs.fstat(fd[, options], callback)`[#](#fs_fs_fstat_fd_options_callback)
------------------------------------------------------------------------

*   `fd` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `options` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    *   `bigint` [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Whether the numeric values in the returned [`fs.Stats`](#fs_class_fs_stats) object should be `bigint`. **Default:** `false`.
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    *   `err` [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
    *   `stats` [<fs.Stats>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/fs.html#fs_class_fs_stats)

Asynchronous [`fstat(2)`](http://man7.org/linux/man-pages/man2/fstat.2.html). The callback gets two arguments `(err, stats)` where `stats` is an [`fs.Stats`](#fs_class_fs_stats) object. `fstat()` is identical to [`stat()`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/fs.html#fs_fs_stat_path_options_callback), except that the file to be stat-ed is specified by the file descriptor `fd`.

`fs.fstatSync(fd[, options])`[#](#fs_fs_fstatsync_fd_options)
-------------------------------------------------------------

*   `fd` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `options` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    *   `bigint` [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Whether the numeric values in the returned [`fs.Stats`](#fs_class_fs_stats) object should be `bigint`. **Default:** `false`.
*   Returns: [<fs.Stats>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/fs.html#fs_class_fs_stats)

Synchronous [`fstat(2)`](http://man7.org/linux/man-pages/man2/fstat.2.html).

`fs.fsync(fd, callback)`[#](#fs_fs_fsync_fd_callback)
-----------------------------------------------------

*   `fd` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    *   `err` [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Asynchronous [`fsync(2)`](http://man7.org/linux/man-pages/man2/fsync.2.html). No arguments other than a possible exception are given to the completion callback.

`fs.fsyncSync(fd)`[#](#fs_fs_fsyncsync_fd)
------------------------------------------

Added in: v0.1.96

*   `fd` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

Synchronous [`fsync(2)`](http://man7.org/linux/man-pages/man2/fsync.2.html). Returns `undefined`.

`fs.ftruncate(fd[, len], callback)`[#](#fs_fs_ftruncate_fd_len_callback)
------------------------------------------------------------------------

*   `fd` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `len` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0`
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    *   `err` [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Asynchronous [`ftruncate(2)`](http://man7.org/linux/man-pages/man2/ftruncate.2.html). No arguments other than a possible exception are given to the completion callback.

If the file referred to by the file descriptor was larger than `len` bytes, only the first `len` bytes will be retained in the file.

For example, the following program retains only the first four bytes of the file:

    console.log(fs.readFileSync('temp.txt', 'utf8'));
    
    
    
    const fd = fs.openSync('temp.txt', 'r+');
    
    
    fs.ftruncate(fd, 4, (err) => {
      assert.ifError(err);
      console.log(fs.readFileSync('temp.txt', 'utf8'));
    });
    

If the file previously was shorter than `len` bytes, it is extended, and the extended part is filled with null bytes (`'\0'`):

    console.log(fs.readFileSync('temp.txt', 'utf8'));
    
    
    
    const fd = fs.openSync('temp.txt', 'r+');
    
    
    fs.ftruncate(fd, 10, (err) => {
      assert.ifError(err);
      console.log(fs.readFileSync('temp.txt'));
    });
    
    

The last three bytes are null bytes (`'\0'`), to compensate the over-truncation.

`fs.ftruncateSync(fd[, len])`[#](#fs_fs_ftruncatesync_fd_len)
-------------------------------------------------------------

Added in: v0.8.6

*   `fd` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `len` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0`

Returns `undefined`.

For detailed information, see the documentation of the asynchronous version of this API: [`fs.ftruncate()`](#fs_fs_ftruncate_fd_len_callback).

`fs.futimes(fd, atime, mtime, callback)`[#](#fs_fs_futimes_fd_atime_mtime_callback)
-----------------------------------------------------------------------------------

*   `fd` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `atime` [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Date>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
*   `mtime` [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Date>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    *   `err` [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Change the file system timestamps of the object referenced by the supplied file descriptor. See [`fs.utimes()`](#fs_fs_utimes_path_atime_mtime_callback).

This function does not work on AIX versions before 7.1, it will return the error `UV_ENOSYS`.

`fs.futimesSync(fd, atime, mtime)`[#](#fs_fs_futimessync_fd_atime_mtime)
------------------------------------------------------------------------

*   `fd` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `atime` [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Date>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
*   `mtime` [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Date>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

Synchronous version of [`fs.futimes()`](#fs_fs_futimes_fd_atime_mtime_callback). Returns `undefined`.

`fs.lchmod(path, mode, callback)`[#](#fs_fs_lchmod_path_mode_callback)
----------------------------------------------------------------------

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `mode` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    *   `err` [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Asynchronous [`lchmod(2)`](https://www.freebsd.org/cgi/man.cgi?query=lchmod&sektion=2). No arguments other than a possible exception are given to the completion callback.

Only available on macOS.

`fs.lchmodSync(path, mode)`[#](#fs_fs_lchmodsync_path_mode)
-----------------------------------------------------------

Deprecated since: v0.4.7

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `mode` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

Synchronous [`lchmod(2)`](https://www.freebsd.org/cgi/man.cgi?query=lchmod&sektion=2). Returns `undefined`.

`fs.lchown(path, uid, gid, callback)`[#](#fs_fs_lchown_path_uid_gid_callback)
-----------------------------------------------------------------------------

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `uid` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `gid` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    *   `err` [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Asynchronous [`lchown(2)`](http://man7.org/linux/man-pages/man2/lchown.2.html). No arguments other than a possible exception are given to the completion callback.

`fs.lchownSync(path, uid, gid)`[#](#fs_fs_lchownsync_path_uid_gid)
------------------------------------------------------------------

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `uid` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `gid` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

Synchronous [`lchown(2)`](http://man7.org/linux/man-pages/man2/lchown.2.html). Returns `undefined`.

`fs.lutimes(path, atime, mtime, callback)`[#](#fs_fs_lutimes_path_atime_mtime_callback)
---------------------------------------------------------------------------------------

Added in: v14.5.0

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `atime` [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Date>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
*   `mtime` [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Date>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    *   `err` [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Changes the access and modification times of a file in the same way as [`fs.utimes()`](#fs_fs_utimes_path_atime_mtime_callback), with the difference that if the path refers to a symbolic link, then the link is not dereferenced: instead, the timestamps of the symbolic link itself are changed.

No arguments other than a possible exception are given to the completion callback.

`fs.lutimesSync(path, atime, mtime)`[#](#fs_fs_lutimessync_path_atime_mtime)
----------------------------------------------------------------------------

Added in: v14.5.0

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `atime` [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Date>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
*   `mtime` [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Date>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

Change the file system timestamps of the symbolic link referenced by `path`. Returns `undefined`, or throws an exception when parameters are incorrect or the operation fails. This is the synchronous version of [`fs.lutimes()`](#fs_fs_lutimes_path_atime_mtime_callback).

`fs.link(existingPath, newPath, callback)`[#](#fs_fs_link_existingpath_newpath_callback)
----------------------------------------------------------------------------------------

*   `existingPath` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `newPath` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    *   `err` [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Asynchronous [`link(2)`](http://man7.org/linux/man-pages/man2/link.2.html). No arguments other than a possible exception are given to the completion callback.

`fs.linkSync(existingPath, newPath)`[#](#fs_fs_linksync_existingpath_newpath)
-----------------------------------------------------------------------------

*   `existingPath` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `newPath` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)

Synchronous [`link(2)`](http://man7.org/linux/man-pages/man2/link.2.html). Returns `undefined`.

`fs.lstat(path[, options], callback)`[#](#fs_fs_lstat_path_options_callback)
----------------------------------------------------------------------------

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `options` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    *   `bigint` [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Whether the numeric values in the returned [`fs.Stats`](#fs_class_fs_stats) object should be `bigint`. **Default:** `false`.
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    *   `err` [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
    *   `stats` [<fs.Stats>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/fs.html#fs_class_fs_stats)

Asynchronous [`lstat(2)`](http://man7.org/linux/man-pages/man2/lstat.2.html). The callback gets two arguments `(err, stats)` where `stats` is a [`fs.Stats`](#fs_class_fs_stats) object. `lstat()` is identical to `stat()`, except that if `path` is a symbolic link, then the link itself is stat-ed, not the file that it refers to.

`fs.lstatSync(path[, options])`[#](#fs_fs_lstatsync_path_options)
-----------------------------------------------------------------

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `options` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    *   `bigint` [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Whether the numeric values in the returned [`fs.Stats`](#fs_class_fs_stats) object should be `bigint`. **Default:** `false`.
*   Returns: [<fs.Stats>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/fs.html#fs_class_fs_stats)

Synchronous [`lstat(2)`](http://man7.org/linux/man-pages/man2/lstat.2.html).

`fs.mkdir(path[, options], callback)`[#](#fs_fs_mkdir_path_options_callback)
----------------------------------------------------------------------------

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `options` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
    *   `recursive` [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) **Default:** `false`
    *   `mode` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Not supported on Windows. **Default:** `0o777`.
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    *   `err` [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Asynchronously creates a directory.

The callback is given a possible exception and, if `recursive` is `true`, the first directory path created, `(err, [path])`.

The optional `options` argument can be an integer specifying `mode` (permission and sticky bits), or an object with a `mode` property and a `recursive` property indicating whether parent directories should be created. Calling `fs.mkdir()` when `path` is a directory that exists results in an error only when `recursive` is false.

    
    fs.mkdir('/tmp/a/apple', { recursive: true }, (err) => {
      if (err) throw err;
    });

On Windows, using `fs.mkdir()` on the root directory even with recursion will result in an error:

    fs.mkdir('/', { recursive: true }, (err) => {
      
    });

See also: [`mkdir(2)`](http://man7.org/linux/man-pages/man2/mkdir.2.html).

`fs.mkdirSync(path[, options])`[#](#fs_fs_mkdirsync_path_options)
-----------------------------------------------------------------

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `options` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
    *   `recursive` [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) **Default:** `false`
    *   `mode` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Not supported on Windows. **Default:** `0o777`.
*   Returns: [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Undefined_type)

Synchronously creates a directory. Returns `undefined`, or if `recursive` is `true`, the first directory path created. This is the synchronous version of [`fs.mkdir()`](#fs_fs_mkdir_path_options_callback).

See also: [`mkdir(2)`](http://man7.org/linux/man-pages/man2/mkdir.2.html).

`fs.mkdtemp(prefix[, options], callback)`[#](#fs_fs_mkdtemp_prefix_options_callback)
------------------------------------------------------------------------------------

*   `prefix` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
*   `options` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    *   `encoding` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) **Default:** `'utf8'`
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    *   `err` [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
    *   `directory` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Creates a unique temporary directory.

Generates six random characters to be appended behind a required `prefix` to create a unique temporary directory. Due to platform inconsistencies, avoid trailing `X` characters in `prefix`. Some platforms, notably the BSDs, can return more than six random characters, and replace trailing `X` characters in `prefix` with random characters.

The created directory path is passed as a string to the callback's second parameter.

The optional `options` argument can be a string specifying an encoding, or an object with an `encoding` property specifying the character encoding to use.

    fs.mkdtemp(path.join(os.tmpdir(), 'foo-'), (err, directory) => {
      if (err) throw err;
      console.log(directory);
      
    });

The `fs.mkdtemp()` method will append the six randomly selected characters directly to the `prefix` string. For instance, given a directory `/tmp`, if the intention is to create a temporary directory _within_ `/tmp`, the `prefix` must end with a trailing platform-specific path separator (`require('path').sep`).

    
    const tmpDir = os.tmpdir();
    
    
    fs.mkdtemp(tmpDir, (err, directory) => {
      if (err) throw err;
      console.log(directory);
      
      
      
    });
    
    
    const { sep } = require('path');
    fs.mkdtemp(`${tmpDir}${sep}`, (err, directory) => {
      if (err) throw err;
      console.log(directory);
      
      
      
    });

`fs.mkdtempSync(prefix[, options])`[#](#fs_fs_mkdtempsync_prefix_options)
-------------------------------------------------------------------------

Added in: v5.10.0

*   `prefix` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
*   `options` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    *   `encoding` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) **Default:** `'utf8'`
*   Returns: [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Returns the created directory path.

For detailed information, see the documentation of the asynchronous version of this API: [`fs.mkdtemp()`](#fs_fs_mkdtemp_prefix_options_callback).

The optional `options` argument can be a string specifying an encoding, or an object with an `encoding` property specifying the character encoding to use.

`fs.open(path[, flags[, mode]], callback)`[#](#fs_fs_open_path_flags_mode_callback)
-----------------------------------------------------------------------------------

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `flags` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) See [support of file system `flags`](#fs_file_system_flags). **Default:** `'r'`.
*   `mode` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0o666` (readable and writable)
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    *   `err` [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
    *   `fd` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

Asynchronous file open. See [`open(2)`](http://man7.org/linux/man-pages/man2/open.2.html).

`mode` sets the file mode (permission and sticky bits), but only if the file was created. On Windows, only the write permission can be manipulated; see [`fs.chmod()`](#fs_fs_chmod_path_mode_callback).

The callback gets two arguments `(err, fd)`.

Some characters (`< > : " / \ | ? *`) are reserved under Windows as documented by [Naming Files, Paths, and Namespaces](https://docs.microsoft.com/en-us/windows/desktop/FileIO/naming-a-file). Under NTFS, if the filename contains a colon, Node.js will open a file system stream, as described by [this MSDN page](https://docs.microsoft.com/en-us/windows/desktop/FileIO/using-streams).

Functions based on `fs.open()` exhibit this behavior as well: `fs.writeFile()`, `fs.readFile()`, etc.

`fs.opendir(path[, options], callback)`[#](#fs_fs_opendir_path_options_callback)
--------------------------------------------------------------------------------

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `options` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    *   `encoding` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<null>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `'utf8'`
    *   `bufferSize` [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Number of directory entries that are buffered internally when reading from the directory. Higher values lead to better performance but higher memory usage. **Default:** `32`
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    *   `err` [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
    *   `dir` [<fs.Dir>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/fs.html#fs_class_fs_dir)

Asynchronously open a directory. See [`opendir(3)`](http://man7.org/linux/man-pages/man3/opendir.3.html).

Creates an [`fs.Dir`](#fs_class_fs_dir), which contains all further functions for reading from and cleaning up the directory.

The `encoding` option sets the encoding for the `path` while opening the directory and subsequent read operations.

`fs.opendirSync(path[, options])`[#](#fs_fs_opendirsync_path_options)
---------------------------------------------------------------------

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `options` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    *   `encoding` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<null>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `'utf8'`
    *   `bufferSize` [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Number of directory entries that are buffered internally when reading from the directory. Higher values lead to better performance but higher memory usage. **Default:** `32`
*   Returns: [<fs.Dir>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/fs.html#fs_class_fs_dir)

Synchronously open a directory. See [`opendir(3)`](http://man7.org/linux/man-pages/man3/opendir.3.html).

Creates an [`fs.Dir`](#fs_class_fs_dir), which contains all further functions for reading from and cleaning up the directory.

The `encoding` option sets the encoding for the `path` while opening the directory and subsequent read operations.

`fs.openSync(path[, flags, mode])`[#](#fs_fs_opensync_path_flags_mode)
----------------------------------------------------------------------

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `flags` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `'r'`. See [support of file system `flags`](#fs_file_system_flags).
*   `mode` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0o666`
*   Returns: [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

Returns an integer representing the file descriptor.

For detailed information, see the documentation of the asynchronous version of this API: [`fs.open()`](#fs_fs_open_path_flags_mode_callback).

`fs.read(fd, buffer, offset, length, position, callback)`[#](#fs_fs_read_fd_buffer_offset_length_position_callback)
-------------------------------------------------------------------------------------------------------------------

*   `fd` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `buffer` [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<TypedArray>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [<DataView>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)
*   `offset` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `length` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `position` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    *   `err` [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
    *   `bytesRead` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
    *   `buffer` [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer)

Read data from the file specified by `fd`.

`buffer` is the buffer that the data (read from the fd) will be written to.

`offset` is the offset in the buffer to start writing at.

`length` is an integer specifying the number of bytes to read.

`position` is an argument specifying where to begin reading from in the file. If `position` is `null`, data will be read from the current file position, and the file position will be updated. If `position` is an integer, the file position will remain unchanged.

The callback is given the three arguments, `(err, bytesRead, buffer)`.

If the file is not modified concurrently, the end-of-file is reached when the number of bytes read is zero.

If this method is invoked as its [`util.promisify()`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/util.html#util_util_promisify_original)ed version, it returns a `Promise` for an `Object` with `bytesRead` and `buffer` properties.

`fs.read(fd, [options,] callback)`[#](#fs_fs_read_fd_options_callback)
----------------------------------------------------------------------

*   `fd` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `options` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    *   `buffer` [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<TypedArray>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [<DataView>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) **Default:** `Buffer.alloc(16384)`
    *   `offset` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0`
    *   `length` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `buffer.length`
    *   `position` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `null`
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    *   `err` [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
    *   `bytesRead` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
    *   `buffer` [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer)

Similar to the above `fs.read` function, this version takes an optional `options` object. If no `options` object is specified, it will default with the above values.

`fs.readdir(path[, options], callback)`[#](#fs_fs_readdir_path_options_callback)
--------------------------------------------------------------------------------

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `options` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    *   `encoding` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) **Default:** `'utf8'`
    *   `withFileTypes` [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) **Default:** `false`
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    *   `err` [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
    *   `files` [<string\[\]>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer\[\]>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<fs.Dirent\[\]>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/fs.html#fs_class_fs_dirent)

Asynchronous [`readdir(3)`](http://man7.org/linux/man-pages/man3/readdir.3.html). Reads the contents of a directory. The callback gets two arguments `(err, files)` where `files` is an array of the names of the files in the directory excluding `'.'` and `'..'`.

The optional `options` argument can be a string specifying an encoding, or an object with an `encoding` property specifying the character encoding to use for the filenames passed to the callback. If the `encoding` is set to `'buffer'`, the filenames returned will be passed as `Buffer` objects.

If `options.withFileTypes` is set to `true`, the `files` array will contain [`fs.Dirent`](#fs_class_fs_dirent) objects.

`fs.readdirSync(path[, options])`[#](#fs_fs_readdirsync_path_options)
---------------------------------------------------------------------

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `options` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    *   `encoding` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) **Default:** `'utf8'`
    *   `withFileTypes` [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) **Default:** `false`
*   Returns: [<string\[\]>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer\[\]>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<fs.Dirent\[\]>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/fs.html#fs_class_fs_dirent)

Synchronous [`readdir(3)`](http://man7.org/linux/man-pages/man3/readdir.3.html).

The optional `options` argument can be a string specifying an encoding, or an object with an `encoding` property specifying the character encoding to use for the filenames returned. If the `encoding` is set to `'buffer'`, the filenames returned will be passed as `Buffer` objects.

If `options.withFileTypes` is set to `true`, the result will contain [`fs.Dirent`](#fs_class_fs_dirent) objects.

`fs.readFile(path[, options], callback)`[#](#fs_fs_readfile_path_options_callback)
----------------------------------------------------------------------------------

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api) | [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) filename or file descriptor
*   `options` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
    *   `encoding` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<null>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `null`
    *   `flag` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) See [support of file system `flags`](#fs_file_system_flags). **Default:** `'r'`.
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    *   `err` [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
    *   `data` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer)

Asynchronously reads the entire contents of a file.

    fs.readFile('/etc/passwd', (err, data) => {
      if (err) throw err;
      console.log(data);
    });

The callback is passed two arguments `(err, data)`, where `data` is the contents of the file.

If no encoding is specified, then the raw buffer is returned.

If `options` is a string, then it specifies the encoding:

    fs.readFile('/etc/passwd', 'utf8', callback);

When the path is a directory, the behavior of `fs.readFile()` and [`fs.readFileSync()`](#fs_fs_readfilesync_path_options) is platform-specific. On macOS, Linux, and Windows, an error will be returned. On FreeBSD, a representation of the directory's contents will be returned.

    
    fs.readFile('<directory>', (err, data) => {
      
    });
    
    
    fs.readFile('<directory>', (err, data) => {
      
    });

The `fs.readFile()` function buffers the entire file. To minimize memory costs, when possible prefer streaming via `fs.createReadStream()`.

### File descriptors[#](#fs_file_descriptors_1)

1.  Any specified file descriptor has to support reading.
2.  If a file descriptor is specified as the `path`, it will not be closed automatically.
3.  The reading will begin at the current position. For example, if the file already had `'Hello World`' and six bytes are read with the file descriptor, the call to `fs.readFile()` with the same file descriptor, would give `'World'`, rather than `'Hello World'`.

`fs.readFileSync(path[, options])`[#](#fs_fs_readfilesync_path_options)
-----------------------------------------------------------------------

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api) | [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) filename or file descriptor
*   `options` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
    *   `encoding` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<null>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `null`
    *   `flag` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) See [support of file system `flags`](#fs_file_system_flags). **Default:** `'r'`.
*   Returns: [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer)

Returns the contents of the `path`.

For detailed information, see the documentation of the asynchronous version of this API: [`fs.readFile()`](#fs_fs_readfile_path_options_callback).

If the `encoding` option is specified then this function returns a string. Otherwise it returns a buffer.

Similar to [`fs.readFile()`](#fs_fs_readfile_path_options_callback), when the path is a directory, the behavior of `fs.readFileSync()` is platform-specific.

    
    fs.readFileSync('<directory>');
    
    
    
    fs.readFileSync('<directory>'); 

`fs.readlink(path[, options], callback)`[#](#fs_fs_readlink_path_options_callback)
----------------------------------------------------------------------------------

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `options` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    *   `encoding` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) **Default:** `'utf8'`
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    *   `err` [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
    *   `linkString` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer)

Asynchronous [`readlink(2)`](http://man7.org/linux/man-pages/man2/readlink.2.html). The callback gets two arguments `(err, linkString)`.

The optional `options` argument can be a string specifying an encoding, or an object with an `encoding` property specifying the character encoding to use for the link path passed to the callback. If the `encoding` is set to `'buffer'`, the link path returned will be passed as a `Buffer` object.

`fs.readlinkSync(path[, options])`[#](#fs_fs_readlinksync_path_options)
-----------------------------------------------------------------------

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `options` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    *   `encoding` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) **Default:** `'utf8'`
*   Returns: [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer)

Synchronous [`readlink(2)`](http://man7.org/linux/man-pages/man2/readlink.2.html). Returns the symbolic link's string value.

The optional `options` argument can be a string specifying an encoding, or an object with an `encoding` property specifying the character encoding to use for the link path returned. If the `encoding` is set to `'buffer'`, the link path returned will be passed as a `Buffer` object.

`fs.readSync(fd, buffer, offset, length, position)`[#](#fs_fs_readsync_fd_buffer_offset_length_position)
--------------------------------------------------------------------------------------------------------

*   `fd` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `buffer` [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<TypedArray>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [<DataView>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)
*   `offset` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `length` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `position` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   Returns: [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

Returns the number of `bytesRead`.

For detailed information, see the documentation of the asynchronous version of this API: [`fs.read()`](#fs_fs_read_fd_buffer_offset_length_position_callback).

`fs.readSync(fd, buffer, [options])`[#](#fs_fs_readsync_fd_buffer_options)
--------------------------------------------------------------------------

*   `fd` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `buffer` [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<TypedArray>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [<DataView>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)
*   `options` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    *   `offset` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0`
    *   `length` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `buffer.length`
    *   `position` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `null`
*   Returns: [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)

Returns the number of `bytesRead`.

Similar to the above `fs.readSync` function, this version takes an optional `options` object. If no `options` object is specified, it will default with the above values.

For detailed information, see the documentation of the asynchronous version of this API: [`fs.read()`](#fs_fs_read_fd_buffer_offset_length_position_callback).

`fs.readv(fd, buffers[, position], callback)`[#](#fs_fs_readv_fd_buffers_position_callback)
-------------------------------------------------------------------------------------------

Added in: v14.0.0

*   `fd` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `buffers` [<ArrayBufferView\[\]>](https://developer.mozilla.org/en-US/docs/Web/API/ArrayBufferView)
*   `position` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    *   `err` [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
    *   `bytesRead` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
    *   `buffers` [<ArrayBufferView\[\]>](https://developer.mozilla.org/en-US/docs/Web/API/ArrayBufferView)

Read from a file specified by `fd` and write to an array of `ArrayBufferView`s using `readv()`.

`position` is the offset from the beginning of the file from where data should be read. If `typeof position !== 'number'`, the data will be read from the current position.

The callback will be given three arguments: `err`, `bytesRead`, and `buffers`. `bytesRead` is how many bytes were read from the file.

If this method is invoked as its [`util.promisify()`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/util.html#util_util_promisify_original)ed version, it returns a `Promise` for an `Object` with `bytesRead` and `buffers` properties.

`fs.readvSync(fd, buffers[, position])`[#](#fs_fs_readvsync_fd_buffers_position)
--------------------------------------------------------------------------------

Added in: v14.0.0

*   `fd` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `buffers` [<ArrayBufferView\[\]>](https://developer.mozilla.org/en-US/docs/Web/API/ArrayBufferView)
*   `position` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   Returns: [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The number of bytes read.

For detailed information, see the documentation of the asynchronous version of this API: [`fs.readv()`](#fs_fs_readv_fd_buffers_position_callback).

`fs.realpath(path[, options], callback)`[#](#fs_fs_realpath_path_options_callback)
----------------------------------------------------------------------------------

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `options` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    *   `encoding` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) **Default:** `'utf8'`
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    *   `err` [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
    *   `resolvedPath` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer)

Asynchronously computes the canonical pathname by resolving `.`, `..` and symbolic links.

A canonical pathname is not necessarily unique. Hard links and bind mounts can expose a file system entity through many pathnames.

This function behaves like [`realpath(3)`](http://man7.org/linux/man-pages/man3/realpath.3.html), with some exceptions:

1.  No case conversion is performed on case-insensitive file systems.
    
2.  The maximum number of symbolic links is platform-independent and generally (much) higher than what the native [`realpath(3)`](http://man7.org/linux/man-pages/man3/realpath.3.html) implementation supports.
    

The `callback` gets two arguments `(err, resolvedPath)`. May use `process.cwd` to resolve relative paths.

Only paths that can be converted to UTF8 strings are supported.

The optional `options` argument can be a string specifying an encoding, or an object with an `encoding` property specifying the character encoding to use for the path passed to the callback. If the `encoding` is set to `'buffer'`, the path returned will be passed as a `Buffer` object.

If `path` resolves to a socket or a pipe, the function will return a system dependent name for that object.

`fs.realpath.native(path[, options], callback)`[#](#fs_fs_realpath_native_path_options_callback)
------------------------------------------------------------------------------------------------

Added in: v9.2.0

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `options` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    *   `encoding` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) **Default:** `'utf8'`
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    *   `err` [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
    *   `resolvedPath` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer)

Asynchronous [`realpath(3)`](http://man7.org/linux/man-pages/man3/realpath.3.html).

The `callback` gets two arguments `(err, resolvedPath)`.

Only paths that can be converted to UTF8 strings are supported.

The optional `options` argument can be a string specifying an encoding, or an object with an `encoding` property specifying the character encoding to use for the path passed to the callback. If the `encoding` is set to `'buffer'`, the path returned will be passed as a `Buffer` object.

On Linux, when Node.js is linked against musl libc, the procfs file system must be mounted on `/proc` in order for this function to work. Glibc does not have this restriction.

`fs.realpathSync(path[, options])`[#](#fs_fs_realpathsync_path_options)
-----------------------------------------------------------------------

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `options` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    *   `encoding` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) **Default:** `'utf8'`
*   Returns: [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer)

Returns the resolved pathname.

For detailed information, see the documentation of the asynchronous version of this API: [`fs.realpath()`](#fs_fs_realpath_path_options_callback).

`fs.realpathSync.native(path[, options])`[#](#fs_fs_realpathsync_native_path_options)
-------------------------------------------------------------------------------------

Added in: v9.2.0

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `options` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    *   `encoding` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) **Default:** `'utf8'`
*   Returns: [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer)

Synchronous [`realpath(3)`](http://man7.org/linux/man-pages/man3/realpath.3.html).

Only paths that can be converted to UTF8 strings are supported.

The optional `options` argument can be a string specifying an encoding, or an object with an `encoding` property specifying the character encoding to use for the path returned. If the `encoding` is set to `'buffer'`, the path returned will be passed as a `Buffer` object.

On Linux, when Node.js is linked against musl libc, the procfs file system must be mounted on `/proc` in order for this function to work. Glibc does not have this restriction.

`fs.rename(oldPath, newPath, callback)`[#](#fs_fs_rename_oldpath_newpath_callback)
----------------------------------------------------------------------------------

*   `oldPath` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `newPath` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    *   `err` [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Asynchronously rename file at `oldPath` to the pathname provided as `newPath`. In the case that `newPath` already exists, it will be overwritten. If there is a directory at `newPath`, an error will be raised instead. No arguments other than a possible exception are given to the completion callback.

See also: [`rename(2)`](http://man7.org/linux/man-pages/man2/rename.2.html).

    fs.rename('oldFile.txt', 'newFile.txt', (err) => {
      if (err) throw err;
      console.log('Rename complete!');
    });

`fs.renameSync(oldPath, newPath)`[#](#fs_fs_renamesync_oldpath_newpath)
-----------------------------------------------------------------------

*   `oldPath` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `newPath` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)

Synchronous [`rename(2)`](http://man7.org/linux/man-pages/man2/rename.2.html). Returns `undefined`.

`fs.rmdir(path[, options], callback)`[#](#fs_fs_rmdir_path_options_callback)
----------------------------------------------------------------------------

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `options` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    *   `maxRetries` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) If an `EBUSY`, `EMFILE`, `ENFILE`, `ENOTEMPTY`, or `EPERM` error is encountered, Node.js will retry the operation with a linear backoff wait of `retryDelay` ms longer on each try. This option represents the number of retries. This option is ignored if the `recursive` option is not `true`. **Default:** `0`.
    *   `recursive` [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) If `true`, perform a recursive directory removal. In recursive mode, errors are not reported if `path` does not exist, and operations are retried on failure. **Default:** `false`.
    *   `retryDelay` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The amount of time in milliseconds to wait between retries. This option is ignored if the `recursive` option is not `true`. **Default:** `100`.
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    *   `err` [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Asynchronous [`rmdir(2)`](http://man7.org/linux/man-pages/man2/rmdir.2.html). No arguments other than a possible exception are given to the completion callback.

Using `fs.rmdir()` on a file (not a directory) results in an `ENOENT` error on Windows and an `ENOTDIR` error on POSIX.

Setting `recursive` to `true` results in behavior similar to the Unix command `rm -rf`: an error will not be raised for paths that do not exist, and paths that represent files will be deleted. The permissive behavior of the `recursive` option is deprecated, `ENOTDIR` and `ENOENT` will be thrown in the future.

`fs.rmdirSync(path[, options])`[#](#fs_fs_rmdirsync_path_options)
-----------------------------------------------------------------

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `options` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    *   `maxRetries` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) If an `EBUSY`, `EMFILE`, `ENFILE`, `ENOTEMPTY`, or `EPERM` error is encountered, Node.js will retry the operation with a linear backoff wait of `retryDelay` ms longer on each try. This option represents the number of retries. This option is ignored if the `recursive` option is not `true`. **Default:** `0`.
    *   `recursive` [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) If `true`, perform a recursive directory removal. In recursive mode, errors are not reported if `path` does not exist, and operations are retried on failure. **Default:** `false`.
    *   `retryDelay` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The amount of time in milliseconds to wait between retries. This option is ignored if the `recursive` option is not `true`. **Default:** `100`.

Synchronous [`rmdir(2)`](http://man7.org/linux/man-pages/man2/rmdir.2.html). Returns `undefined`.

Using `fs.rmdirSync()` on a file (not a directory) results in an `ENOENT` error on Windows and an `ENOTDIR` error on POSIX.

Setting `recursive` to `true` results in behavior similar to the Unix command `rm -rf`: an error will not be raised for paths that do not exist, and paths that represent files will be deleted. The permissive behavior of the `recursive` option is deprecated, `ENOTDIR` and `ENOENT` will be thrown in the future.

`fs.stat(path[, options], callback)`[#](#fs_fs_stat_path_options_callback)
--------------------------------------------------------------------------

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `options` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    *   `bigint` [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Whether the numeric values in the returned [`fs.Stats`](#fs_class_fs_stats) object should be `bigint`. **Default:** `false`.
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    *   `err` [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
    *   `stats` [<fs.Stats>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/fs.html#fs_class_fs_stats)

Asynchronous [`stat(2)`](http://man7.org/linux/man-pages/man2/stat.2.html). The callback gets two arguments `(err, stats)` where `stats` is an [`fs.Stats`](#fs_class_fs_stats) object.

In case of an error, the `err.code` will be one of [Common System Errors](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/errors.html#errors_common_system_errors).

Using `fs.stat()` to check for the existence of a file before calling `fs.open()`, `fs.readFile()` or `fs.writeFile()` is not recommended. Instead, user code should open/read/write the file directly and handle the error raised if the file is not available.

To check if a file exists without manipulating it afterwards, [`fs.access()`](#fs_fs_access_path_mode_callback) is recommended.

For example, given the following directory structure:

    - txtDir
    -- file.txt
    - app.js

The next program will check for the stats of the given paths:

    const fs = require('fs');
    
    const pathsToCheck = ['./txtDir', './txtDir/file.txt'];
    
    for (let i = 0; i < pathsToCheck.length; i++) {
      fs.stat(pathsToCheck[i], function(err, stats) {
        console.log(stats.isDirectory());
        console.log(stats);
      });
    }

The resulting output will resemble:

    true
    Stats {
      dev: 16777220,
      mode: 16877,
      nlink: 3,
      uid: 501,
      gid: 20,
      rdev: 0,
      blksize: 4096,
      ino: 14214262,
      size: 96,
      blocks: 0,
      atimeMs: 1561174653071.963,
      mtimeMs: 1561174614583.3518,
      ctimeMs: 1561174626623.5366,
      birthtimeMs: 1561174126937.2893,
      atime: 2019-06-22T03:37:33.072Z,
      mtime: 2019-06-22T03:36:54.583Z,
      ctime: 2019-06-22T03:37:06.624Z,
      birthtime: 2019-06-22T03:28:46.937Z
    }
    false
    Stats {
      dev: 16777220,
      mode: 33188,
      nlink: 1,
      uid: 501,
      gid: 20,
      rdev: 0,
      blksize: 4096,
      ino: 14214074,
      size: 8,
      blocks: 8,
      atimeMs: 1561174616618.8555,
      mtimeMs: 1561174614584,
      ctimeMs: 1561174614583.8145,
      birthtimeMs: 1561174007710.7478,
      atime: 2019-06-22T03:36:56.619Z,
      mtime: 2019-06-22T03:36:54.584Z,
      ctime: 2019-06-22T03:36:54.584Z,
      birthtime: 2019-06-22T03:26:47.711Z
    }

`fs.statSync(path[, options])`[#](#fs_fs_statsync_path_options)
---------------------------------------------------------------

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `options` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    *   `bigint` [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Whether the numeric values in the returned [`fs.Stats`](#fs_class_fs_stats) object should be `bigint`. **Default:** `false`.
*   Returns: [<fs.Stats>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/fs.html#fs_class_fs_stats)

Synchronous [`stat(2)`](http://man7.org/linux/man-pages/man2/stat.2.html).

`fs.symlink(target, path[, type], callback)`[#](#fs_fs_symlink_target_path_type_callback)
-----------------------------------------------------------------------------------------

*   `target` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `type` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    *   `err` [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Asynchronous [`symlink(2)`](http://man7.org/linux/man-pages/man2/symlink.2.html) which creates the link called `path` pointing to `target`. No arguments other than a possible exception are given to the completion callback.

The `type` argument is only available on Windows and ignored on other platforms. It can be set to `'dir'`, `'file'`, or `'junction'`. If the `type` argument is not set, Node.js will autodetect `target` type and use `'file'` or `'dir'`. If the `target` does not exist, `'file'` will be used. Windows junction points require the destination path to be absolute. When using `'junction'`, the `target` argument will automatically be normalized to absolute path.

Relative targets are relative to the link’s parent directory.

    fs.symlink('./mew', './example/mewtwo', callback);

The above example creates a symbolic link `mewtwo` in the `example` which points to `mew` in the same directory:

    $ tree example/
    example/
    ├── mew
    └── mewtwo -> ./mew

`fs.symlinkSync(target, path[, type])`[#](#fs_fs_symlinksync_target_path_type)
------------------------------------------------------------------------------

*   `target` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `type` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Returns `undefined`.

For detailed information, see the documentation of the asynchronous version of this API: [`fs.symlink()`](#fs_fs_symlink_target_path_type_callback).

`fs.truncate(path[, len], callback)`[#](#fs_fs_truncate_path_len_callback)
--------------------------------------------------------------------------

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `len` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0`
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    *   `err` [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Asynchronous [`truncate(2)`](http://man7.org/linux/man-pages/man2/truncate.2.html). No arguments other than a possible exception are given to the completion callback. A file descriptor can also be passed as the first argument. In this case, `fs.ftruncate()` is called.

Passing a file descriptor is deprecated and may result in an error being thrown in the future.

`fs.truncateSync(path[, len])`[#](#fs_fs_truncatesync_path_len)
---------------------------------------------------------------

Added in: v0.8.6

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `len` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0`

Synchronous [`truncate(2)`](http://man7.org/linux/man-pages/man2/truncate.2.html). Returns `undefined`. A file descriptor can also be passed as the first argument. In this case, `fs.ftruncateSync()` is called.

Passing a file descriptor is deprecated and may result in an error being thrown in the future.

`fs.unlink(path, callback)`[#](#fs_fs_unlink_path_callback)
-----------------------------------------------------------

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    *   `err` [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Asynchronously removes a file or symbolic link. No arguments other than a possible exception are given to the completion callback.

    
    fs.unlink('path/file.txt', (err) => {
      if (err) throw err;
      console.log('path/file.txt was deleted');
    });

`fs.unlink()` will not work on a directory, empty or otherwise. To remove a directory, use [`fs.rmdir()`](#fs_fs_rmdir_path_options_callback).

See also: [`unlink(2)`](http://man7.org/linux/man-pages/man2/unlink.2.html).

`fs.unlinkSync(path)`[#](#fs_fs_unlinksync_path)
------------------------------------------------

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)

Synchronous [`unlink(2)`](http://man7.org/linux/man-pages/man2/unlink.2.html). Returns `undefined`.

`fs.unwatchFile(filename[, listener])`[#](#fs_fs_unwatchfile_filename_listener)
-------------------------------------------------------------------------------

Added in: v0.1.31

*   `filename` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `listener` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) Optional, a listener previously attached using `fs.watchFile()`

Stop watching for changes on `filename`. If `listener` is specified, only that particular listener is removed. Otherwise, _all_ listeners are removed, effectively stopping watching of `filename`.

Calling `fs.unwatchFile()` with a filename that is not being watched is a no-op, not an error.

Using [`fs.watch()`](#fs_fs_watch_filename_options_listener) is more efficient than `fs.watchFile()` and `fs.unwatchFile()`. `fs.watch()` should be used instead of `fs.watchFile()` and `fs.unwatchFile()` when possible.

`fs.utimes(path, atime, mtime, callback)`[#](#fs_fs_utimes_path_atime_mtime_callback)
-------------------------------------------------------------------------------------

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `atime` [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Date>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
*   `mtime` [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Date>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    *   `err` [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

Change the file system timestamps of the object referenced by `path`.

The `atime` and `mtime` arguments follow these rules:

*   Values can be either numbers representing Unix epoch time in seconds, `Date`s, or a numeric string like `'123456789.0'`.
*   If the value can not be converted to a number, or is `NaN`, `Infinity` or `-Infinity`, an `Error` will be thrown.

`fs.utimesSync(path, atime, mtime)`[#](#fs_fs_utimessync_path_atime_mtime)
--------------------------------------------------------------------------

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `atime` [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Date>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
*   `mtime` [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Date>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

Returns `undefined`.

For detailed information, see the documentation of the asynchronous version of this API: [`fs.utimes()`](#fs_fs_utimes_path_atime_mtime_callback).

`fs.watch(filename[, options][, listener])`[#](#fs_fs_watch_filename_options_listener)
--------------------------------------------------------------------------------------

*   `filename` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `options` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    *   `persistent` [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Indicates whether the process should continue to run as long as files are being watched. **Default:** `true`.
    *   `recursive` [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Indicates whether all subdirectories should be watched, or only the current directory. This applies when a directory is specified, and only on supported platforms (See [Caveats](#fs_caveats)). **Default:** `false`.
    *   `encoding` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) Specifies the character encoding to be used for the filename passed to the listener. **Default:** `'utf8'`.
*   `listener` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) | [<undefined>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Undefined_type) **Default:** `undefined`
    *   `eventType` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
    *   `filename` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer)
*   Returns: [<fs.FSWatcher>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/fs.html#fs_class_fs_fswatcher)

Watch for changes on `filename`, where `filename` is either a file or a directory.

The second argument is optional. If `options` is provided as a string, it specifies the `encoding`. Otherwise `options` should be passed as an object.

The listener callback gets two arguments `(eventType, filename)`. `eventType` is either `'rename'` or `'change'`, and `filename` is the name of the file which triggered the event.

On most platforms, `'rename'` is emitted whenever a filename appears or disappears in the directory.

The listener callback is attached to the `'change'` event fired by [`fs.FSWatcher`](#fs_class_fs_fswatcher), but it is not the same thing as the `'change'` value of `eventType`.

### Caveats[#](#fs_caveats)

The `fs.watch` API is not 100% consistent across platforms, and is unavailable in some situations.

The recursive option is only supported on macOS and Windows. An `ERR_FEATURE_UNAVAILABLE_ON_PLATFORM` exception will be thrown when the option is used on a platform that does not support it.

On Windows, no events will be emitted if the watched directory is moved or renamed. An `EPERM` error is reported when the watched directory is deleted.

#### Availability[#](#fs_availability)

This feature depends on the underlying operating system providing a way to be notified of filesystem changes.

*   On Linux systems, this uses [`inotify(7)`](https://man7.org/linux/man-pages/man7/inotify.7.html).
*   On BSD systems, this uses [`kqueue(2)`](https://www.freebsd.org/cgi/man.cgi?query=kqueue&sektion=2).
*   On macOS, this uses [`kqueue(2)`](https://www.freebsd.org/cgi/man.cgi?query=kqueue&sektion=2) for files and [`FSEvents`](https://developer.apple.com/documentation/coreservices/file_system_events) for directories.
*   On SunOS systems (including Solaris and SmartOS), this uses [`event ports`](https://illumos.org/man/port_create).
*   On Windows systems, this feature depends on [`ReadDirectoryChangesW`](https://docs.microsoft.com/en-us/windows/desktop/api/winbase/nf-winbase-readdirectorychangesw).
*   On Aix systems, this feature depends on [`AHAFS`](https://www.ibm.com/developerworks/aix/library/au-aix_event_infrastructure/), which must be enabled.
*   On IBM i systems, this feature is not supported.

If the underlying functionality is not available for some reason, then `fs.watch()` will not be able to function and may thrown an exception. For example, watching files or directories can be unreliable, and in some cases impossible, on network file systems (NFS, SMB, etc) or host file systems when using virtualization software such as Vagrant or Docker.

It is still possible to use `fs.watchFile()`, which uses stat polling, but this method is slower and less reliable.

#### Inodes[#](#fs_inodes)

On Linux and macOS systems, `fs.watch()` resolves the path to an [inode](https://en.wikipedia.org/wiki/Inode) and watches the inode. If the watched path is deleted and recreated, it is assigned a new inode. The watch will emit an event for the delete but will continue watching the _original_ inode. Events for the new inode will not be emitted. This is expected behavior.

AIX files retain the same inode for the lifetime of a file. Saving and closing a watched file on AIX will result in two notifications (one for adding new content, and one for truncation).

#### Filename argument[#](#fs_filename_argument)

Providing `filename` argument in the callback is only supported on Linux, macOS, Windows, and AIX. Even on supported platforms, `filename` is not always guaranteed to be provided. Therefore, don't assume that `filename` argument is always provided in the callback, and have some fallback logic if it is `null`.

    fs.watch('somedir', (eventType, filename) => {
      console.log(`event type is: ${eventType}`);
      if (filename) {
        console.log(`filename provided: ${filename}`);
      } else {
        console.log('filename not provided');
      }
    });

`fs.watchFile(filename[, options], listener)`[#](#fs_fs_watchfile_filename_options_listener)
--------------------------------------------------------------------------------------------

*   `filename` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `options` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    *   `bigint` [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) **Default:** `false`
    *   `persistent` [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) **Default:** `true`
    *   `interval` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `5007`
*   `listener` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    *   `current` [<fs.Stats>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/fs.html#fs_class_fs_stats)
    *   `previous` [<fs.Stats>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/fs.html#fs_class_fs_stats)
*   Returns: [<fs.StatWatcher>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/fs.html#fs_class_fs_statwatcher)

Watch for changes on `filename`. The callback `listener` will be called each time the file is accessed.

The `options` argument may be omitted. If provided, it should be an object. The `options` object may contain a boolean named `persistent` that indicates whether the process should continue to run as long as files are being watched. The `options` object may specify an `interval` property indicating how often the target should be polled in milliseconds.

The `listener` gets two arguments the current stat object and the previous stat object:

    fs.watchFile('message.text', (curr, prev) => {
      console.log(`the current mtime is: ${curr.mtime}`);
      console.log(`the previous mtime was: ${prev.mtime}`);
    });

These stat objects are instances of `fs.Stat`. If the `bigint` option is `true`, the numeric values in these objects are specified as `BigInt`s.

To be notified when the file was modified, not just accessed, it is necessary to compare `curr.mtime` and `prev.mtime`.

When an `fs.watchFile` operation results in an `ENOENT` error, it will invoke the listener once, with all the fields zeroed (or, for dates, the Unix Epoch). If the file is created later on, the listener will be called again, with the latest stat objects. This is a change in functionality since v0.10.

Using [`fs.watch()`](#fs_fs_watch_filename_options_listener) is more efficient than `fs.watchFile` and `fs.unwatchFile`. `fs.watch` should be used instead of `fs.watchFile` and `fs.unwatchFile` when possible.

When a file being watched by `fs.watchFile()` disappears and reappears, then the contents of `previous` in the second callback event (the file's reappearance) will be the same as the contents of `previous` in the first callback event (its disappearance).

This happens when:

*   the file is deleted, followed by a restore
*   the file is renamed and then renamed a second time back to its original name

`fs.write(fd, buffer[, offset[, length[, position]]], callback)`[#](#fs_fs_write_fd_buffer_offset_length_position_callback)
---------------------------------------------------------------------------------------------------------------------------

*   `fd` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `buffer` [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<TypedArray>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [<DataView>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) | [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
*   `offset` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `length` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `position` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    *   `err` [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
    *   `bytesWritten` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
    *   `buffer` [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<TypedArray>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [<DataView>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)

Write `buffer` to the file specified by `fd`. If `buffer` is a normal object, it must have an own `toString` function property.

`offset` determines the part of the buffer to be written, and `length` is an integer specifying the number of bytes to write.

`position` refers to the offset from the beginning of the file where this data should be written. If `typeof position !== 'number'`, the data will be written at the current position. See [`pwrite(2)`](http://man7.org/linux/man-pages/man2/pwrite.2.html).

The callback will be given three arguments `(err, bytesWritten, buffer)` where `bytesWritten` specifies how many _bytes_ were written from `buffer`.

If this method is invoked as its [`util.promisify()`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/util.html#util_util_promisify_original)ed version, it returns a `Promise` for an `Object` with `bytesWritten` and `buffer` properties.

It is unsafe to use `fs.write()` multiple times on the same file without waiting for the callback. For this scenario, [`fs.createWriteStream()`](#fs_fs_createwritestream_path_options) is recommended.

On Linux, positional writes don't work when the file is opened in append mode. The kernel ignores the position argument and always appends the data to the end of the file.

`fs.write(fd, string[, position[, encoding]], callback)`[#](#fs_fs_write_fd_string_position_encoding_callback)
--------------------------------------------------------------------------------------------------------------

*   `fd` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `string` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
*   `position` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `encoding` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) **Default:** `'utf8'`
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    *   `err` [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
    *   `written` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
    *   `string` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)

Write `string` to the file specified by `fd`. If `string` is not a string, or an object with an own `toString` function property, then an exception is thrown.

`position` refers to the offset from the beginning of the file where this data should be written. If `typeof position !== 'number'` the data will be written at the current position. See [`pwrite(2)`](http://man7.org/linux/man-pages/man2/pwrite.2.html).

`encoding` is the expected string encoding.

The callback will receive the arguments `(err, written, string)` where `written` specifies how many _bytes_ the passed string required to be written. Bytes written is not necessarily the same as string characters written. See [`Buffer.byteLength`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_static_method_buffer_bytelength_string_encoding).

It is unsafe to use `fs.write()` multiple times on the same file without waiting for the callback. For this scenario, [`fs.createWriteStream()`](#fs_fs_createwritestream_path_options) is recommended.

On Linux, positional writes don't work when the file is opened in append mode. The kernel ignores the position argument and always appends the data to the end of the file.

On Windows, if the file descriptor is connected to the console (e.g. `fd == 1` or `stdout`) a string containing non-ASCII characters will not be rendered properly by default, regardless of the encoding used. It is possible to configure the console to render UTF-8 properly by changing the active codepage with the `chcp 65001` command. See the [chcp](https://ss64.com/nt/chcp.html) docs for more details.

`fs.writeFile(file, data[, options], callback)`[#](#fs_fs_writefile_file_data_options_callback)
-----------------------------------------------------------------------------------------------

*   `file` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api) | [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) filename or file descriptor
*   `data` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<TypedArray>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [<DataView>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) | [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
*   `options` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
    *   `encoding` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<null>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `'utf8'`
    *   `mode` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0o666`
    *   `flag` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) See [support of file system `flags`](#fs_file_system_flags). **Default:** `'w'`.
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    *   `err` [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

When `file` is a filename, asynchronously writes data to the file, replacing the file if it already exists. `data` can be a string or a buffer.

When `file` is a file descriptor, the behavior is similar to calling `fs.write()` directly (which is recommended). See the notes below on using a file descriptor.

The `encoding` option is ignored if `data` is a buffer. If `data` is a normal object, it must have an own `toString` function property.

    const data = new Uint8Array(Buffer.from('Hello Node.js'));
    fs.writeFile('message.txt', data, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });

If `options` is a string, then it specifies the encoding:

    fs.writeFile('message.txt', 'Hello Node.js', 'utf8', callback);

It is unsafe to use `fs.writeFile()` multiple times on the same file without waiting for the callback. For this scenario, [`fs.createWriteStream()`](#fs_fs_createwritestream_path_options) is recommended.

### Using `fs.writeFile()` with file descriptors[#](#fs_using_fs_writefile_with_file_descriptors)

When `file` is a file descriptor, the behavior is almost identical to directly calling `fs.write()` like:

    fs.write(fd, Buffer.from(data, options.encoding), callback);

The difference from directly calling `fs.write()` is that under some unusual conditions, `fs.write()` may write only part of the buffer and will need to be retried to write the remaining data, whereas `fs.writeFile()` will retry until the data is entirely written (or an error occurs).

The implications of this are a common source of confusion. In the file descriptor case, the file is not replaced! The data is not necessarily written to the beginning of the file, and the file's original data may remain before and/or after the newly written data.

For example, if `fs.writeFile()` is called twice in a row, first to write the string `'Hello'`, then to write the string `', World'`, the file would contain `'Hello, World'`, and might contain some of the file's original data (depending on the size of the original file, and the position of the file descriptor). If a file name had been used instead of a descriptor, the file would be guaranteed to contain only `', World'`.

`fs.writeFileSync(file, data[, options])`[#](#fs_fs_writefilesync_file_data_options)
------------------------------------------------------------------------------------

*   `file` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api) | [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) filename or file descriptor
*   `data` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<TypedArray>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [<DataView>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) | [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
*   `options` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
    *   `encoding` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<null>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `'utf8'`
    *   `mode` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0o666`
    *   `flag` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) See [support of file system `flags`](#fs_file_system_flags). **Default:** `'w'`.

Returns `undefined`.

For detailed information, see the documentation of the asynchronous version of this API: [`fs.writeFile()`](#fs_fs_writefile_file_data_options_callback).

`fs.writeSync(fd, buffer[, offset[, length[, position]]])`[#](#fs_fs_writesync_fd_buffer_offset_length_position)
----------------------------------------------------------------------------------------------------------------

*   `fd` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `buffer` [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<TypedArray>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) | [<DataView>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) | [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
*   `offset` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `length` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `position` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   Returns: [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The number of bytes written.

For detailed information, see the documentation of the asynchronous version of this API: [`fs.write(fd, buffer...)`](#fs_fs_write_fd_buffer_offset_length_position_callback).

`fs.writeSync(fd, string[, position[, encoding]])`[#](#fs_fs_writesync_fd_string_position_encoding)
---------------------------------------------------------------------------------------------------

*   `fd` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `string` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
*   `position` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `encoding` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
*   Returns: [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The number of bytes written.

For detailed information, see the documentation of the asynchronous version of this API: [`fs.write(fd, string...)`](#fs_fs_write_fd_string_position_encoding_callback).

`fs.writev(fd, buffers[, position], callback)`[#](#fs_fs_writev_fd_buffers_position_callback)
---------------------------------------------------------------------------------------------

Added in: v12.9.0

*   `fd` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `buffers` [<ArrayBufferView\[\]>](https://developer.mozilla.org/en-US/docs/Web/API/ArrayBufferView)
*   `position` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `callback` [<Function>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)
    *   `err` [<Error>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
    *   `bytesWritten` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
    *   `buffers` [<ArrayBufferView\[\]>](https://developer.mozilla.org/en-US/docs/Web/API/ArrayBufferView)

Write an array of `ArrayBufferView`s to the file specified by `fd` using `writev()`.

`position` is the offset from the beginning of the file where this data should be written. If `typeof position !== 'number'`, the data will be written at the current position.

The callback will be given three arguments: `err`, `bytesWritten`, and `buffers`. `bytesWritten` is how many bytes were written from `buffers`.

If this method is [`util.promisify()`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/util.html#util_util_promisify_original)ed, it returns a `Promise` for an `Object` with `bytesWritten` and `buffers` properties.

It is unsafe to use `fs.writev()` multiple times on the same file without waiting for the callback. For this scenario, use [`fs.createWriteStream()`](#fs_fs_createwritestream_path_options).

On Linux, positional writes don't work when the file is opened in append mode. The kernel ignores the position argument and always appends the data to the end of the file.

`fs.writevSync(fd, buffers[, position])`[#](#fs_fs_writevsync_fd_buffers_position)
----------------------------------------------------------------------------------

Added in: v12.9.0

*   `fd` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `buffers` [<ArrayBufferView\[\]>](https://developer.mozilla.org/en-US/docs/Web/API/ArrayBufferView)
*   `position` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   Returns: [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The number of bytes written.

For detailed information, see the documentation of the asynchronous version of this API: [`fs.writev()`](#fs_fs_writev_fd_buffers_position_callback).

`fs` Promises API[#](#fs_fs_promises_api)
-----------------------------------------

The `fs.promises` API provides an alternative set of asynchronous file system methods that return `Promise` objects rather than using callbacks. The API is accessible via `require('fs').promises` or `require('fs/promises')`.

### Class: `FileHandle`[#](#fs_class_filehandle)

Added in: v10.0.0

A `FileHandle` object is a wrapper for a numeric file descriptor. Instances of `FileHandle` are distinct from numeric file descriptors in that they provide an object oriented API for working with files.

If a `FileHandle` is not closed using the `filehandle.close()` method, it might automatically close the file descriptor and will emit a process warning, thereby helping to prevent memory leaks. Please do not rely on this behavior because it is unreliable and the file may not be closed. Instead, always explicitly close `FileHandle`s. Node.js may change this behavior in the future.

Instances of the `FileHandle` object are created internally by the `fsPromises.open()` method.

Unlike the callback-based API (`fs.fstat()`, `fs.fchown()`, `fs.fchmod()`, and so on), a numeric file descriptor is not used by the promise-based API. Instead, the promise-based API uses the `FileHandle` class in order to help avoid accidental leaking of unclosed file descriptors after a `Promise` is resolved or rejected.

#### `filehandle.appendFile(data, options)`[#](#fs_filehandle_appendfile_data_options)

Added in: v10.0.0

*   `data` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer)
*   `options` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
    *   `encoding` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<null>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `'utf8'`
*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Alias of [`filehandle.writeFile()`](#fs_filehandle_writefile_data_options).

When operating on file handles, the mode cannot be changed from what it was set to with [`fsPromises.open()`](#fs_fspromises_open_path_flags_mode). Therefore, this is equivalent to [`filehandle.writeFile()`](#fs_filehandle_writefile_data_options).

#### `filehandle.chmod(mode)`[#](#fs_filehandle_chmod_mode)

Added in: v10.0.0

*   `mode` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Modifies the permissions on the file. The `Promise` is resolved with no arguments upon success.

#### `filehandle.chown(uid, gid)`[#](#fs_filehandle_chown_uid_gid)

Added in: v10.0.0

*   `uid` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `gid` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Changes the ownership of the file then resolves the `Promise` with no arguments upon success.

#### `filehandle.close()`[#](#fs_filehandle_close)

Added in: v10.0.0

*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) A `Promise` that will be resolved once the underlying file descriptor is closed, or will be rejected if an error occurs while closing.

Closes the file handle after waiting for any pending operation on the handle to complete.

    const fsPromises = require('fs').promises;
    async function openAndClose() {
      let filehandle;
      try {
        filehandle = await fsPromises.open('thefile.txt', 'r');
      } finally {
        if (filehandle !== undefined)
          await filehandle.close();
      }
    }

#### `filehandle.datasync()`[#](#fs_filehandle_datasync)

Added in: v10.0.0

*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Asynchronous [`fdatasync(2)`](http://man7.org/linux/man-pages/man2/fdatasync.2.html). The `Promise` is resolved with no arguments upon success.

#### `filehandle.fd`[#](#fs_filehandle_fd)

Added in: v10.0.0

*   [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The numeric file descriptor managed by the `FileHandle` object.

#### `filehandle.read(buffer, offset, length, position)`[#](#fs_filehandle_read_buffer_offset_length_position)

Added in: v10.0.0

*   `buffer` [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<Uint8Array>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
*   `offset` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `length` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `position` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Read data from the file.

`buffer` is the buffer that the data will be written to.

`offset` is the offset in the buffer to start writing at.

`length` is an integer specifying the number of bytes to read.

`position` is an argument specifying where to begin reading from in the file. If `position` is `null`, data will be read from the current file position, and the file position will be updated. If `position` is an integer, the file position will remain unchanged.

Following successful read, the `Promise` is resolved with an object with a `bytesRead` property specifying the number of bytes read, and a `buffer` property that is a reference to the passed in `buffer` argument.

If the file is not modified concurrently, the end-of-file is reached when the number of bytes read is zero.

#### `filehandle.read(options)`[#](#fs_filehandle_read_options)

Added in: v13.11.0

*   `options` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    *   `buffer` [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<Uint8Array>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) **Default:** `Buffer.alloc(16384)`
    *   `offset` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0`
    *   `length` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `buffer.length`
    *   `position` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `null`
*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

#### `filehandle.readFile(options)`[#](#fs_filehandle_readfile_options)

Added in: v10.0.0

*   `options` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
    *   `encoding` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<null>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `null`
*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Asynchronously reads the entire contents of a file.

The `Promise` is resolved with the contents of the file. If no encoding is specified (using `options.encoding`), the data is returned as a `Buffer` object. Otherwise, the data will be a string.

If `options` is a string, then it specifies the encoding.

The `FileHandle` has to support reading.

If one or more `filehandle.read()` calls are made on a file handle and then a `filehandle.readFile()` call is made, the data will be read from the current position till the end of the file. It doesn't always read from the beginning of the file.

#### `filehandle.readv(buffers[, position])`[#](#fs_filehandle_readv_buffers_position)

Added in: v14.0.0

*   `buffers` [<ArrayBufferView\[\]>](https://developer.mozilla.org/en-US/docs/Web/API/ArrayBufferView)
*   `position` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Read from a file and write to an array of `ArrayBufferView`s

The `Promise` is resolved with an object containing a `bytesRead` property identifying the number of bytes read, and a `buffers` property containing a reference to the `buffers` input.

`position` is the offset from the beginning of the file where this data should be read from. If `typeof position !== 'number'`, the data will be read from the current position.

#### `filehandle.stat([options])`[#](#fs_filehandle_stat_options)

*   `options` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    *   `bigint` [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Whether the numeric values in the returned [`fs.Stats`](#fs_class_fs_stats) object should be `bigint`. **Default:** `false`.
*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Retrieves the [`fs.Stats`](#fs_class_fs_stats) for the file.

#### `filehandle.sync()`[#](#fs_filehandle_sync)

Added in: v10.0.0

*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Asynchronous [`fsync(2)`](http://man7.org/linux/man-pages/man2/fsync.2.html). The `Promise` is resolved with no arguments upon success.

#### `filehandle.truncate(len)`[#](#fs_filehandle_truncate_len)

Added in: v10.0.0

*   `len` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0`
*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Truncates the file then resolves the `Promise` with no arguments upon success.

If the file was larger than `len` bytes, only the first `len` bytes will be retained in the file.

For example, the following program retains only the first four bytes of the file:

    const fs = require('fs');
    const fsPromises = fs.promises;
    
    console.log(fs.readFileSync('temp.txt', 'utf8'));
    
    
    async function doTruncate() {
      let filehandle = null;
      try {
        filehandle = await fsPromises.open('temp.txt', 'r+');
        await filehandle.truncate(4);
      } finally {
        if (filehandle) {
          
          await filehandle.close();
        }
      }
      console.log(fs.readFileSync('temp.txt', 'utf8'));  
    }
    
    doTruncate().catch(console.error);

If the file previously was shorter than `len` bytes, it is extended, and the extended part is filled with null bytes (`'\0'`):

    const fs = require('fs');
    const fsPromises = fs.promises;
    
    console.log(fs.readFileSync('temp.txt', 'utf8'));
    
    
    async function doTruncate() {
      let filehandle = null;
      try {
        filehandle = await fsPromises.open('temp.txt', 'r+');
        await filehandle.truncate(10);
      } finally {
        if (filehandle) {
          
          await filehandle.close();
        }
      }
      console.log(fs.readFileSync('temp.txt', 'utf8'));  
    }
    
    doTruncate().catch(console.error);

The last three bytes are null bytes (`'\0'`), to compensate the over-truncation.

#### `filehandle.utimes(atime, mtime)`[#](#fs_filehandle_utimes_atime_mtime)

Added in: v10.0.0

*   `atime` [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Date>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
*   `mtime` [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Date>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Change the file system timestamps of the object referenced by the `FileHandle` then resolves the `Promise` with no arguments upon success.

This function does not work on AIX versions before 7.1, it will resolve the `Promise` with an error using code `UV_ENOSYS`.

#### `filehandle.write(buffer[, offset[, length[, position]]])`[#](#fs_filehandle_write_buffer_offset_length_position)

*   `buffer` [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<Uint8Array>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) | [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
*   `offset` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `length` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `position` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Write `buffer` to the file.

The `Promise` is resolved with an object containing a `bytesWritten` property identifying the number of bytes written, and a `buffer` property containing a reference to the `buffer` written.

`offset` determines the part of the buffer to be written, and `length` is an integer specifying the number of bytes to write.

`position` refers to the offset from the beginning of the file where this data should be written. If `typeof position !== 'number'`, the data will be written at the current position. See [`pwrite(2)`](http://man7.org/linux/man-pages/man2/pwrite.2.html).

It is unsafe to use `filehandle.write()` multiple times on the same file without waiting for the `Promise` to be resolved (or rejected). For this scenario, use [`fs.createWriteStream()`](#fs_fs_createwritestream_path_options).

On Linux, positional writes do not work when the file is opened in append mode. The kernel ignores the position argument and always appends the data to the end of the file.

#### `filehandle.write(string[, position[, encoding]])`[#](#fs_filehandle_write_string_position_encoding)

*   `string` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
*   `position` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `encoding` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) **Default:** `'utf8'`
*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Write `string` to the file. If `string` is not a string, or an object with an own `toString` function property, then an exception is thrown.

The `Promise` is resolved with an object containing a `bytesWritten` property identifying the number of bytes written, and a `buffer` property containing a reference to the `string` written.

`position` refers to the offset from the beginning of the file where this data should be written. If the type of `position` is not a `number` the data will be written at the current position. See [`pwrite(2)`](http://man7.org/linux/man-pages/man2/pwrite.2.html).

`encoding` is the expected string encoding.

It is unsafe to use `filehandle.write()` multiple times on the same file without waiting for the `Promise` to be resolved (or rejected). For this scenario, use [`fs.createWriteStream()`](#fs_fs_createwritestream_path_options).

On Linux, positional writes do not work when the file is opened in append mode. The kernel ignores the position argument and always appends the data to the end of the file.

#### `filehandle.writeFile(data, options)`[#](#fs_filehandle_writefile_data_options)

*   `data` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<Uint8Array>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) | [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
*   `options` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
    *   `encoding` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<null>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `'utf8'`
*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Asynchronously writes data to a file, replacing the file if it already exists. `data` can be a string, a buffer, or an object with an own `toString` function property. The `Promise` is resolved with no arguments upon success.

The `encoding` option is ignored if `data` is a buffer.

If `options` is a string, then it specifies the encoding.

The `FileHandle` has to support writing.

It is unsafe to use `filehandle.writeFile()` multiple times on the same file without waiting for the `Promise` to be resolved (or rejected).

If one or more `filehandle.write()` calls are made on a file handle and then a `filehandle.writeFile()` call is made, the data will be written from the current position till the end of the file. It doesn't always write from the beginning of the file.

#### `filehandle.writev(buffers[, position])`[#](#fs_filehandle_writev_buffers_position)

Added in: v12.9.0

*   `buffers` [<ArrayBufferView\[\]>](https://developer.mozilla.org/en-US/docs/Web/API/ArrayBufferView)
*   `position` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Write an array of `ArrayBufferView`s to the file.

The `Promise` is resolved with an object containing a `bytesWritten` property identifying the number of bytes written, and a `buffers` property containing a reference to the `buffers` input.

`position` is the offset from the beginning of the file where this data should be written. If `typeof position !== 'number'`, the data will be written at the current position.

It is unsafe to call `writev()` multiple times on the same file without waiting for the previous operation to complete.

On Linux, positional writes don't work when the file is opened in append mode. The kernel ignores the position argument and always appends the data to the end of the file.

### `fsPromises.access(path[, mode])`[#](#fs_fspromises_access_path_mode)

Added in: v10.0.0

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `mode` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `fs.constants.F_OK`
*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Tests a user's permissions for the file or directory specified by `path`. The `mode` argument is an optional integer that specifies the accessibility checks to be performed. Check [File access constants](#fs_file_access_constants) for possible values of `mode`. It is possible to create a mask consisting of the bitwise OR of two or more values (e.g. `fs.constants.W_OK | fs.constants.R_OK`).

If the accessibility check is successful, the `Promise` is resolved with no value. If any of the accessibility checks fail, the `Promise` is rejected with an `Error` object. The following example checks if the file `/etc/passwd` can be read and written by the current process.

    const fs = require('fs');
    const fsPromises = fs.promises;
    
    fsPromises.access('/etc/passwd', fs.constants.R_OK | fs.constants.W_OK)
      .then(() => console.log('can access'))
      .catch(() => console.error('cannot access'));

Using `fsPromises.access()` to check for the accessibility of a file before calling `fsPromises.open()` is not recommended. Doing so introduces a race condition, since other processes may change the file's state between the two calls. Instead, user code should open/read/write the file directly and handle the error raised if the file is not accessible.

### `fsPromises.appendFile(path, data[, options])`[#](#fs_fspromises_appendfile_path_data_options)

Added in: v10.0.0

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api) | [<FileHandle>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/fs.html#fs_class_filehandle) filename or `FileHandle`
*   `data` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer)
*   `options` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
    *   `encoding` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<null>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `'utf8'`
    *   `mode` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0o666`
    *   `flag` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) See [support of file system `flags`](#fs_file_system_flags). **Default:** `'a'`.
*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Asynchronously append data to a file, creating the file if it does not yet exist. `data` can be a string or a [`Buffer`](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_buffer). The `Promise` will be resolved with no arguments upon success.

If `options` is a string, then it specifies the encoding.

The `path` may be specified as a `FileHandle` that has been opened for appending (using `fsPromises.open()`).

### `fsPromises.chmod(path, mode)`[#](#fs_fspromises_chmod_path_mode)

Added in: v10.0.0

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `mode` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Changes the permissions of a file then resolves the `Promise` with no arguments upon succces.

### `fsPromises.chown(path, uid, gid)`[#](#fs_fspromises_chown_path_uid_gid)

Added in: v10.0.0

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `uid` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `gid` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Changes the ownership of a file then resolves the `Promise` with no arguments upon success.

### `fsPromises.copyFile(src, dest[, mode])`[#](#fs_fspromises_copyfile_src_dest_mode)

*   `src` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api) source filename to copy
*   `dest` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api) destination filename of the copy operation
*   `mode` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) modifiers for copy operation. **Default:** `0`.
*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Asynchronously copies `src` to `dest`. By default, `dest` is overwritten if it already exists. The `Promise` will be resolved with no arguments upon success.

Node.js makes no guarantees about the atomicity of the copy operation. If an error occurs after the destination file has been opened for writing, Node.js will attempt to remove the destination.

`mode` is an optional integer that specifies the behavior of the copy operation. It is possible to create a mask consisting of the bitwise OR of two or more values (e.g. `fs.constants.COPYFILE_EXCL | fs.constants.COPYFILE_FICLONE`).

*   `fs.constants.COPYFILE_EXCL`: The copy operation will fail if `dest` already exists.
*   `fs.constants.COPYFILE_FICLONE`: The copy operation will attempt to create a copy-on-write reflink. If the platform does not support copy-on-write, then a fallback copy mechanism is used.
*   `fs.constants.COPYFILE_FICLONE_FORCE`: The copy operation will attempt to create a copy-on-write reflink. If the platform does not support copy-on-write, then the operation will fail.

    const {
      promises: fsPromises,
      constants: {
        COPYFILE_EXCL
      }
    } = require('fs');
    
    
    fsPromises.copyFile('source.txt', 'destination.txt')
      .then(() => console.log('source.txt was copied to destination.txt'))
      .catch(() => console.log('The file could not be copied'));
    
    
    fsPromises.copyFile('source.txt', 'destination.txt', COPYFILE_EXCL)
      .then(() => console.log('source.txt was copied to destination.txt'))
      .catch(() => console.log('The file could not be copied'));

### `fsPromises.lchmod(path, mode)`[#](#fs_fspromises_lchmod_path_mode)

Deprecated since: v10.0.0

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `mode` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Changes the permissions on a symbolic link then resolves the `Promise` with no arguments upon success. This method is only implemented on macOS.

### `fsPromises.lchown(path, uid, gid)`[#](#fs_fspromises_lchown_path_uid_gid)

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `uid` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   `gid` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Changes the ownership on a symbolic link then resolves the `Promise` with no arguments upon success.

### `fsPromises.lutimes(path, atime, mtime)`[#](#fs_fspromises_lutimes_path_atime_mtime)

Added in: v14.5.0

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `atime` [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Date>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
*   `mtime` [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Date>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Changes the access and modification times of a file in the same way as [`fsPromises.utimes()`](#fs_fspromises_utimes_path_atime_mtime), with the difference that if the path refers to a symbolic link, then the link is not dereferenced: instead, the timestamps of the symbolic link itself are changed.

Upon success, the `Promise` is resolved without arguments.

### `fsPromises.link(existingPath, newPath)`[#](#fs_fspromises_link_existingpath_newpath)

Added in: v10.0.0

*   `existingPath` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `newPath` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Asynchronous [`link(2)`](http://man7.org/linux/man-pages/man2/link.2.html). The `Promise` is resolved with no arguments upon success.

### `fsPromises.lstat(path[, options])`[#](#fs_fspromises_lstat_path_options)

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `options` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    *   `bigint` [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Whether the numeric values in the returned [`fs.Stats`](#fs_class_fs_stats) object should be `bigint`. **Default:** `false`.
*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Asynchronous [`lstat(2)`](http://man7.org/linux/man-pages/man2/lstat.2.html). The `Promise` is resolved with the [`fs.Stats`](#fs_class_fs_stats) object for the given symbolic link `path`.

### `fsPromises.mkdir(path[, options])`[#](#fs_fspromises_mkdir_path_options)

Added in: v10.0.0

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `options` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type)
    *   `recursive` [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) **Default:** `false`
    *   `mode` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Not supported on Windows. **Default:** `0o777`.
*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Asynchronously creates a directory then resolves the `Promise` with either no arguments, or the first directory path created if `recursive` is `true`.

The optional `options` argument can be an integer specifying `mode` (permission and sticky bits), or an object with a `mode` property and a `recursive` property indicating whether parent directories should be created. Calling `fsPromises.mkdir()` when `path` is a directory that exists results in a rejection only when `recursive` is false.

### `fsPromises.mkdtemp(prefix[, options])`[#](#fs_fspromises_mkdtemp_prefix_options)

Added in: v10.0.0

*   `prefix` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
*   `options` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    *   `encoding` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) **Default:** `'utf8'`
*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Creates a unique temporary directory and resolves the `Promise` with the created directory path. A unique directory name is generated by appending six random characters to the end of the provided `prefix`. Due to platform inconsistencies, avoid trailing `X` characters in `prefix`. Some platforms, notably the BSDs, can return more than six random characters, and replace trailing `X` characters in `prefix` with random characters.

The optional `options` argument can be a string specifying an encoding, or an object with an `encoding` property specifying the character encoding to use.

    fsPromises.mkdtemp(path.join(os.tmpdir(), 'foo-'))
      .catch(console.error);

The `fsPromises.mkdtemp()` method will append the six randomly selected characters directly to the `prefix` string. For instance, given a directory `/tmp`, if the intention is to create a temporary directory _within_ `/tmp`, the `prefix` must end with a trailing platform-specific path separator (`require('path').sep`).

### `fsPromises.open(path, flags[, mode])`[#](#fs_fspromises_open_path_flags_mode)

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `flags` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) See [support of file system `flags`](#fs_file_system_flags). **Default:** `'r'`.
*   `mode` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0o666` (readable and writable)
*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Asynchronous file open that returns a `Promise` that, when resolved, yields a `FileHandle` object. See [`open(2)`](http://man7.org/linux/man-pages/man2/open.2.html).

`mode` sets the file mode (permission and sticky bits), but only if the file was created.

Some characters (`< > : " / \ | ? *`) are reserved under Windows as documented by [Naming Files, Paths, and Namespaces](https://docs.microsoft.com/en-us/windows/desktop/FileIO/naming-a-file). Under NTFS, if the filename contains a colon, Node.js will open a file system stream, as described by [this MSDN page](https://docs.microsoft.com/en-us/windows/desktop/FileIO/using-streams).

### `fsPromises.opendir(path[, options])`[#](#fs_fspromises_opendir_path_options)

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `options` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    *   `encoding` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<null>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `'utf8'`
    *   `bufferSize` [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) Number of directory entries that are buffered internally when reading from the directory. Higher values lead to better performance but higher memory usage. **Default:** `32`
*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) containing [<fs.Dir>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/fs.html#fs_class_fs_dir)

Asynchronously open a directory. See [`opendir(3)`](http://man7.org/linux/man-pages/man3/opendir.3.html).

Creates an [`fs.Dir`](#fs_class_fs_dir), which contains all further functions for reading from and cleaning up the directory.

The `encoding` option sets the encoding for the `path` while opening the directory and subsequent read operations.

Example using async iteration:

    const fs = require('fs');
    
    async function print(path) {
      const dir = await fs.promises.opendir(path);
      for await (const dirent of dir) {
        console.log(dirent.name);
      }
    }
    print('./').catch(console.error);

### `fsPromises.readdir(path[, options])`[#](#fs_fspromises_readdir_path_options)

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `options` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    *   `encoding` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) **Default:** `'utf8'`
    *   `withFileTypes` [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) **Default:** `false`
*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Reads the contents of a directory then resolves the `Promise` with an array of the names of the files in the directory excluding `'.'` and `'..'`.

The optional `options` argument can be a string specifying an encoding, or an object with an `encoding` property specifying the character encoding to use for the filenames. If the `encoding` is set to `'buffer'`, the filenames returned will be passed as `Buffer` objects.

If `options.withFileTypes` is set to `true`, the resolved array will contain [`fs.Dirent`](#fs_class_fs_dirent) objects.

    const fs = require('fs');
    
    async function print(path) {
      const files = await fs.promises.readdir(path);
      for (const file of files) {
        console.log(file);
      }
    }
    print('./').catch(console.error);

### `fsPromises.readFile(path[, options])`[#](#fs_fspromises_readfile_path_options)

Added in: v10.0.0

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api) | [<FileHandle>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/fs.html#fs_class_filehandle) filename or `FileHandle`
*   `options` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
    *   `encoding` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<null>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `null`
    *   `flag` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) See [support of file system `flags`](#fs_file_system_flags). **Default:** `'r'`.
*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Asynchronously reads the entire contents of a file.

The `Promise` is resolved with the contents of the file. If no encoding is specified (using `options.encoding`), the data is returned as a `Buffer` object. Otherwise, the data will be a string.

If `options` is a string, then it specifies the encoding.

When the `path` is a directory, the behavior of `fsPromises.readFile()` is platform-specific. On macOS, Linux, and Windows, the promise will be rejected with an error. On FreeBSD, a representation of the directory's contents will be returned.

Any specified `FileHandle` has to support reading.

### `fsPromises.readlink(path[, options])`[#](#fs_fspromises_readlink_path_options)

Added in: v10.0.0

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `options` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    *   `encoding` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) **Default:** `'utf8'`
*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Asynchronous [`readlink(2)`](http://man7.org/linux/man-pages/man2/readlink.2.html). The `Promise` is resolved with the `linkString` upon success.

The optional `options` argument can be a string specifying an encoding, or an object with an `encoding` property specifying the character encoding to use for the link path returned. If the `encoding` is set to `'buffer'`, the link path returned will be passed as a `Buffer` object.

### `fsPromises.realpath(path[, options])`[#](#fs_fspromises_realpath_path_options)

Added in: v10.0.0

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `options` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    *   `encoding` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) **Default:** `'utf8'`
*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Determines the actual location of `path` using the same semantics as the `fs.realpath.native()` function then resolves the `Promise` with the resolved path.

Only paths that can be converted to UTF8 strings are supported.

The optional `options` argument can be a string specifying an encoding, or an object with an `encoding` property specifying the character encoding to use for the path. If the `encoding` is set to `'buffer'`, the path returned will be passed as a `Buffer` object.

On Linux, when Node.js is linked against musl libc, the procfs file system must be mounted on `/proc` in order for this function to work. Glibc does not have this restriction.

### `fsPromises.rename(oldPath, newPath)`[#](#fs_fspromises_rename_oldpath_newpath)

Added in: v10.0.0

*   `oldPath` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `newPath` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Renames `oldPath` to `newPath` and resolves the `Promise` with no arguments upon success.

### `fsPromises.rmdir(path[, options])`[#](#fs_fspromises_rmdir_path_options)

[Stability: 1](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/documentation.html#documentation_stability_index) - Recursive removal is experimental.

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `options` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    *   `maxRetries` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) If an `EBUSY`, `EMFILE`, `ENFILE`, `ENOTEMPTY`, or `EPERM` error is encountered, Node.js will retry the operation with a linear backoff wait of `retryDelay` ms longer on each try. This option represents the number of retries. This option is ignored if the `recursive` option is not `true`. **Default:** `0`.
    *   `recursive` [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) If `true`, perform a recursive directory removal. In recursive mode, errors are not reported if `path` does not exist, and operations are retried on failure. **Default:** `false`.
    *   `retryDelay` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) The amount of time in milliseconds to wait between retries. This option is ignored if the `recursive` option is not `true`. **Default:** `100`.
*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Removes the directory identified by `path` then resolves the `Promise` with no arguments upon success.

Using `fsPromises.rmdir()` on a file (not a directory) results in the `Promise` being rejected with an `ENOENT` error on Windows and an `ENOTDIR` error on POSIX.

Setting `recursive` to `true` results in behavior similar to the Unix command `rm -rf`: an error will not be raised for paths that do not exist, and paths that represent files will be deleted. The permissive behavior of the `recursive` option is deprecated, `ENOTDIR` and `ENOENT` will be thrown in the future.

### `fsPromises.stat(path[, options])`[#](#fs_fspromises_stat_path_options)

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `options` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
    *   `bigint` [<boolean>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) Whether the numeric values in the returned [`fs.Stats`](#fs_class_fs_stats) object should be `bigint`. **Default:** `false`.
*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

The `Promise` is resolved with the [`fs.Stats`](#fs_class_fs_stats) object for the given `path`.

### `fsPromises.symlink(target, path[, type])`[#](#fs_fspromises_symlink_target_path_type)

Added in: v10.0.0

*   `target` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `type` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) **Default:** `'file'`
*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Creates a symbolic link then resolves the `Promise` with no arguments upon success.

The `type` argument is only used on Windows platforms and can be one of `'dir'`, `'file'`, or `'junction'`. Windows junction points require the destination path to be absolute. When using `'junction'`, the `target` argument will automatically be normalized to absolute path.

### `fsPromises.truncate(path[, len])`[#](#fs_fspromises_truncate_path_len)

Added in: v10.0.0

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `len` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0`
*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Truncates the `path` then resolves the `Promise` with no arguments upon success. The `path` _must_ be a string or `Buffer`.

### `fsPromises.unlink(path)`[#](#fs_fspromises_unlink_path)

Added in: v10.0.0

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Asynchronous [`unlink(2)`](http://man7.org/linux/man-pages/man2/unlink.2.html). The `Promise` is resolved with no arguments upon success.

### `fsPromises.utimes(path, atime, mtime)`[#](#fs_fspromises_utimes_path_atime_mtime)

Added in: v10.0.0

*   `path` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api)
*   `atime` [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Date>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
*   `mtime` [<number>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) | [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Date>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Change the file system timestamps of the object referenced by `path` then resolves the `Promise` with no arguments upon success.

The `atime` and `mtime` arguments follow these rules:

*   Values can be either numbers representing Unix epoch time, `Date`s, or a numeric string like `'123456789.0'`.
*   If the value can not be converted to a number, or is `NaN`, `Infinity` or `-Infinity`, an `Error` will be thrown.

### `fsPromises.writeFile(file, data[, options])`[#](#fs_fspromises_writefile_file_data_options)

*   `file` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<URL>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/url.html#url_the_whatwg_url_api) | [<FileHandle>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/fs.html#fs_class_filehandle) filename or `FileHandle`
*   `data` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<Buffer>](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/buffer.html#buffer_class_buffer) | [<Uint8Array>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) | [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
*   `options` [<Object>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type)
    *   `encoding` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) | [<null>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Null_type) **Default:** `'utf8'`
    *   `mode` [<integer>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) **Default:** `0o666`
    *   `flag` [<string>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) See [support of file system `flags`](#fs_file_system_flags). **Default:** `'w'`.
*   Returns: [<Promise>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Asynchronously writes data to a file, replacing the file if it already exists. `data` can be a string, a buffer, or an object with an own `toString` function property. The `Promise` is resolved with no arguments upon success.

The `encoding` option is ignored if `data` is a buffer.

If `options` is a string, then it specifies the encoding.

Any specified `FileHandle` has to support writing.

It is unsafe to use `fsPromises.writeFile()` multiple times on the same file without waiting for the `Promise` to be resolved (or rejected).

FS constants[#](#fs_fs_constants_1)
-----------------------------------

The following constants are exported by `fs.constants`.

Not every constant will be available on every operating system.

To use more than one constant, use the bitwise OR `|` operator.

Example:

    const fs = require('fs');
    
    const {
      O_RDWR,
      O_CREAT,
      O_EXCL
    } = fs.constants;
    
    fs.open('/path/to/my/file', O_RDWR | O_CREAT | O_EXCL, (err, fd) => {
      
    });

### File access constants[#](#fs_file_access_constants)

The following constants are meant for use with [`fs.access()`](#fs_fs_access_path_mode_callback).

| Constant | Description |
| --- | --- |
| `F_OK` | Flag indicating that the file is visible to the calling process. This is useful for determining if a file exists, but says nothing about `rwx` permissions. Default if no mode is specified. |
| `R_OK` | Flag indicating that the file can be read by the calling process. |
| `W_OK` | Flag indicating that the file can be written by the calling process. |
| `X_OK` | Flag indicating that the file can be executed by the calling process. This has no effect on Windows (will behave like `fs.constants.F_OK`). |

### File copy constants[#](#fs_file_copy_constants)

The following constants are meant for use with [`fs.copyFile()`](#fs_fs_copyfile_src_dest_mode_callback).

| Constant | Description |
| --- | --- |
| `COPYFILE_EXCL` | If present, the copy operation will fail with an error if the destination path already exists. |
| `COPYFILE_FICLONE` | If present, the copy operation will attempt to create a copy-on-write reflink. If the underlying platform does not support copy-on-write, then a fallback copy mechanism is used. |
| `COPYFILE_FICLONE_FORCE` | If present, the copy operation will attempt to create a copy-on-write reflink. If the underlying platform does not support copy-on-write, then the operation will fail with an error. |

### File open constants[#](#fs_file_open_constants)

The following constants are meant for use with `fs.open()`.

| Constant | Description |
| --- | --- |
| `O_RDONLY` | Flag indicating to open a file for read-only access. |
| `O_WRONLY` | Flag indicating to open a file for write-only access. |
| `O_RDWR` | Flag indicating to open a file for read-write access. |
| `O_CREAT` | Flag indicating to create the file if it does not already exist. |
| `O_EXCL` | Flag indicating that opening a file should fail if the `O_CREAT` flag is set and the file already exists. |
| `O_NOCTTY` | Flag indicating that if path identifies a terminal device, opening the path shall not cause that terminal to become the controlling terminal for the process (if the process does not already have one). |
| `O_TRUNC` | Flag indicating that if the file exists and is a regular file, and the file is opened successfully for write access, its length shall be truncated to zero. |
| `O_APPEND` | Flag indicating that data will be appended to the end of the file. |
| `O_DIRECTORY` | Flag indicating that the open should fail if the path is not a directory. |
| `O_NOATIME` | Flag indicating reading accesses to the file system will no longer result in an update to the `atime` information associated with the file. This flag is available on Linux operating systems only. |
| `O_NOFOLLOW` | Flag indicating that the open should fail if the path is a symbolic link. |
| `O_SYNC` | Flag indicating that the file is opened for synchronized I/O with write operations waiting for file integrity. |
| `O_DSYNC` | Flag indicating that the file is opened for synchronized I/O with write operations waiting for data integrity. |
| `O_SYMLINK` | Flag indicating to open the symbolic link itself rather than the resource it is pointing to. |
| `O_DIRECT` | When set, an attempt will be made to minimize caching effects of file I/O. |
| `O_NONBLOCK` | Flag indicating to open the file in nonblocking mode when possible. |
| `UV_FS_O_FILEMAP` | When set, a memory file mapping is used to access the file. This flag is available on Windows operating systems only. On other operating systems, this flag is ignored. |

### File type constants[#](#fs_file_type_constants)

The following constants are meant for use with the [`fs.Stats`](#fs_class_fs_stats) object's `mode` property for determining a file's type.

| Constant | Description |
| --- | --- |
| `S_IFMT` | Bit mask used to extract the file type code. |
| `S_IFREG` | File type constant for a regular file. |
| `S_IFDIR` | File type constant for a directory. |
| `S_IFCHR` | File type constant for a character-oriented device file. |
| `S_IFBLK` | File type constant for a block-oriented device file. |
| `S_IFIFO` | File type constant for a FIFO/pipe. |
| `S_IFLNK` | File type constant for a symbolic link. |
| `S_IFSOCK` | File type constant for a socket. |

### File mode constants[#](#fs_file_mode_constants)

The following constants are meant for use with the [`fs.Stats`](#fs_class_fs_stats) object's `mode` property for determining the access permissions for a file.

| Constant | Description |
| --- | --- |
| `S_IRWXU` | File mode indicating readable, writable, and executable by owner. |
| `S_IRUSR` | File mode indicating readable by owner. |
| `S_IWUSR` | File mode indicating writable by owner. |
| `S_IXUSR` | File mode indicating executable by owner. |
| `S_IRWXG` | File mode indicating readable, writable, and executable by group. |
| `S_IRGRP` | File mode indicating readable by group. |
| `S_IWGRP` | File mode indicating writable by group. |
| `S_IXGRP` | File mode indicating executable by group. |
| `S_IRWXO` | File mode indicating readable, writable, and executable by others. |
| `S_IROTH` | File mode indicating readable by others. |
| `S_IWOTH` | File mode indicating writable by others. |
| `S_IXOTH` | File mode indicating executable by others. |

File system flags[#](#fs_file_system_flags)
-------------------------------------------

The following flags are available wherever the `flag` option takes a string.

*   `'a'`: Open file for appending. The file is created if it does not exist.
    
*   `'ax'`: Like `'a'` but fails if the path exists.
    
*   `'a+'`: Open file for reading and appending. The file is created if it does not exist.
    
*   `'ax+'`: Like `'a+'` but fails if the path exists.
    
*   `'as'`: Open file for appending in synchronous mode. The file is created if it does not exist.
    
*   `'as+'`: Open file for reading and appending in synchronous mode. The file is created if it does not exist.
    
*   `'r'`: Open file for reading. An exception occurs if the file does not exist.
    
*   `'r+'`: Open file for reading and writing. An exception occurs if the file does not exist.
    
*   `'rs+'`: Open file for reading and writing in synchronous mode. Instructs the operating system to bypass the local file system cache.
    
    This is primarily useful for opening files on NFS mounts as it allows skipping the potentially stale local cache. It has a very real impact on I/O performance so using this flag is not recommended unless it is needed.
    
    This doesn't turn `fs.open()` or `fsPromises.open()` into a synchronous blocking call. If synchronous operation is desired, something like `fs.openSync()` should be used.
    
*   `'w'`: Open file for writing. The file is created (if it does not exist) or truncated (if it exists).
    
*   `'wx'`: Like `'w'` but fails if the path exists.
    
*   `'w+'`: Open file for reading and writing. The file is created (if it does not exist) or truncated (if it exists).
    
*   `'wx+'`: Like `'w+'` but fails if the path exists.
    

`flag` can also be a number as documented by [`open(2)`](http://man7.org/linux/man-pages/man2/open.2.html); commonly used constants are available from `fs.constants`. On Windows, flags are translated to their equivalent ones where applicable, e.g. `O_WRONLY` to `FILE_GENERIC_WRITE`, or `O_EXCL|O_CREAT` to `CREATE_NEW`, as accepted by `CreateFileW`.

The exclusive flag `'x'` (`O_EXCL` flag in [`open(2)`](http://man7.org/linux/man-pages/man2/open.2.html)) causes the operation to return an error if the path already exists. On POSIX, if the path is a symbolic link, using `O_EXCL` returns an error even if the link is to a path that does not exist. The exclusive flag may or may not work with network file systems.

On Linux, positional writes don't work when the file is opened in append mode. The kernel ignores the position argument and always appends the data to the end of the file.

Modifying a file rather than replacing it may require the `flag` option to be set to `'r+'` rather than the default `'w'`.

The behavior of some flags are platform-specific. As such, opening a directory on macOS and Linux with the `'a+'` flag, as in the example below, will return an error. In contrast, on Windows and FreeBSD, a file descriptor or a `FileHandle` will be returned.

    
    fs.open('<directory>', 'a+', (err, fd) => {
      
    });
    
    
    fs.open('<directory>', 'a+', (err, fd) => {
      
    });

On Windows, opening an existing hidden file using the `'w'` flag (either through `fs.open()` or `fs.writeFile()` or `fsPromises.open()`) will fail with `EPERM`. Existing hidden files can be opened for writing with the `'r+'` flag.

A call to `fs.ftruncate()` or `filehandle.truncate()` can be used to reset the file contents.


[Source](https://nodejs.org/api/fs.html)