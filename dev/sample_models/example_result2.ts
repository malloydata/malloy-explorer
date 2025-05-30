import * as Malloy from '@malloydata/malloy-interfaces';

export const exampleResult: Malloy.Result = {
  schema: {
    fields: [
      {
        kind: 'dimension',
        name: 'name',
        type: {
          kind: 'string_type',
        },
        annotations: [
          {
            value: `#(malloy) reference_id = "2e6ae714-7e0f-4f9c-8872-f91603300f07" drill_view = top_origins drill_expression = "concat(code, '-', full_name )"
`,
          },
        ],
      },
      {
        kind: 'dimension',
        name: 'flight_count',
        type: {
          kind: 'number_type',
          subtype: 'integer',
        },
        annotations: [
          {
            value: `#(malloy) reference_id = "886168f0-d551-42f1-90fc-17417964005f" calculation drill_view = top_origins
`,
          },
        ],
      },
      {
        kind: 'dimension',
        name: 'destination_count',
        type: {
          kind: 'number_type',
          subtype: 'integer',
        },
        annotations: [
          {
            value: `#(malloy) reference_id = "40b6c562-4be3-436e-b0d4-f0adda58aca9" calculation drill_view = top_origins
`,
          },
        ],
      },
      {
        kind: 'dimension',
        name: 'carrier_count',
        type: {
          kind: 'number_type',
          subtype: 'integer',
        },
        annotations: [
          {
            value: `#(malloy) reference_id = "4664a400-50fa-48c0-b100-039884b35989" calculation drill_view = top_origins
`,
          },
        ],
      },
      {
        kind: 'dimension',
        name: 'percent_of_flights',
        type: {
          kind: 'number_type',
          subtype: undefined,
        },
        annotations: [
          {
            value: `#(malloy) reference_id = "52d101f2-c0d1-4c6e-95c8-81c18cff9a5c" calculation drill_view = top_origins
`,
          },
        ],
      },
    ],
  },
  data: {
    kind: 'array_cell',
    array_value: [
      {
        kind: 'record_cell',
        record_value: [
          {
            kind: 'string_cell',
            string_value: 'ATL-THE WILLIAM B HARTSFIELD ATLANTA INTL',
          },
          {
            kind: 'number_cell',
            number_value: 17875,
          },
          {
            kind: 'number_cell',
            number_value: 134,
          },
          {
            kind: 'number_cell',
            number_value: 12,
          },
          {
            kind: 'number_cell',
            number_value: 5.183758812389981,
          },
        ],
      },
      {
        kind: 'record_cell',
        record_value: [
          {
            kind: 'string_cell',
            string_value: 'DFW-DALLAS/FORT WORTH INTERNATIONAL',
          },
          {
            kind: 'number_cell',
            number_value: 17782,
          },
          {
            kind: 'number_cell',
            number_value: 115,
          },
          {
            kind: 'number_cell',
            number_value: 13,
          },
          {
            kind: 'number_cell',
            number_value: 5.156788766540903,
          },
        ],
      },
      {
        kind: 'record_cell',
        record_value: [
          {
            kind: 'string_cell',
            string_value: "ORD-CHICAGO O'HARE INTL",
          },
          {
            kind: 'number_cell',
            number_value: 14214,
          },
          {
            kind: 'number_cell',
            number_value: 91,
          },
          {
            kind: 'number_cell',
            number_value: 10,
          },
          {
            kind: 'number_cell',
            number_value: 4.1220670075139125,
          },
        ],
      },
      {
        kind: 'record_cell',
        record_value: [
          {
            kind: 'string_cell',
            string_value: 'PHX-PHOENIX SKY HARBOR INTL',
          },
          {
            kind: 'number_cell',
            number_value: 12476,
          },
          {
            kind: 'number_cell',
            number_value: 63,
          },
          {
            kind: 'number_cell',
            number_value: 12,
          },
          {
            kind: 'number_cell',
            number_value: 3.6180461506784565,
          },
        ],
      },
      {
        kind: 'record_cell',
        record_value: [
          {
            kind: 'string_cell',
            string_value: 'LAS-MC CARRAN INTL',
          },
          {
            kind: 'number_cell',
            number_value: 11096,
          },
          {
            kind: 'number_cell',
            number_value: 74,
          },
          {
            kind: 'number_cell',
            number_value: 10,
          },
          {
            kind: 'number_cell',
            number_value: 3.2178454703372994,
          },
        ],
      },
    ],
  },
  connection_name: 'duckdb',
  annotations: [
    {
      value: `#(malloy) limit = 5 drillable ordered_by = [{ flight_count = desc }]
`,
    },
    {
      value: `#(malloy) source.name = flights
`,
    },
    {
      value: `#(malloy) query_name = top_origins
`,
    },
  ],
  query_timezone: undefined,
  sql: `WITH __stage0 AS (
  SELECT
    group_set,
    CASE WHEN group_set=1 THEN
      CONCAT(origin_0."code",'-',origin_0."full_name")
      END as "name__1",
    CASE WHEN group_set=1 THEN
      COUNT(1)
      END as "flight_count__1",
    (CASE WHEN group_set=1 THEN
      COUNT(DISTINCT destination_0."code")
      END) as "destination_count__1",
    CASE WHEN group_set=1 THEN
      COUNT(DISTINCT carriers_0."code")
      END as "carrier_count__1",
    ((CASE WHEN group_set=1 THEN
      COUNT(1)
      END)*1.0/MAX((CASE WHEN group_set=0 THEN
      COUNT(1)
      END)) OVER ())*100 as "percent_of_flights__1"
  FROM '../data/flights.parquet' as base
   LEFT JOIN '../data/airports.parquet' AS origin_0
    ON origin_0."code"=base."origin"
   LEFT JOIN '../data/airports.parquet' AS destination_0
    ON destination_0."code"=base."destination"
   LEFT JOIN '../data/carriers.parquet' AS carriers_0
    ON carriers_0."code"=base."carrier"
  CROSS JOIN (SELECT UNNEST(GENERATE_SERIES(0,1,1)) as group_set  ) as group_set
  GROUP BY 1,2
)
SELECT
  "name__1" as "name",
  MAX(CASE WHEN group_set=1 THEN "flight_count__1" END) as "flight_count",
  MAX(CASE WHEN group_set=1 THEN "destination_count__1" END) as "destination_count",
  MAX(CASE WHEN group_set=1 THEN "carrier_count__1" END) as "carrier_count",
  MAX(CASE WHEN group_set=1 THEN "percent_of_flights__1" END) as "percent_of_flights"
FROM __stage0
WHERE group_set NOT IN (0)
GROUP BY 1
ORDER BY 2 desc NULLS LAST
LIMIT 5
`,
};
