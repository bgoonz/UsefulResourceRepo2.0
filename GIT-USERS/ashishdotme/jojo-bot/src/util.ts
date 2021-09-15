export interface LoggerOptions {
	name?: string;
}

export default class Logger {
	private readonly name?: string;
	private static _instance?: Logger;

	public constructor(public readonly options?: LoggerOptions) {
		this.name = options?.name;
	}

	public static getInstance(options?: LoggerOptions) {
		if (!this._instance) this._instance = new this(options);
		return this._instance;
	}

	/*
    [Date] [MemUsed][Name] [Type] <value>
    */
	private base(type: string, value: string, color: string) {
		const used_mem: number = process.memoryUsage().heapUsed / 1024 / 1024;
		const dateString = `[${new Date().toLocaleTimeString()}|${new Date().toLocaleDateString()}]${color}${
			colors.DIM
		}`;
		const memString = `[${(Math.round(used_mem * 100) / 100).toFixed(2)} MB]${
			this.name ? `[${this.name}]` : ''
		}[${type}]:${colors.BRIGHT}`.trim();

		return console.log(dateString + memString, value, colors.RESET);
	}

	public log(value: string, color?: colors) {
		return this.base('INFO', value, color ?? colors.GREEN);
	}

	public warn(value: string, color?: colors) {
		return this.base('WARN', value, color ?? colors.YELLOW);
	}

	public error(value: string | Error) {
		return this.base('ERR', value instanceof Error ? value.message : value, colors.RED);
	}
}

enum colors {
	RESET = '\x1b[0m',
	BRIGHT = '\x1b[1m',
	DIM = '\x1b[2m',
	UNDERSCORE = '\x1b[4m',
	BLINK = '\x1b[5m',
	REVERSE = '\x1b[7m',
	HIDDEN = '\x1b[8m',
	BLACK = '\x1b[30m',
	RED = '\x1b[31m',
	GREEN = '\x1b[32m',
	YELLOW = '\x1b[33m',
	BLUE = '\x1b[34m',
	MAGENTA = '\x1b[35m',
	CYAN = '\x1b[36m',
	WHITE = '\x1b[37m',
	BGBLACK = '\x1b[40m',
	BGRED = '\x1b[41m',
	BGGREEN = '\x1b[42m',
	BGYELLOW = '\x1b[43m',
	BGBLUE = '\x1b[44m',
	BGMAGENTA = '\x1b[45m',
	BGCYAN = '\x1b[46m',
	BGWHITE = '\x1b[47m'
}
