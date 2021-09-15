declare module '*.json' {
  const value: any;
  export default value;
}

interface Console {
  red: (...args: any[]) => void;
  green: (...args: any[]) => void;
  yellow: (...args: any[]) => void;
}

declare module 'restify-router';
