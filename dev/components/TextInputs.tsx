import React from 'react';

import {TextInput} from '../../src/components/primitives';

export default function TextInputs() {
  const [values, setValues] = React.useState({
    input1: '',
    input2: 'Edit me',
    input3: '',
  });

  const handleChange = (inputName: string, newValue: string) => {
    setValues(prevValues => ({...prevValues, [inputName]: newValue}));
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
          Text Inputs
        </div>
        <div style={{display: 'flex', gap: '8px'}}>
          <TextInput
            value={values.input1}
            placeholder={'Search'}
            size="compact"
            icon="search"
            onChange={v => handleChange('input1', v)}
            hasClear={true}
          />
          <TextInput
            value={values.input2}
            onChange={v => handleChange('input2', v)}
            hasClear={true}
          />
          <TextInput
            value={values.input3}
            onChange={v => handleChange('input3', v)}
          />
        </div>
      </div>
    </div>
  );
}
