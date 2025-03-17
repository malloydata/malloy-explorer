import React from 'react';

import {Button} from '../../src/components/primitives';

export default function Buttons() {
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
          Buttons
        </div>
        <div style={{display: 'flex', gap: '8px'}}>
          <Button
            variant="default"
            size="compact"
            icon="chevronRight"
            onClick={() => {}}
          />
          <Button
            variant="flat"
            size="compact"
            icon="chevronRight"
            onClick={() => {}}
          />
          <Button
            variant="primary"
            size="compact"
            icon="chevronRight"
            onClick={() => {}}
          />
        </div>
        <div style={{display: 'flex', gap: '8px'}}>
          <Button icon="chevronRight" onClick={() => {}} />
          <Button variant="flat" icon="chevronRight" onClick={() => {}} />
          <Button variant="primary" icon="chevronRight" onClick={() => {}} />
        </div>
        <div style={{display: 'flex', gap: '8px'}}>
          <Button label="Button" onClick={() => {}} />
          <Button label="Button" variant="flat" onClick={() => {}} />
          <Button label="Button" variant="primary" onClick={() => {}} />
        </div>
        <div style={{display: 'flex', gap: '8px'}}>
          <Button
            variant="default"
            label="Button"
            icon="chevronRight"
            onClick={() => {}}
          />
          <Button
            label="Button"
            variant="flat"
            icon="chevronRight"
            onClick={() => {}}
          />
          <Button
            label="Button"
            variant="primary"
            icon="chevronRight"
            onClick={() => {}}
          />
        </div>
        <div style={{display: 'flex', gap: '8px'}}>
          <Button
            label="Button"
            icon="chevronRight"
            onClick={() => {}}
            isDisabled={true}
          />
          <Button
            label="Button"
            variant="flat"
            icon="chevronRight"
            onClick={() => {}}
            isDisabled={true}
          />
          <Button
            label="Button"
            variant="primary"
            icon="chevronRight"
            onClick={() => {}}
            isDisabled={true}
          />
        </div>
      </div>
    </div>
  );
}
