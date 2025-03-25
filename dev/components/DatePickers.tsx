import React from 'react';

import {DatePicker} from '../../src/components/primitives';

export default function DatePickers() {
  const [values, setValues] = React.useState({
    input1: new Date(),
  });

  const handleChange = (inputName: string, newValue: Date) => {
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
          Date Pickers
        </div>
        <div style={{display: 'flex', gap: '8px'}}>
          <DatePicker
            maxLevel="day"
            value={values.input1}
            setValue={d => handleChange('input1', d)}
          />
        </div>
      </div>
    </div>
  );
}
