import { steps } from "./prepare/steps";
import { client } from "./utils/admin/client";

const run = async () => {
  console.log(`=== Running fauna:prepare (env: ${process.env.NODE_ENV})`);

  let counter = 0;
  for (const step of steps) {
    counter += 1;
    const { action, name } = step(client);
    try {
      await action();
      console.log(`✔ Step ${counter}: ${name}`);
    } catch (error) {
      console.error(
        `✗ Step ${counter}: ${name}`.padEnd(50),
        `Error: ${error.message}`
      );
    }
  }
};

run().then(() => {
  console.log("fauna:prepare done");
});
