export class IndexOutOfBoundsError extends Error {
  constructor(message?: string) {
    const baseMessage = 'IndexOutOfBoundsError';
    super(message ? `${baseMessage}: ${message}` : baseMessage);
  }
}
