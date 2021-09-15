/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
types';
import React, { useCallback, useState } from 'react';

interface CopyButtonProps extends HTMLProps<IconButtonProps> {
  textToCopy: string;
  icon?: string;
}

export function useClipboard() {
  const [isTextCopied, setIsTextCopied] = useState(false);
  return {
    isTextCopied,
    writeText: useCallback((text: string) => {
      return navigator.clipboard
        .writeText(text)
        .then(() => setIsTextCopied(true))
        .catch(() => setIsTextCopied((isTextCopied) => isTextCopied));
    }, []),
  };
}

export function CopyButton({
  textToCopy: text,
  label,
  theme,
  icon = 'content_copy',
}: CopyButtonProps) {
  label = label || 'Copy';
  theme = theme || 'textPrimaryOnBackground';
  const { writeText } = useClipboard();
  return (
    <IconButton
      theme={theme}
      icon={icon}
      label={label}
      onClick={() => writeText(text)}
    />
  );
}
