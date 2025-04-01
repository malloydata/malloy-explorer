import React from 'react';

import {CodeBlock} from '../../src/components/primitives';

const MALLOY_TEXT = `# segment_map
view: top_routes_map is {
    group_by:
        origin.latitude
        origin.longitude
        latitude2 is destination.latitude
        longitude2 is destination.longitude
    aggregate: flight_count
    limit: 100
}
-> {select: latitude,longitude,latitude2,longitude2}`;

const SQL_TEXT = `SELECT
    one,
    two,
    three
FROM a_table
WHERE 1=1
GROUP BY 1`;

export default function CodeBlocks() {
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
        Code Blocks
      </div>
      <div>
        <div>Default:</div>
        <CodeBlock code={MALLOY_TEXT} language="malloy" />
      </div>
      <div>
        <div>Single Spaced + No Line Numbers:</div>
        <CodeBlock
          code={MALLOY_TEXT}
          language="malloy"
          lineNumbers={false}
          spacing="single"
        />
      </div>
      <div>
        <div>SQL (space constrained):</div>
        <div style={{width: '100px', height: '100px'}}>
          <CodeBlock code={SQL_TEXT} language="sql" />
        </div>
      </div>
    </>
  );
}
