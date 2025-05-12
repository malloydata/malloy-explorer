import * as React from 'react';

import {Icon} from '../../src/components/primitives';
import {ICON_MAP, IconType} from '../../src/components/primitives/utils/icon';

export default function Icons() {
  return (
    <div style={{display: 'flex', gap: 4, flexWrap: 'wrap', width: 400}}>
      {Object.keys(ICON_MAP).map(name => (
        <div
          title={name}
          key={name}
          style={{border: '1px solid #ddd', width: 16, height: 16}}
        >
          <Icon name={name as IconType} />
        </div>
      ))}
    </div>
  );
}
