import validate, { checks } from "@danielres/le-config";

const config = {
  PORT: [process.env.PORT, checks.int.port()],
};

export default validate(config);
