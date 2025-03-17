import React from 'react';

import {
  EditableToken,
  Token,
  TokenGroup,
} from '../../src/components/primitives';

export default function TokenGroups() {
  return (
    <div>
      <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
        <div
          style={{
            fontFamily: 'SF Pro Text',
            fontSize: '20px',
            fontWeight: 500,
            marginBottom: '8px',
          }}
        >
          Token Groups
        </div>
        <div style={{display: 'flex', gap: '8px'}}>
          <TokenGroup>
            <Token label="flight_status" />
            <Token label="is" />
            <Token label="delayed" />
          </TokenGroup>
          <TokenGroup color="green">
            <Token icon="measure" label="flight_count" />
            <Token label="is" />
            <Token label="ascending" color="default" />
          </TokenGroup>
          <TokenGroup>
            <Token label="ds_start" />
            <EditableToken
              value="01-01-2025"
              onChange={() => {}}
              color="default"
            />
          </TokenGroup>
        </div>
      </div>
    </div>
  );
}
