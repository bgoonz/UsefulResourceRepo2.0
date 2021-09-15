const { Suite } = require('benchmark');
const argv = require('minimist')(process.argv.slice(2));

const cycle = (e, newline) => {
  process.stdout.write('\u001b[G');
  process.stdout.write(`  ${e.target}` + (newline ? '\n' : ''));
};

function bench(name) {
  const suite = new Suite()
    .on('start', () => console.log(`# ${name}`))
    .on('complete', function() {
      const fastest = this.filter('fastest').map('name').toString();
      console.log(`Fastest is '${fastest}'`);
      console.log();
    });

  const ste = {
    run: suite.run.bind(suite),
    add(key, fn) {
      suite.add(key, {
        onCycle: e => cycle(e),
        onComplete: e => cycle(e, true),
        onError(err) {
          console.error(err);
          process.exit(1);
        },
        fn
      });
      return ste;
    }
  };
  return ste;
}

/**
 * Example usage
 */

bench('some-comparisons')
  .add('one', () => {
    // do stuff
  })
  .add('two', () => {
    // do stuff
  })
  .add('three', () => {
    // do stuff
  })
  .run()


