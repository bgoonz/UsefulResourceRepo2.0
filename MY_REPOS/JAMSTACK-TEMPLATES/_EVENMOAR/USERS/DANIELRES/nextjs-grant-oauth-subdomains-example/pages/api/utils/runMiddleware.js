// Allows to use express middlewares
// within Nextjs serverless functions:

export const runMiddleware = (req, res, fn) =>
  new Promise((resolve, reject) =>
    fn(req, res, (result) =>
      result instanceof Error ? reject(result) : resolve(result)
    )
  );
