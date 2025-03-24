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
      <h4>Code Blocks</h4>
      <div style={{margin: '40px'}}>
        <div>
          <div>Default:</div>
          <CodeBlock code={MALLOY_TEXT} language="malloy" />
        </div>
        <div>
          <div>Single Spaced:</div>
          <CodeBlock code={MALLOY_TEXT} language="malloy" spacing="single" />
        </div>
        <div>
          <div>No Line Numbers:</div>
          <CodeBlock code={MALLOY_TEXT} language="malloy" lineNumbers={false} />
        </div>
        <div>
          <div>SQL:</div>
          <CodeBlock code={SQL_TEXT} language="sql" />
        </div>
      </div>
    </>
  );
}
