import * as Malloy from '@malloydata/malloy-interfaces';

export const modelInfo: Malloy.ModelInfo = {
  entries: [
    {
      kind: 'source',
      name: 'carriers',
      schema: {
        fields: [
          {
            kind: 'dimension',
            name: 'code',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'name',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'nickname',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'measure',
            name: 'carrier_count',
            type: {kind: 'number_type', subtype: 'integer'},
            annotations: undefined,
          },
        ],
      },
    },
    {
      kind: 'source',
      name: 'airports',
      schema: {
        fields: [
          {
            kind: 'dimension',
            name: 'id',
            type: {kind: 'number_type', subtype: 'integer'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'code',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'site_number',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'fac_type',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'fac_use',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'faa_region',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'faa_dist',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'city',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'county',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'state',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'full_name',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'own_type',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'longitude',
            type: {kind: 'number_type', subtype: 'decimal'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'latitude',
            type: {kind: 'number_type', subtype: 'decimal'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'elevation',
            type: {kind: 'number_type', subtype: 'integer'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'aero_cht',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'cbd_dist',
            type: {kind: 'number_type', subtype: 'integer'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'cbd_dir',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'act_date',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'cert',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'fed_agree',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'cust_intl',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'c_ldg_rts',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'joint_use',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'mil_rts',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'cntl_twr',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'major',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'measure',
            name: 'airport_count',
            type: {kind: 'number_type', subtype: 'integer'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'name',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
        ],
      },
    },
    {
      kind: 'source',
      name: 'aircraft_models',
      schema: {
        fields: [
          {
            kind: 'dimension',
            name: 'aircraft_model_code',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'manufacturer',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'model',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'aircraft_type_id',
            type: {kind: 'number_type', subtype: 'integer'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'aircraft_engine_type_id',
            type: {kind: 'number_type', subtype: 'integer'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'aircraft_category_id',
            type: {kind: 'number_type', subtype: 'integer'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'amateur',
            type: {kind: 'number_type', subtype: 'integer'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'engines',
            type: {kind: 'number_type', subtype: 'integer'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'seats',
            type: {kind: 'number_type', subtype: 'integer'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'weight',
            type: {kind: 'number_type', subtype: 'integer'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'speed',
            type: {kind: 'number_type', subtype: 'integer'},
            annotations: undefined,
          },
          {
            kind: 'measure',
            name: 'aircraft_model_count',
            type: {kind: 'number_type', subtype: 'integer'},
            annotations: undefined,
          },
        ],
      },
    },
    {
      kind: 'source',
      name: 'aircraft',
      schema: {
        fields: [
          {
            kind: 'dimension',
            name: 'id',
            type: {kind: 'number_type', subtype: 'integer'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'tail_num',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'aircraft_serial',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'aircraft_model_code',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'aircraft_engine_code',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'year_built',
            type: {kind: 'number_type', subtype: 'integer'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'aircraft_type_id',
            type: {kind: 'number_type', subtype: 'integer'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'aircraft_engine_type_id',
            type: {kind: 'number_type', subtype: 'integer'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'registrant_type_id',
            type: {kind: 'number_type', subtype: 'integer'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'name',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'address1',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'address2',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'city',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'state',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'zip',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'region',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'county',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'country',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'certification',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'status_code',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'mode_s_code',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'fract_owner',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'last_action_date',
            type: {kind: 'date_type', timeframe: undefined},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'cert_issue_date',
            type: {kind: 'date_type', timeframe: undefined},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'air_worth_date',
            type: {kind: 'date_type', timeframe: undefined},
            annotations: undefined,
          },
          {
            kind: 'measure',
            name: 'aircraft_count',
            type: {kind: 'number_type', subtype: 'integer'},
            annotations: undefined,
          },
          {
            kind: 'join',
            name: 'aircraft_models',
            annotations: undefined,
            schema: {
              fields: [
                {
                  kind: 'dimension',
                  name: 'aircraft_model_code',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'manufacturer',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'model',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'aircraft_type_id',
                  type: {kind: 'number_type', subtype: 'integer'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'aircraft_engine_type_id',
                  type: {kind: 'number_type', subtype: 'integer'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'aircraft_category_id',
                  type: {kind: 'number_type', subtype: 'integer'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'amateur',
                  type: {kind: 'number_type', subtype: 'integer'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'engines',
                  type: {kind: 'number_type', subtype: 'integer'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'seats',
                  type: {kind: 'number_type', subtype: 'integer'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'weight',
                  type: {kind: 'number_type', subtype: 'integer'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'speed',
                  type: {kind: 'number_type', subtype: 'integer'},
                  annotations: undefined,
                },
                {
                  kind: 'measure',
                  name: 'aircraft_model_count',
                  type: {kind: 'number_type', subtype: 'integer'},
                  annotations: undefined,
                },
              ],
            },
            relationship: 'one',
          },
        ],
      },
    },
    {
      kind: 'source',
      name: 'flights',
      parameters: [
        {
          name: 'selected_carrier',
          type: {kind: 'string_type'},
          default_value: {kind: 'string_literal', string_value: 'AA'},
        },
      ],
      schema: {
        fields: [
          {
            kind: 'dimension',
            name: 'carrier',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'flight_num',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'flight_time',
            type: {kind: 'number_type', subtype: 'integer'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'tail_num',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'dep_time',
            type: {kind: 'timestamp_type', timeframe: undefined},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'arr_time',
            type: {kind: 'timestamp_type', timeframe: undefined},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'dep_delay',
            type: {kind: 'number_type', subtype: 'integer'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'arr_delay',
            type: {kind: 'number_type', subtype: 'integer'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'taxi_out',
            type: {kind: 'number_type', subtype: 'integer'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'taxi_in',
            type: {kind: 'number_type', subtype: 'integer'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'distance',
            type: {kind: 'number_type', subtype: 'integer'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'cancelled',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'diverted',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'id2',
            type: {kind: 'number_type', subtype: 'integer'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'origin_code',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'dimension',
            name: 'destination_code',
            type: {kind: 'string_type'},
            annotations: undefined,
          },
          {
            kind: 'measure',
            name: 'flight_count',
            type: {kind: 'number_type', subtype: 'integer'},
            annotations: undefined,
          },
          {
            kind: 'measure',
            name: 'total_distance',
            type: {kind: 'number_type', subtype: 'integer'},
            annotations: undefined,
          },
          {
            kind: 'measure',
            name: 'destination_count',
            type: {kind: 'number_type', subtype: 'integer'},
            annotations: undefined,
          },
          {
            kind: 'measure',
            name: 'origin_count',
            type: {kind: 'number_type', subtype: 'integer'},
            annotations: undefined,
          },
          {
            kind: 'measure',
            name: 'seats_for_sale',
            type: {kind: 'number_type', subtype: 'integer'},
            annotations: undefined,
          },
          {
            kind: 'measure',
            name: 'seats_owned',
            type: {kind: 'number_type', subtype: 'integer'},
            annotations: undefined,
          },
          {
            kind: 'measure',
            name: 'average_plane_size',
            type: {kind: 'number_type', subtype: 'integer'},
            annotations: undefined,
          },
          {
            kind: 'measure',
            name: 'average_flight_distance',
            type: {kind: 'number_type', subtype: 'integer'},
            annotations: undefined,
          },
          {
            kind: 'join',
            name: 'carriers',
            annotations: undefined,
            schema: {
              fields: [
                {
                  kind: 'dimension',
                  name: 'code',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'name',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'nickname',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'measure',
                  name: 'carrier_count',
                  type: {kind: 'number_type', subtype: 'integer'},
                  annotations: undefined,
                },
              ],
            },
            relationship: 'one',
          },
          {
            kind: 'join',
            name: 'origin',
            annotations: undefined,
            schema: {
              fields: [
                {
                  kind: 'dimension',
                  name: 'id',
                  type: {kind: 'number_type', subtype: 'integer'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'code',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'site_number',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'fac_type',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'fac_use',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'faa_region',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'faa_dist',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'city',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'county',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'state',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'full_name',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'own_type',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'longitude',
                  type: {kind: 'number_type', subtype: 'decimal'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'latitude',
                  type: {kind: 'number_type', subtype: 'decimal'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'elevation',
                  type: {kind: 'number_type', subtype: 'integer'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'aero_cht',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'cbd_dist',
                  type: {kind: 'number_type', subtype: 'integer'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'cbd_dir',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'act_date',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'cert',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'fed_agree',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'cust_intl',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'c_ldg_rts',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'joint_use',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'mil_rts',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'cntl_twr',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'major',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'measure',
                  name: 'airport_count',
                  type: {kind: 'number_type', subtype: 'integer'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'name',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
              ],
            },
            relationship: 'one',
          },
          {
            kind: 'join',
            name: 'destination',
            annotations: undefined,
            schema: {
              fields: [
                {
                  kind: 'dimension',
                  name: 'id',
                  type: {kind: 'number_type', subtype: 'integer'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'code',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'site_number',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'fac_type',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'fac_use',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'faa_region',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'faa_dist',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'city',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'county',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'state',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'full_name',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'own_type',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'longitude',
                  type: {kind: 'number_type', subtype: 'decimal'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'latitude',
                  type: {kind: 'number_type', subtype: 'decimal'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'elevation',
                  type: {kind: 'number_type', subtype: 'integer'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'aero_cht',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'cbd_dist',
                  type: {kind: 'number_type', subtype: 'integer'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'cbd_dir',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'act_date',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'cert',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'fed_agree',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'cust_intl',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'c_ldg_rts',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'joint_use',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'mil_rts',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'cntl_twr',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'major',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'measure',
                  name: 'airport_count',
                  type: {kind: 'number_type', subtype: 'integer'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'name',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
              ],
            },
            relationship: 'one',
          },
          {
            kind: 'join',
            name: 'aircraft',
            annotations: undefined,
            schema: {
              fields: [
                {
                  kind: 'dimension',
                  name: 'id',
                  type: {kind: 'number_type', subtype: 'integer'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'tail_num',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'aircraft_serial',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'aircraft_model_code',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'aircraft_engine_code',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'year_built',
                  type: {kind: 'number_type', subtype: 'integer'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'aircraft_type_id',
                  type: {kind: 'number_type', subtype: 'integer'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'aircraft_engine_type_id',
                  type: {kind: 'number_type', subtype: 'integer'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'registrant_type_id',
                  type: {kind: 'number_type', subtype: 'integer'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'name',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'address1',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'address2',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'city',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'state',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'zip',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'region',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'county',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'country',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'certification',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'status_code',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'mode_s_code',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'fract_owner',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'last_action_date',
                  type: {kind: 'date_type', timeframe: undefined},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'cert_issue_date',
                  type: {kind: 'date_type', timeframe: undefined},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'air_worth_date',
                  type: {kind: 'date_type', timeframe: undefined},
                  annotations: undefined,
                },
                {
                  kind: 'measure',
                  name: 'aircraft_count',
                  type: {kind: 'number_type', subtype: 'integer'},
                  annotations: undefined,
                },
                {
                  kind: 'join',
                  name: 'aircraft_models',
                  annotations: undefined,
                  schema: {
                    fields: [
                      {
                        kind: 'dimension',
                        name: 'aircraft_model_code',
                        type: {kind: 'string_type'},
                        annotations: undefined,
                      },
                      {
                        kind: 'dimension',
                        name: 'manufacturer',
                        type: {kind: 'string_type'},
                        annotations: undefined,
                      },
                      {
                        kind: 'dimension',
                        name: 'model',
                        type: {kind: 'string_type'},
                        annotations: undefined,
                      },
                      {
                        kind: 'dimension',
                        name: 'aircraft_type_id',
                        type: {
                          kind: 'number_type',
                          subtype: 'integer',
                        },
                        annotations: undefined,
                      },
                      {
                        kind: 'dimension',
                        name: 'aircraft_engine_type_id',
                        type: {
                          kind: 'number_type',
                          subtype: 'integer',
                        },
                        annotations: undefined,
                      },
                      {
                        kind: 'dimension',
                        name: 'aircraft_category_id',
                        type: {
                          kind: 'number_type',
                          subtype: 'integer',
                        },
                        annotations: undefined,
                      },
                      {
                        kind: 'dimension',
                        name: 'amateur',
                        type: {
                          kind: 'number_type',
                          subtype: 'integer',
                        },
                        annotations: undefined,
                      },
                      {
                        kind: 'dimension',
                        name: 'engines',
                        type: {
                          kind: 'number_type',
                          subtype: 'integer',
                        },
                        annotations: undefined,
                      },
                      {
                        kind: 'dimension',
                        name: 'seats',
                        type: {
                          kind: 'number_type',
                          subtype: 'integer',
                        },
                        annotations: undefined,
                      },
                      {
                        kind: 'dimension',
                        name: 'weight',
                        type: {
                          kind: 'number_type',
                          subtype: 'integer',
                        },
                        annotations: undefined,
                      },
                      {
                        kind: 'dimension',
                        name: 'speed',
                        type: {
                          kind: 'number_type',
                          subtype: 'integer',
                        },
                        annotations: undefined,
                      },
                      {
                        kind: 'measure',
                        name: 'aircraft_model_count',
                        type: {
                          kind: 'number_type',
                          subtype: 'integer',
                        },
                        annotations: undefined,
                      },
                    ],
                  },
                  relationship: 'one',
                },
              ],
            },
            relationship: 'one',
          },
          {
            kind: 'view',
            name: 'top_carriers',
            annotations: [
              {
                value: '#" Carriers by flight count and percentage of total.\n',
              },
              {
                value: '#(malloy) ordered_by = [{ flight_count = desc }]\n',
              },
            ],
            schema: {
              fields: [
                {
                  kind: 'dimension',
                  name: 'nickname',
                  type: {kind: 'string_type'},
                  annotations: [
                    {
                      value:
                        '#(malloy) reference_id = "40ec045e-61e7-4e76-b542-89f694c411e8" drill_expression = "carriers.nickname"\n',
                    },
                  ],
                },
                {
                  kind: 'dimension',
                  name: 'flight_count',
                  type: {kind: 'number_type', subtype: 'integer'},
                  annotations: [
                    {
                      value:
                        '#(malloy) reference_id = "a363cfe3-c314-4d3b-9577-da42d9d9c501" calculation drill_filters = []\n',
                    },
                  ],
                },
                {
                  kind: 'dimension',
                  name: 'destination_count',
                  type: {kind: 'number_type', subtype: 'integer'},
                  annotations: [
                    {
                      value:
                        '#(malloy) reference_id = "489d67fd-5d7f-4656-83ef-76f834c834b5" calculation drill_filters = []\n',
                    },
                  ],
                },
                {
                  kind: 'dimension',
                  name: 'percentage_of_flights',
                  type: {kind: 'number_type', subtype: undefined},
                  annotations: [
                    {
                      value:
                        '#(malloy) reference_id = "e0c695d9-2d29-458f-ade2-9c24b512b957" calculation drill_filters = []\n',
                    },
                  ],
                },
              ],
            },
          },
          {
            kind: 'view',
            name: 'carriers_over_time',
            annotations: [
              {value: '#" Flight counts by carrier as a function of time. \n'},
              {value: '# line_chart\n'},
              {
                value:
                  '#(malloy) limit = 10000 ordered_by = [{ dep_month = desc }]\n',
              },
            ],
            schema: {
              fields: [
                {
                  kind: 'dimension',
                  name: 'dep_month',
                  type: {
                    kind: 'timestamp_type',
                    timeframe: 'month',
                  },
                  annotations: [
                    {
                      value:
                        '#(malloy) reference_id = "a2fbc839-8d61-4f2d-8d41-eba4a22a5983" drill_expression = "dep_time.month"\n',
                    },
                  ],
                },
                {
                  kind: 'dimension',
                  name: 'flight_count',
                  type: {kind: 'number_type', subtype: 'integer'},
                  annotations: [
                    {
                      value:
                        '#(malloy) reference_id = "ea75c39c-6fe0-4d12-8408-4eeac0fe0270" calculation drill_filters = []\n',
                    },
                  ],
                },
                {
                  kind: 'dimension',
                  name: 'nickname',
                  type: {kind: 'string_type'},
                  annotations: [
                    {
                      value:
                        '#(malloy) reference_id = "d0fd1224-dc45-4af8-b6d1-ab1818d21d55" drill_expression = "carriers.nickname"\n',
                    },
                  ],
                },
              ],
            },
          },
          {
            kind: 'view',
            name: 'top_origins',
            annotations: [
              {
                value:
                  '#(malloy) limit = 5 ordered_by = [{ flight_count = desc }]\n',
              },
            ],
            schema: {
              fields: [
                {
                  kind: 'dimension',
                  name: 'name',
                  type: {kind: 'string_type'},
                  annotations: [
                    {
                      value: `#(malloy) reference_id = "b10ae8ed-8a03-479e-8d37-f009f71d3bf9" drill_expression = "concat(code, '-', full_name )"\n`,
                    },
                  ],
                },
                {
                  kind: 'dimension',
                  name: 'flight_count',
                  type: {kind: 'number_type', subtype: 'integer'},
                  annotations: [
                    {
                      value:
                        '#(malloy) reference_id = "e56635d7-11dd-496a-adc8-ae0750f91429" calculation drill_filters = []\n',
                    },
                  ],
                },
                {
                  kind: 'dimension',
                  name: 'destination_count',
                  type: {kind: 'number_type', subtype: 'integer'},
                  annotations: [
                    {
                      value:
                        '#(malloy) reference_id = "17f3ab0f-c227-4b5f-a69f-7fbe2693c444" calculation drill_filters = []\n',
                    },
                  ],
                },
                {
                  kind: 'dimension',
                  name: 'carrier_count',
                  type: {kind: 'number_type', subtype: 'integer'},
                  annotations: [
                    {
                      value:
                        '#(malloy) reference_id = "2856fc01-d049-4530-8be2-3e290885f998" calculation drill_filters = []\n',
                    },
                  ],
                },
                {
                  kind: 'dimension',
                  name: 'percent_of_flights',
                  type: {kind: 'number_type', subtype: undefined},
                  annotations: [
                    {
                      value:
                        '#(malloy) reference_id = "8c8dc6d6-08ed-48e0-b246-5bb04076148d" calculation drill_filters = []\n',
                    },
                  ],
                },
              ],
            },
          },
          {
            kind: 'view',
            name: 'top_destinations',
            annotations: [
              {
                value:
                  '#(malloy) limit = 5 ordered_by = [{ flight_count = desc }]\n',
              },
            ],
            schema: {
              fields: [
                {
                  kind: 'dimension',
                  name: 'code',
                  type: {kind: 'string_type'},
                  annotations: [
                    {
                      value:
                        '#(malloy) reference_id = "e7d72f1b-7f03-4ded-8443-9ed55b25bc97" drill_expression = "destination.code"\n',
                    },
                  ],
                },
                {
                  kind: 'dimension',
                  name: 'full_name',
                  type: {kind: 'string_type'},
                  annotations: [
                    {
                      value:
                        '#(malloy) reference_id = "ae1db541-507a-4b8f-ac16-bc725712fe90" drill_expression = "destination.full_name"\n',
                    },
                  ],
                },
                {
                  kind: 'dimension',
                  name: 'flight_count',
                  type: {kind: 'number_type', subtype: 'integer'},
                  annotations: [
                    {
                      value:
                        '#(malloy) reference_id = "4cca31d8-7c6e-4768-88b6-5debc7397af3" calculation drill_filters = []\n',
                    },
                  ],
                },
                {
                  kind: 'dimension',
                  name: 'percent_of_flights_to_destination',
                  type: {kind: 'number_type', subtype: undefined},
                  annotations: [
                    {
                      value:
                        '#(malloy) reference_id = "fd74668d-665d-4da7-b94c-fe60171777ce" calculation drill_filters = []\n',
                    },
                  ],
                },
              ],
            },
          },
          {
            kind: 'view',
            name: 'by_month',
            annotations: [
              {value: '# line_chart\n'},
              {
                value: '#(malloy) ordered_by = [{ dep_month = desc }]\n',
              },
            ],
            schema: {
              fields: [
                {
                  kind: 'dimension',
                  name: 'dep_month',
                  type: {
                    kind: 'timestamp_type',
                    timeframe: 'month',
                  },
                  annotations: [
                    {
                      value:
                        '#(malloy) reference_id = "241ef7ec-16ab-4221-9085-a334ca9c3847" drill_expression = "dep_time.month"\n',
                    },
                  ],
                },
                {
                  kind: 'dimension',
                  name: 'flight_count',
                  type: {kind: 'number_type', subtype: 'integer'},
                  annotations: [
                    {
                      value:
                        '#(malloy) reference_id = "6ae419d2-c3ea-4d97-979a-44b7b23a53dd" calculation drill_filters = []\n',
                    },
                  ],
                },
              ],
            },
          },
          {
            kind: 'view',
            name: 'by_manufacturer',
            annotations: [
              {
                value:
                  '#(malloy) limit = 3 ordered_by = [{ flight_count = desc }]\n',
              },
            ],
            schema: {
              fields: [
                {
                  kind: 'dimension',
                  name: 'manufacturer',
                  type: {kind: 'string_type'},
                  annotations: [
                    {
                      value:
                        '#(malloy) reference_id = "334b3e54-d8aa-4a05-a008-dae77e019dea" drill_expression = "aircraft.aircraft_models.manufacturer"\n',
                    },
                  ],
                },
                {
                  kind: 'dimension',
                  name: 'flight_count',
                  type: {kind: 'number_type', subtype: 'integer'},
                  annotations: [
                    {
                      value:
                        '#(malloy) reference_id = "425221e4-f789-4bf9-a105-74076f6c75df" calculation drill_filters = []\n',
                    },
                  ],
                },
                {
                  kind: 'dimension',
                  name: 'aircraft_count',
                  type: {kind: 'number_type', subtype: 'integer'},
                  annotations: [
                    {
                      value:
                        '#(malloy) reference_id = "7f3be727-d9bc-46e0-ac22-c7aabd6bfc76" calculation drill_filters = []\n',
                    },
                  ],
                },
              ],
            },
          },
          {
            kind: 'view',
            name: 'top_routes_map',
            annotations: [{value: '# segment_map\n'}],
            schema: {
              fields: [
                {
                  kind: 'dimension',
                  name: 'latitude',
                  type: {kind: 'number_type', subtype: 'decimal'},
                  annotations: [
                    {
                      value:
                        '#(malloy) reference_id = "463add0d-63cb-4414-98e0-04772718a9ec" drill_expression = "origin.latitude"\n',
                    },
                  ],
                },
                {
                  kind: 'dimension',
                  name: 'longitude',
                  type: {kind: 'number_type', subtype: 'decimal'},
                  annotations: [
                    {
                      value:
                        '#(malloy) reference_id = "89ed012e-0a16-4e73-82d9-1e926aa8d820" drill_expression = "origin.longitude"\n',
                    },
                  ],
                },
                {
                  kind: 'dimension',
                  name: 'latitude2',
                  type: {kind: 'number_type', subtype: 'decimal'},
                  annotations: [
                    {
                      value:
                        '#(malloy) reference_id = "19187ff6-f236-423d-ac2a-cfbcc37ef588" drill_expression = "destination.latitude"\n',
                    },
                  ],
                },
                {
                  kind: 'dimension',
                  name: 'longitude2',
                  type: {kind: 'number_type', subtype: 'decimal'},
                  annotations: [
                    {
                      value:
                        '#(malloy) reference_id = "eca3bd16-a83d-493f-b89a-6a05214f4863" drill_expression = "destination.longitude"\n',
                    },
                  ],
                },
                {
                  kind: 'dimension',
                  name: 'flight_count',
                  type: {kind: 'number_type', subtype: 'integer'},
                  annotations: [
                    {
                      value:
                        '#(malloy) reference_id = "f6500cfa-4d42-4eb5-8c52-6530c614e892" calculation drill_filters = []\n',
                    },
                  ],
                },
              ],
            },
          },
          {
            kind: 'view',
            name: 'carrier_dashboard',
            annotations: [
              {value: '# dashboard\n'},
              {
                value:
                  '#(malloy) ordered_by = [{ destination_count = desc }]\n',
              },
            ],
            schema: {
              fields: [
                {
                  kind: 'dimension',
                  name: 'destination_count',
                  type: {kind: 'number_type', subtype: 'integer'},
                  annotations: [
                    {
                      value:
                        '#(malloy) reference_id = "2a412213-6b97-4b9d-946a-1075545a7349" calculation drill_filters = []\n',
                    },
                  ],
                },
                {
                  kind: 'dimension',
                  name: 'flight_count',
                  type: {kind: 'number_type', subtype: 'integer'},
                  annotations: [
                    {
                      value:
                        '#(malloy) reference_id = "74588457-7f3f-4dbc-a834-820785a8c793" calculation drill_filters = []\n',
                    },
                  ],
                },
                {
                  kind: 'dimension',
                  name: 'by_manufacturer',
                  type: {
                    kind: 'array_type',
                    element_type: {
                      kind: 'record_type',
                      fields: [
                        {
                          name: 'manufacturer',
                          annotations: [
                            {
                              value:
                                '#(malloy) reference_id = "2054e2bc-dfa7-435e-abd6-f66cea4d17f6" drill_expression = "aircraft.aircraft_models.manufacturer"\n',
                            },
                          ],
                          type: {kind: 'string_type'},
                        },
                        {
                          name: 'flight_count',
                          annotations: [
                            {
                              value:
                                '#(malloy) reference_id = "74588457-7f3f-4dbc-a834-820785a8c793" calculation drill_filters = []\n',
                            },
                          ],
                          type: {
                            kind: 'number_type',
                            subtype: 'integer',
                          },
                        },
                        {
                          name: 'aircraft_count',
                          annotations: [
                            {
                              value:
                                '#(malloy) reference_id = "32ee19c1-54e6-4150-ad2b-9337d8e941a3" calculation drill_filters = []\n',
                            },
                          ],
                          type: {
                            kind: 'number_type',
                            subtype: 'integer',
                          },
                        },
                      ],
                    },
                  },
                  annotations: [{value: '#(malloy) drill_filters = []\n'}],
                },
                {
                  kind: 'dimension',
                  name: 'by_month',
                  type: {
                    kind: 'array_type',
                    element_type: {
                      kind: 'record_type',
                      fields: [
                        {
                          name: 'dep_month',
                          annotations: [
                            {
                              value:
                                '#(malloy) reference_id = "7a0e3403-1ee6-4929-b6b3-d20455e45942" drill_expression = "dep_time.month"\n',
                            },
                          ],
                          type: {
                            kind: 'timestamp_type',
                            timeframe: 'month',
                          },
                        },
                        {
                          name: 'flight_count',
                          annotations: [
                            {
                              value:
                                '#(malloy) reference_id = "74588457-7f3f-4dbc-a834-820785a8c793" calculation drill_filters = []\n',
                            },
                          ],
                          type: {
                            kind: 'number_type',
                            subtype: 'integer',
                          },
                        },
                      ],
                    },
                  },
                  annotations: [
                    {value: '# line_chart\n'},
                    {value: '#(malloy) drill_filters = []\n'},
                  ],
                },
                {
                  kind: 'dimension',
                  name: 'hubs',
                  type: {
                    kind: 'array_type',
                    element_type: {
                      kind: 'record_type',
                      fields: [
                        {
                          name: 'hub',
                          annotations: [
                            {
                              value:
                                '#(malloy) reference_id = "07314881-06d0-4be4-8023-15dadaa93afb" drill_expression = "origin.name"\n',
                            },
                          ],
                          type: {kind: 'string_type'},
                        },
                        {
                          name: 'destination_count',
                          annotations: [
                            {
                              value:
                                '#(malloy) reference_id = "2a412213-6b97-4b9d-946a-1075545a7349" calculation drill_filters = []\n',
                            },
                          ],
                          type: {
                            kind: 'number_type',
                            subtype: 'integer',
                          },
                        },
                        {
                          name: 'flight_count',
                          annotations: [
                            {
                              value:
                                '#(malloy) reference_id = "74588457-7f3f-4dbc-a834-820785a8c793" calculation drill_filters = []\n',
                            },
                          ],
                          type: {
                            kind: 'number_type',
                            subtype: 'integer',
                          },
                        },
                      ],
                    },
                  },
                  annotations: [{value: '#(malloy) drill_filters = []\n'}],
                },
                {
                  kind: 'dimension',
                  name: 'origin_dashboard',
                  type: {
                    kind: 'array_type',
                    element_type: {
                      kind: 'record_type',
                      fields: [
                        {
                          name: 'code',
                          annotations: [
                            {
                              value:
                                '#(malloy) reference_id = "8fcab13d-900f-4b9f-b51c-254e8ed64574" drill_expression = origin_code\n',
                            },
                          ],
                          type: {kind: 'string_type'},
                        },
                        {
                          name: 'origin',
                          annotations: [
                            {
                              value:
                                '#(malloy) reference_id = "fec0daea-b83d-485b-b229-f928c1ce02ff" drill_expression = "origin.full_name"\n',
                            },
                          ],
                          type: {kind: 'string_type'},
                        },
                        {
                          name: 'city',
                          annotations: [
                            {
                              value:
                                '#(malloy) reference_id = "25398eae-4651-480f-bd07-543ec9526293" drill_expression = "origin.city"\n',
                            },
                          ],
                          type: {kind: 'string_type'},
                        },
                        {
                          name: 'flight_count',
                          annotations: [
                            {
                              value:
                                '#(malloy) reference_id = "74588457-7f3f-4dbc-a834-820785a8c793" calculation drill_filters = []\n',
                            },
                          ],
                          type: {
                            kind: 'number_type',
                            subtype: 'integer',
                          },
                        },
                        {
                          name: 'destinations_by_month',
                          annotations: [
                            {
                              value: '#(malloy) drill_filters = []\n',
                            },
                            {value: '# line_chart\n'},
                          ],
                          type: {
                            kind: 'array_type',
                            element_type: {
                              kind: 'record_type',
                              fields: [
                                {
                                  name: 'dep_month',
                                  annotations: [
                                    {
                                      value:
                                        '#(malloy) reference_id = "c1e95325-5684-45cc-b5aa-484a1079c088" drill_expression = "dep_time.month"\n',
                                    },
                                  ],
                                  type: {
                                    kind: 'timestamp_type',
                                    timeframe: 'month',
                                  },
                                },
                                {
                                  name: 'flight_count',
                                  annotations: [
                                    {
                                      value:
                                        '#(malloy) reference_id = "74588457-7f3f-4dbc-a834-820785a8c793" calculation drill_filters = []\n',
                                    },
                                  ],
                                  type: {
                                    kind: 'number_type',
                                    subtype: 'integer',
                                  },
                                },
                                {
                                  name: 'name',
                                  annotations: [
                                    {
                                      value: `#(malloy) reference_id = "40db4e68-7ad5-4e6a-9cda-7856d3296bfa" drill_expression = "concat(code, '-', full_name )"\n`,
                                    },
                                  ],
                                  type: {kind: 'string_type'},
                                },
                              ],
                            },
                          },
                        },
                        {
                          name: 'top_routes_map',
                          annotations: [
                            {
                              value: '#(malloy) drill_filters = []\n',
                            },
                            {value: '# segment_map\n'},
                          ],
                          type: {
                            kind: 'array_type',
                            element_type: {
                              kind: 'record_type',
                              fields: [
                                {
                                  name: 'latitude',
                                  annotations: [
                                    {
                                      value:
                                        '#(malloy) reference_id = "4e44d689-be1c-4a46-9cec-822afeb00b20" drill_expression = latitude\n',
                                    },
                                  ],
                                  type: {
                                    kind: 'number_type',
                                    subtype: 'decimal',
                                  },
                                },
                                {
                                  name: 'longitude',
                                  annotations: [
                                    {
                                      value:
                                        '#(malloy) reference_id = "05e3ac8e-cd6f-40e1-a94d-d80588fee1e8" drill_expression = longitude\n',
                                    },
                                  ],
                                  type: {
                                    kind: 'number_type',
                                    subtype: 'decimal',
                                  },
                                },
                                {
                                  name: 'latitude2',
                                  annotations: [
                                    {
                                      value:
                                        '#(malloy) reference_id = "e7ef1909-9e8e-4b24-97f0-855a233d1ade" drill_expression = latitude2\n',
                                    },
                                  ],
                                  type: {
                                    kind: 'number_type',
                                    subtype: 'decimal',
                                  },
                                },
                                {
                                  name: 'longitude2',
                                  annotations: [
                                    {
                                      value:
                                        '#(malloy) reference_id = "d33a8cbe-6705-487e-bfc2-38235167c469" drill_expression = longitude2\n',
                                    },
                                  ],
                                  type: {
                                    kind: 'number_type',
                                    subtype: 'decimal',
                                  },
                                },
                              ],
                            },
                          },
                        },
                      ],
                    },
                  },
                  annotations: [{value: '#(malloy) drill_filters = []\n'}],
                },
              ],
            },
          },
          {
            kind: 'view',
            name: 'search_index',
            annotations: undefined,
            schema: {
              fields: [
                {
                  kind: 'dimension',
                  name: 'fieldName',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'fieldPath',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'fieldValue',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'fieldType',
                  type: {kind: 'string_type'},
                  annotations: undefined,
                },
                {
                  kind: 'dimension',
                  name: 'weight',
                  type: {kind: 'number_type', subtype: 'integer'},
                  annotations: undefined,
                },
              ],
            },
          },
        ],
      },
    },
  ],
  anonymous_queries: [],
};

const query0: Malloy.Query = {
  definition: {
    kind: 'arrow',
    source: {
      kind: 'source_reference',
      name: 'flights',
    },
    view: {
      kind: 'view_reference',
      name: 'carrier_dashboard',
    },
  },
};

const query1: Malloy.Query = {
  definition: {
    kind: 'arrow',
    source: {
      kind: 'source_reference',
      name: 'flights',
    },
    view: {
      kind: 'refinement',
      base: {
        kind: 'view_reference',
        name: 'top_carriers',
      },
      refinement: {
        kind: 'segment',
        operations: [
          {
            kind: 'group_by',
            field: {
              expression: {
                kind: 'field_reference',
                name: 'carrier',
              },
            },
          },
          {
            kind: 'group_by',
            field: {
              expression: {
                kind: 'field_reference',
                name: 'state',
                path: ['origin'],
              },
            },
          },
          {
            kind: 'order_by',
            field_reference: {
              name: 'carrier',
            },
            direction: 'desc',
          },
        ],
      },
    },
  },
};

const query2: Malloy.Query = {
  definition: {
    kind: 'arrow',
    source: {
      kind: 'source_reference',
      name: 'flights',
    },
    view: {
      kind: 'refinement',
      base: {
        kind: 'view_reference',
        name: 'top_carriers',
      },
      refinement: {
        kind: 'segment',
        operations: [
          {
            kind: 'limit',
            limit: 10,
          },
        ],
      },
    },
  },
};

const query3: Malloy.Query = {
  definition: {
    kind: 'arrow',
    source: {
      kind: 'source_reference',
      name: 'flights',
    },
    view: {
      kind: 'refinement',
      base: {
        kind: 'view_reference',
        name: 'top_carriers',
      },
      refinement: {
        kind: 'segment',
        operations: [
          {
            kind: 'where',
            filter: {
              kind: 'filter_string',
              field_reference: {name: 'carrier'},
              filter: 'WN',
            },
          },
        ],
      },
    },
  },
};

const query4: Malloy.Query = {
  definition: {
    kind: 'arrow',
    source: {
      kind: 'source_reference',
      name: 'flights',
    },
    view: {
      kind: 'refinement',
      base: {
        kind: 'view_reference',
        name: 'top_carriers',
      },
      refinement: {
        kind: 'segment',
        operations: [
          {
            kind: 'nest',
            name: 'nest 1',
            view: {
              definition: {
                kind: 'view_reference',
                name: 'top_destinations',
              },
            },
          },
        ],
      },
    },
  },
};

export const queries: Malloy.Query[] = [query0, query1, query2, query3, query4];

export const result: Malloy.Result = {
  connection_name: 'connection',
  sql: `SELECT \n\
base."carrier" as "carrier"
FROM flights as base
GROUP BY 1
ORDER BY 1 asc NULLS LAST
`,
  schema: {
    fields: [
      {
        kind: 'dimension',
        name: 'carrier',
        type: {kind: 'string_type'},
      },
    ],
  },
  data: {
    kind: 'array_cell',
    array_value: [
      {
        kind: 'record_cell',
        record_value: [{kind: 'string_cell', string_value: 'WN'}],
      },
      {
        kind: 'record_cell',
        record_value: [{kind: 'string_cell', string_value: 'AA'}],
      },
    ],
  },
};
