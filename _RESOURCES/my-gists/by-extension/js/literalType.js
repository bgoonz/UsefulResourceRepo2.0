// @flow

// Originally from https://github.com/facebook/flow/issues/2639#issuecomment-409803679

const foo = 'FOO';

function literal(type) {
  return { [type]: type };
}

type LiteralType<T> = $Keys<$Call<typeof literal, T>>;

('FOO': LiteralType<typeof foo>); // No errors
('BAR': LiteralType<typeof foo>); // Error: property `BAR`. Property not found in object literal 