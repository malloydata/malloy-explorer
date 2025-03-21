/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {useEffect} from 'react';

export function useClickOutside<E extends Element | null>(
  refOrRefs: React.RefObject<E> | React.RefObject<E>[],
  handler: (event: Event) => void
): void {
  useEffect(() => {
    const refs = Array.isArray(refOrRefs) ? refOrRefs : [refOrRefs];
    let down = false;

    const isInOneElement = (ref: React.RefObject<E | null>, event: Event) => {
      return (
        !ref.current ||
        (event.target instanceof Element && ref.current.contains(event.target))
      );
    };

    const isInElement = (event: Event) => {
      return refs.some(ref => isInOneElement(ref, event));
    };

    const onMouseUp = (event: Event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!down || isInElement(event)) return;
      handler(event);
      down = false;
    };

    const onMouseDown = (event: Event) => {
      if (isInElement(event)) return;
      down = true;
    };

    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousedown', onMouseDown);

    return () => {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousedown', onMouseDown);
    };
  }, [refOrRefs, handler]);
}
