const compile = (input, helpers, thisArg) => {
  return async data => {
    let ctx = { ...thisArg, ...data };
    let keys = [];
    let vals = [];

    if (helpers) {
      for (let key of Object.keys(helpers)) {
        if (ctx[key] === void 0) {
          ctx[key] = (...args) => helpers[key].call(ctx, ...args);
        }
      }
    }

    for (let key in ctx) {
      if (ctx.hasOwnProperty(key)) {
        keys.push(key);
        vals.push(ctx[key]);
      }
    }

    let isPromise = val => typeof val === 'function' || val instanceof Promise;
    let resolve = (input, ctx) => {
      return typeof input === 'function' ? input.call(ctx, ctx) : input;
    };

    ctx.compile = compile;
    ctx.render = (str, locals) => compile(str)({ ...ctx, ...locals });
    while (isPromise(input)) input = await resolve(input, ctx);
    let source = `return ((async () => \`${input.replace(/\${/g, '${await ')}\`))()`;
    return await Function(keys, source).apply(ctx, vals);
  };
};