/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

function SvgMock({...props}: React.HTMLAttributes<HTMLOrSVGElement>) {
  return <svg data-testid="mock-svg" {...props} />;
}

export default SvgMock;
