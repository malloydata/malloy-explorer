import React from 'react';
import {Banner} from '../../src/components/primitives';

export default function Banners() {
  return (
    <>
      <div
        style={{
          fontFamily: 'sans-serif',
          fontSize: '20px',
          fontWeight: 500,
          marginBottom: '8px',
        }}
      >
        Banners
      </div>
      <div>
        <Banner
          title="Info Banner"
          description="I'm a description"
          variant="info"
        />
        <div style={{height: '200px'}}>
          <Banner title="Success Banner" variant="success">
            With optional content. With optional content. With optional content.
            With optional content. With optional content. With optional content.
            With optional content. With optional content. With optional content.
            With optional content. With optional content. With optional content.
            With optional content. With optional content. With optional content.
            With optional content. With optional content. With optional content.
            With optional content. With optional content. With optional content.
            With optional content. With optional content. With optional content.
            With optional content. With optional content. With optional content.
            With optional content. With optional content. With optional content.
            With optional content. With optional content. With optional content.
            With optional content. With optional content. With optional content.
            With optional content. With optional content. With optional content.
            With optional content. With optional content. With optional content.
            With optional content. With optional content. With optional content.
            With optional content. With optional content. With optional content.
            With optional content. With optional content. With optional content.
            With optional content. With optional content. With optional content.
            With optional content. With optional content. With optional content.
            With optional content. With optional content. With optional content.
          </Banner>
        </div>
        <Banner
          title="Warn Banner"
          description="I'm a description that is long - really, really, really, really, really, really, really, really, really, really, really, really, really, really"
          variant="warn"
        />
        <Banner title="Critical Banner" variant="critical" />
      </div>
    </>
  );
}
