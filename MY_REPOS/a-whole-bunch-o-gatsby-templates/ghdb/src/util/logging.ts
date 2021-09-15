import chalk from 'chalk';

console.red = (...args: string[]) => {
  console.error(chalk.red.apply(null, args));
};

console.green = (...args: string[]) => {
  console.error(chalk.green.apply(null, args));
};

console.yellow = (...args: string[]) => {
  console.error(chalk.yellow.apply(null, args));
};
