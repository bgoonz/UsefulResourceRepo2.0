const createUser = ({
  email = '',
  publicAddress = '',
  sessionToken = '',
  isSignedIn = false,
} = {}) => ({
  email,
  publicAddress,
  sessionToken,
  isSignedIn,
});

const noop = () => {
  console.log('sign in status changed');
};

const objEqReducer = (oldObj, newObj) => (same, prop) =>
  same && oldObj[prop] === newObj[prop];
const changed = (oldObj, newObj, checkProps) =>
  !checkProps.reduce(objEqReducer(oldObj, newObj), true);

export { createUser, noop, changed };
