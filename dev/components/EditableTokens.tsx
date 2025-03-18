import React from 'react';

import {EditableToken} from '../../src/components/primitives';

export default function EditableTokens() {
  const [values, setValues] = React.useState({
    token1: 'Edit me',
    token2: 'Edit me',
    token3: 'Edit me',
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
          Editable Tokens
        </div>
        <div style={{display: 'flex', gap: '8px'}}>
          <EditableToken
            value={values.token1}
            onChange={v => handleChange('token1', v)}
          />
          <EditableToken
            value={values.token2}
            onChange={v => handleChange('token2', v)}
            onRemove={() => handleChange('token2', '')}
          />
          <EditableToken
            icon="measure"
            value={values.token3}
            onChange={v => handleChange('token3', v)}
          />
        </div>
      </div>
    </div>
  );
}
