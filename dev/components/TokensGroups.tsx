import React from 'react';

import {
  EditableToken,
  Token,
  TokenGroup,
} from '../../src/components/primitives';
import SelectorToken from '../../src/components/primitives/tokens/SelectorToken';

export default function TokenGroups() {
  const [values, setValues] = React.useState({
    token1: 'descending',
  });

  const handleChange = (tokenName: string, newValue: string) => {
    setValues(prevValues => ({...prevValues, [tokenName]: newValue}));
  };

  return (
    <div>
      <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
        <div
          style={{
            fontFamily: 'sans-serif',
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
            <SelectorToken
              value={values.token1}
              onChange={v => handleChange('token1', v)}
              items={[
                {label: 'ascending', value: 'ascending'},
                {label: 'descending', value: 'descending'},
              ]}
              color="default"
            />
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
