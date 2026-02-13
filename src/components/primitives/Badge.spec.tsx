/**
 * @jest-environment jsdom
 */

/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react';
import Badge from './Badge';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Badge', () => {
  it('renders a label', async () => {
    render(<Badge label="We don't need no" />);
    await screen.findByTestId('badge-label');
    expect(screen.getByTestId('badge-label')).toHaveTextContent(
      "We don't need no"
    );
  });

  it('renders a label and an icon', async () => {
    render(<Badge color="purple" icon="warning" label="We don't need no" />);
    await screen.findByTestId('badge-label');
    expect(screen.getByTestId('badge-label')).toHaveTextContent(
      "We don't need no"
    );
    expect(screen.getByTestId('icon-purple-warning')).toBeVisible();
  });
});
