import React from 'react';

import {SelectorToken} from '../../src/components/primitives';

export default function SelectorTokens() {
  const [values, setValues] = React.useState({
    token1: 'is_equal_to',
    token2: 'is_null',
    token3: 'is_true_or_null',
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
          Selector Tokens
        </div>
        <div style={{display: 'flex', gap: '8px'}}>
          <SelectorToken
            value={values.token1}
            onChange={v => handleChange('token1', v)}
            items={[
              {
                value: 'is_equal_to',
                label: 'Equal to',
              },
              {
                value: 'is_greater_than',
                label: 'Greater than',
              },
              {
                value: 'is_less_than',
                label: 'Less than',
              },
              {
                value: 'is_greater_than_or_equal_to',
                label: 'Greater than or equal to',
              },
              {
                value: 'is_less_than_or_equal_to',
                label: 'Less than or equal to',
              },
              {
                value: 'is_between',
                label: 'Between',
              },
              {
                value: 'is_null',
                label: 'Null',
              },
              {
                value: 'is_not_equal_to',
                label: 'Not equal to',
              },
              {
                value: 'is_not_null',
                label: 'Not null',
              },
              {
                value: 'custom',
                label: 'Custom',
              },
            ]}
          />
          <SelectorToken
            value={values.token2}
            onChange={v => handleChange('token2', v)}
            items={[
              {
                value: 'is_equal_to',
                label: 'Is',
              },
              {
                value: 'starts_with',
                label: 'Starts with',
              },
              {
                value: 'ends_with',
                label: 'Ends with',
              },
              {
                value: 'contains',
                label: 'Contains',
              },
              {
                value: 'is_blank',
                label: 'Blank',
              },
              {
                value: 'is_null',
                label: 'Null',
              },
              {
                value: 'is_not_equal_to',
                label: 'Is not',
              },
              {
                value: 'does_not_start_with',
                label: 'Does not start with',
              },
              {
                value: 'does_not_end_with',
                label: 'Does not end with',
              },
              {
                value: 'does_not_contain',
                label: 'Does not contain',
              },
              {
                value: 'is_greater_than',
                label: 'Greater than',
              },
              {
                value: 'is_less_than',
                label: 'Less than',
              },
              {
                value: 'is_greater_than_or_equal_to',
                label: 'Greater than or equal to',
              },
              {
                value: 'is_less_than_or_equal_to',
                label: 'Less than or equal to',
              },
              {
                value: 'is_not_blank',
                label: 'Not blank',
              },
              {
                value: 'is_not_null',
                label: 'Not null',
              },
              {
                value: 'custom',
                label: 'Custom',
              },
            ]}
            isSearchable={true}
          />
          <SelectorToken
            value={values.token3}
            onChange={v => handleChange('token3', v)}
            items={[
              {
                value: 'is_true',
                label: 'True',
              },
              {
                value: 'is_false',
                label: 'False',
              },
              {
                value: 'is_null',
                label: 'Null',
              },
              {
                value: 'is_not_null',
                label: 'Not null',
              },
              {
                value: 'is_true_or_null',
                label: 'True or null',
              },
              {
                value: 'is_false_or_null',
                label: 'False or null',
              },
              {
                value: 'custom',
                label: 'Custom',
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
