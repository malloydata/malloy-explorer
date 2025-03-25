/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';

interface DOMElementProps {
  element: HTMLElement;
}

export default function DOMElement({element}: DOMElementProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const w = ref.current;
    if (w) {
      w.replaceChildren(element);
    }
  }, [element]);

  return <div ref={ref}></div>;
}
