import * as React from 'react';

export default function Pause({ ...props }: {}) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  );
}
