/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import {Button} from '../primitives';
import {useEffect, useState} from 'react';

const ON_COPY_TIMEOUT = 800;

interface CopyToClipboardProps {
  text: string;
  label: string;
}

export default function CopyToClipboard({text, label}: CopyToClipboardProps) {
  const [didCopy, setDidCopy] = useState<boolean>(false);

  useEffect(() => {
    if (!didCopy) {
      return () => {};
    }

    const timeout = setTimeout(() => {
      setDidCopy(false);
    }, ON_COPY_TIMEOUT);

    return () => {
      clearTimeout(timeout);
      setDidCopy(false);
    };
  }, [didCopy]);

  return (
    <Button
      variant="flat"
      size="compact"
      label={!didCopy ? label : 'Copied!'}
      icon="copy"
      isDisabled={didCopy}
      onClick={() => {
        navigator.clipboard.writeText(text).then(() => setDidCopy(true));
      }}
    />
  );
}
