import * as React from 'react';

export default function Play({ ...props }: {}) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <path d="M3 22V2l18 10L3 22z" />
    </svg>
  );
}
