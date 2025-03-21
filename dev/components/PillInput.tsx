import * as React from 'react';
import {useState} from 'react';

import {PillInput} from '../../src/components/filters/PillInput';

export default function PillInputs() {
  const [values, setValues] = useState<string[]>(['Hello']);
  return <PillInput values={values} setValues={setValues} />;
}
