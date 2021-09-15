// Use path and TTY for type information only. We lazily pull them in
// to avoid circular dependencies :(
// (path depends on process for cwd(), TTY depends on streams which depends
//  on process.nextTick/process.stdout/stderr/stdin).
import _path = require('path');
import _TTY = require('./tty');
import events = require('events');

// Path depends on process. Avoid a circular reference by dynamically including path when we need it.
var path: typeof _path = null;

class Item {
  private fun: Function;
  private array: any[];
  constructor(fun: Function, array: any[]) {
    this.fun = fun;
    this.array = array;
  }

  public run(): void {
    this.fun.apply(null, this.array);
  }
}

/**
 * Contains a queue of Items for process.nextTick.
 * Inspired by node-process: https://github.com/defunctzombie/node-process
 */
class NextTickQueue {
  private _queue: Item[] = [];
  private _draining = false;
  // Used/assigned by the drainQueue function.
  private _currentQueue: Item[] = null;
  private _queueIndex = -1;

  public push(item: Item): void {
    if (this._queue.push(item) === 1 && !this._draining) {
      setTimeout(() => this._drainQueue(), 0);
    }
  }

  private _cleanUpNextTick() {
    this._draining = false;
    if (this._currentQueue && this._currentQueue.length) {
      this._queue = this._currentQueue.concat(this._queue);
    } else {
      this._queueIndex = -1;
    }
    if (this._queue.length) {
      this._drainQueue();
    }
  }

  private _drainQueue() {
    if (this._draining) {
      return;
    }
    // If an Item throws an unhandled exception, this function will clean things up.
    var timeout = setTimeout(() => this._cleanUpNextTick());
    this._draining = true;

    var len = this._queue.length;
    while (len) {
      this._currentQueue = this._queue;
      this._queue = [];
      while (++this._queueIndex < len) {
        if (this._currentQueue) {
          this._currentQueue[this._queueIndex].run();
        }
      }
      this._queueIndex = -1;
      len = this._queue.length;
    }
    this._currentQueue = null;
    this._draining = false;
    clearTimeout(timeout);
  }
}

/**
 * Partial implementation of Node's `process` module.
 * We implement the portions that are relevant for the filesystem.
 * @see http://nodejs.org/api/process.html
 * @class
 */
class Process extends events.EventEmitter implements NodeJS.Process {
  private startTime = Date.now();

  private _cwd: string = '/';
  /**
   * Changes the current working directory.
   *
   * **Note**: BrowserFS does not validate that the directory actually exists.
   *
   * @example Usage example
   *   console.log('Starting directory: ' + process.cwd());
   *   process.chdir('/tmp');
   *   console.log('New directory: ' + process.cwd());
   * @param [String] dir The directory to change to.
   */
  public chdir(dir: string): void {
    // XXX: Circular dependency hack.
    if (path === null) {
      path = require('path');
    }
    this._cwd = path.resolve(dir);
  }
  /**
   * Returns the current working directory.
   * @example Usage example
   *   console.log('Current directory: ' + process.cwd());
   * @return [String] The current working directory.
   */
  public cwd(): string {
    return this._cwd;
  }
  /**
   * Returns what platform you are running on.
   * @return [String]
   */
  public platform: string = 'browser';
  /**
   * Number of seconds BrowserFS has been running.
   * @return [Number]
   */
  public uptime(): number {
    return ((Date.now() - this.startTime) / 1000) | 0;
  }

  public argv: string[] = [];
  public execArgv: string[] = [];
  public stdout: _TTY = null;
  public stderr: _TTY = null;
  public stdin: _TTY = null;
  public domain: NodeJS.Domain = null;

  private _queue: NextTickQueue = new NextTickQueue();

  public nextTick(fun: any, ...args: any[]) {
    this._queue.push(new Item(fun, args));
  }

  public execPath = __dirname;

  public abort(): void {
    this.emit('abort');
  }

  public env: { [name: string]: string } = {};
  public exitCode: number = 0;
  public exit(code: number): void {
    this.exitCode = code;
    this.emit('exit', [code]);
  }

  private _gid: number = 1;
  public getgid(): number {
    return this._gid;
  }
  public setgid(gid: number | string): void {
    if (typeof gid === 'number') {
      this._gid = gid;
    } else {
      this._gid = 1;
    }
  }

  private _uid: number = 1;
  public getuid(): number {
    return this._uid;
  }
  public setuid(uid: number | string): void {
    if (typeof uid === 'number') {
      this._uid = uid;
    } else {
      this._uid = 1;
    }
  }

  public version: string = 'v5.0';

  public versions = {
    http_parser: '0.0',
    node: '5.0',
    v8: '0.0',
    uv: '0.0',
    zlib: '0.0',
    ares: '0.0',
    icu: '0.0',
    modules: '0',
    openssl: '0.0',
  };

  public config = {
    target_defaults: {
      cflags: <any[]>[],
      default_configuration: 'Release',
      defines: <string[]>[],
      include_dirs: <string[]>[],
      libraries: <string[]>[],
    },
    variables: {
      clang: 0,
      host_arch: 'x32',
      node_install_npm: false,
      node_install_waf: false,
      node_prefix: '',
      node_shared_cares: false,
      node_shared_http_parser: false,
      node_shared_libuv: false,
      node_shared_zlib: false,
      node_shared_v8: false,
      node_use_dtrace: false,
      node_use_etw: false,
      node_use_openssl: false,
      node_shared_openssl: false,
      strict_aliasing: false,
      target_arch: 'x32',
      v8_use_snapshot: false,
      v8_no_strict_aliasing: 0,
      visibility: '',
    },
  };

  public kill(pid: number, signal?: string): void {
    this.emit('kill', [pid, signal]);
  }

  public pid = (Math.random() * 1000) | 0;

  public title = 'node';
  public arch = 'x32';
  public memoryUsage(): { rss: number; heapTotal: number; heapUsed: number } {
    return { rss: 0, heapTotal: 0, heapUsed: 0 };
  }

  private _mask = 18;
  public umask(mask: number = this._mask): number {
    let oldMask = this._mask;
    this._mask = mask;
    this.emit('umask', [mask]);
    return oldMask;
  }

  public hrtime(): [number, number] {
    let timeinfo: number;
    if (typeof performance !== 'undefined') {
      timeinfo = performance.now();
    } else if (Date['now']) {
      timeinfo = Date.now();
    } else {
      timeinfo = new Date().getTime();
    }
    let secs = (timeinfo / 1000) | 0;
    timeinfo -= secs * 1000;
    timeinfo = (timeinfo * 1000000) | 0;
    return [secs, timeinfo];
  }

  /**
   * [BFS only] Initialize the TTY devices.
   */
  public initializeTTYs(): void {
    // Guard against multiple invocations.
    if (this.stdout === null) {
      let TTY: typeof _TTY = require('./tty');
      this.stdout = new TTY();
      this.stderr = new TTY();
      this.stdin = new TTY();
    }
  }

  /**
   * Worker-only function; irrelevant here.
   */
  public disconnect(): void {}
  // Undefined in main thread. Worker-only.
  public connected: boolean = undefined;
}

export = Process;
