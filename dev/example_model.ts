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
          },
          {
            kind: 'dimension',
            name: 'name',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'nickname',
            type: {kind: 'string_type'},
          },
          {
            kind: 'measure',
            name: 'carrier_count',
            type: {kind: 'number_type', subtype: 'integer'},
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
          },
          {
            kind: 'dimension',
            name: 'code',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'site_number',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'fac_type',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'fac_use',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'faa_region',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'faa_dist',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'city',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'county',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'state',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'full_name',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'own_type',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'longitude',
            type: {kind: 'number_type', subtype: 'decimal'},
          },
          {
            kind: 'dimension',
            name: 'latitude',
            type: {kind: 'number_type', subtype: 'decimal'},
          },
          {
            kind: 'dimension',
            name: 'elevation',
            type: {kind: 'number_type', subtype: 'integer'},
          },
          {
            kind: 'dimension',
            name: 'aero_cht',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'cbd_dist',
            type: {kind: 'number_type', subtype: 'integer'},
          },
          {
            kind: 'dimension',
            name: 'cbd_dir',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'act_date',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'cert',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'fed_agree',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'cust_intl',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'c_ldg_rts',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'joint_use',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'mil_rts',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'cntl_twr',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'major',
            type: {kind: 'string_type'},
          },
          {
            kind: 'measure',
            name: 'airport_count',
            type: {kind: 'number_type', subtype: 'integer'},
          },
          {
            kind: 'dimension',
            name: 'name',
            type: {kind: 'string_type'},
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
          },
          {
            kind: 'dimension',
            name: 'manufacturer',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'model',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'aircraft_type_id',
            type: {kind: 'number_type', subtype: 'integer'},
          },
          {
            kind: 'dimension',
            name: 'aircraft_engine_type_id',
            type: {kind: 'number_type', subtype: 'integer'},
          },
          {
            kind: 'dimension',
            name: 'aircraft_category_id',
            type: {kind: 'number_type', subtype: 'integer'},
          },
          {
            kind: 'dimension',
            name: 'amateur',
            type: {kind: 'number_type', subtype: 'integer'},
          },
          {
            kind: 'dimension',
            name: 'engines',
            type: {kind: 'number_type', subtype: 'integer'},
          },
          {
            kind: 'dimension',
            name: 'seats',
            type: {kind: 'number_type', subtype: 'integer'},
          },
          {
            kind: 'dimension',
            name: 'weight',
            type: {kind: 'number_type', subtype: 'integer'},
          },
          {
            kind: 'dimension',
            name: 'speed',
            type: {kind: 'number_type', subtype: 'integer'},
          },
          {
            kind: 'measure',
            name: 'aircraft_model_count',
            type: {kind: 'number_type', subtype: 'integer'},
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
          },
          {
            kind: 'dimension',
            name: 'tail_num',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'aircraft_serial',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'aircraft_model_code',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'aircraft_engine_code',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'year_built',
            type: {kind: 'number_type', subtype: 'integer'},
          },
          {
            kind: 'dimension',
            name: 'aircraft_type_id',
            type: {kind: 'number_type', subtype: 'integer'},
          },
          {
            kind: 'dimension',
            name: 'aircraft_engine_type_id',
            type: {kind: 'number_type', subtype: 'integer'},
          },
          {
            kind: 'dimension',
            name: 'registrant_type_id',
            type: {kind: 'number_type', subtype: 'integer'},
          },
          {
            kind: 'dimension',
            name: 'name',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'address1',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'address2',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'city',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'state',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'zip',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'region',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'county',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'country',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'certification',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'status_code',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'mode_s_code',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'fract_owner',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'last_action_date',
            type: {kind: 'date_type', timeframe: undefined},
          },
          {
            kind: 'dimension',
            name: 'cert_issue_date',
            type: {kind: 'date_type', timeframe: undefined},
          },
          {
            kind: 'dimension',
            name: 'air_worth_date',
            type: {kind: 'date_type', timeframe: undefined},
          },
          {
            kind: 'measure',
            name: 'aircraft_count',
            type: {kind: 'number_type', subtype: 'integer'},
          },
          {
            kind: 'join',
            name: 'aircraft_models',
            schema: {
              fields: [
                {
                  kind: 'dimension',
                  name: 'aircraft_model_code',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'manufacturer',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'model',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'aircraft_type_id',
                  type: {kind: 'number_type', subtype: 'integer'},
                },
                {
                  kind: 'dimension',
                  name: 'aircraft_engine_type_id',
                  type: {kind: 'number_type', subtype: 'integer'},
                },
                {
                  kind: 'dimension',
                  name: 'aircraft_category_id',
                  type: {kind: 'number_type', subtype: 'integer'},
                },
                {
                  kind: 'dimension',
                  name: 'amateur',
                  type: {kind: 'number_type', subtype: 'integer'},
                },
                {
                  kind: 'dimension',
                  name: 'engines',
                  type: {kind: 'number_type', subtype: 'integer'},
                },
                {
                  kind: 'dimension',
                  name: 'seats',
                  type: {kind: 'number_type', subtype: 'integer'},
                },
                {
                  kind: 'dimension',
                  name: 'weight',
                  type: {kind: 'number_type', subtype: 'integer'},
                },
                {
                  kind: 'dimension',
                  name: 'speed',
                  type: {kind: 'number_type', subtype: 'integer'},
                },
                {
                  kind: 'measure',
                  name: 'aircraft_model_count',
                  type: {kind: 'number_type', subtype: 'integer'},
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
      schema: {
        fields: [
          {
            kind: 'dimension',
            name: 'carrier',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'flight_num',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'flight_time',
            type: {kind: 'number_type', subtype: 'integer'},
          },
          {
            kind: 'dimension',
            name: 'tail_num',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'dep_time',
            type: {kind: 'timestamp_type', timeframe: undefined},
          },
          {
            kind: 'dimension',
            name: 'arr_time',
            type: {kind: 'timestamp_type', timeframe: undefined},
          },
          {
            kind: 'dimension',
            name: 'dep_delay',
            type: {kind: 'number_type', subtype: 'integer'},
          },
          {
            kind: 'dimension',
            name: 'arr_delay',
            type: {kind: 'number_type', subtype: 'integer'},
          },
          {
            kind: 'dimension',
            name: 'taxi_out',
            type: {kind: 'number_type', subtype: 'integer'},
          },
          {
            kind: 'dimension',
            name: 'taxi_in',
            type: {kind: 'number_type', subtype: 'integer'},
          },
          {
            kind: 'dimension',
            name: 'distance',
            type: {kind: 'number_type', subtype: 'integer'},
          },
          {
            kind: 'dimension',
            name: 'cancelled',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'diverted',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'id2',
            type: {kind: 'number_type', subtype: 'integer'},
          },
          {
            kind: 'dimension',
            name: 'origin_code',
            type: {kind: 'string_type'},
          },
          {
            kind: 'dimension',
            name: 'destination_code',
            type: {kind: 'string_type'},
          },
          {
            kind: 'measure',
            name: 'flight_count',
            type: {kind: 'number_type', subtype: 'integer'},
          },
          {
            kind: 'measure',
            name: 'total_distance',
            type: {kind: 'number_type', subtype: 'integer'},
          },
          {
            kind: 'measure',
            name: 'destination_count',
            type: {kind: 'number_type', subtype: 'integer'},
          },
          {
            kind: 'measure',
            name: 'origin_count',
            type: {kind: 'number_type', subtype: 'integer'},
          },
          {
            kind: 'measure',
            name: 'seats_for_sale',
            type: {kind: 'number_type', subtype: 'integer'},
          },
          {
            kind: 'measure',
            name: 'seats_owned',
            type: {kind: 'number_type', subtype: 'integer'},
          },
          {
            kind: 'measure',
            name: 'average_plane_size',
            type: {kind: 'number_type', subtype: 'integer'},
          },
          {
            kind: 'measure',
            name: 'average_flight_distance',
            type: {kind: 'number_type', subtype: 'integer'},
          },
          {
            kind: 'join',
            name: 'carriers',
            schema: {
              fields: [
                {
                  kind: 'dimension',
                  name: 'code',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'name',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'nickname',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'measure',
                  name: 'carrier_count',
                  type: {kind: 'number_type', subtype: 'integer'},
                },
              ],
            },
            relationship: 'one',
          },
          {
            kind: 'join',
            name: 'origin',
            schema: {
              fields: [
                {
                  kind: 'dimension',
                  name: 'id',
                  type: {kind: 'number_type', subtype: 'integer'},
                },
                {
                  kind: 'dimension',
                  name: 'code',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'site_number',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'fac_type',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'fac_use',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'faa_region',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'faa_dist',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'city',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'county',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'state',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'full_name',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'own_type',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'longitude',
                  type: {kind: 'number_type', subtype: 'decimal'},
                },
                {
                  kind: 'dimension',
                  name: 'latitude',
                  type: {kind: 'number_type', subtype: 'decimal'},
                },
                {
                  kind: 'dimension',
                  name: 'elevation',
                  type: {kind: 'number_type', subtype: 'integer'},
                },
                {
                  kind: 'dimension',
                  name: 'aero_cht',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'cbd_dist',
                  type: {kind: 'number_type', subtype: 'integer'},
                },
                {
                  kind: 'dimension',
                  name: 'cbd_dir',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'act_date',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'cert',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'fed_agree',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'cust_intl',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'c_ldg_rts',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'joint_use',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'mil_rts',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'cntl_twr',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'major',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'measure',
                  name: 'airport_count',
                  type: {kind: 'number_type', subtype: 'integer'},
                },
                {
                  kind: 'dimension',
                  name: 'name',
                  type: {kind: 'string_type'},
                },
              ],
            },
            relationship: 'one',
          },
          {
            kind: 'join',
            name: 'destination',
            schema: {
              fields: [
                {
                  kind: 'dimension',
                  name: 'id',
                  type: {kind: 'number_type', subtype: 'integer'},
                },
                {
                  kind: 'dimension',
                  name: 'code',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'site_number',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'fac_type',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'fac_use',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'faa_region',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'faa_dist',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'city',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'county',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'state',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'full_name',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'own_type',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'longitude',
                  type: {kind: 'number_type', subtype: 'decimal'},
                },
                {
                  kind: 'dimension',
                  name: 'latitude',
                  type: {kind: 'number_type', subtype: 'decimal'},
                },
                {
                  kind: 'dimension',
                  name: 'elevation',
                  type: {kind: 'number_type', subtype: 'integer'},
                },
                {
                  kind: 'dimension',
                  name: 'aero_cht',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'cbd_dist',
                  type: {kind: 'number_type', subtype: 'integer'},
                },
                {
                  kind: 'dimension',
                  name: 'cbd_dir',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'act_date',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'cert',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'fed_agree',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'cust_intl',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'c_ldg_rts',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'joint_use',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'mil_rts',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'cntl_twr',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'major',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'measure',
                  name: 'airport_count',
                  type: {kind: 'number_type', subtype: 'integer'},
                },
                {
                  kind: 'dimension',
                  name: 'name',
                  type: {kind: 'string_type'},
                },
              ],
            },
            relationship: 'one',
          },
          {
            kind: 'join',
            name: 'aircraft',
            schema: {
              fields: [
                {
                  kind: 'dimension',
                  name: 'id',
                  type: {kind: 'number_type', subtype: 'integer'},
                },
                {
                  kind: 'dimension',
                  name: 'tail_num',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'aircraft_serial',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'aircraft_model_code',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'aircraft_engine_code',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'year_built',
                  type: {kind: 'number_type', subtype: 'integer'},
                },
                {
                  kind: 'dimension',
                  name: 'aircraft_type_id',
                  type: {kind: 'number_type', subtype: 'integer'},
                },
                {
                  kind: 'dimension',
                  name: 'aircraft_engine_type_id',
                  type: {kind: 'number_type', subtype: 'integer'},
                },
                {
                  kind: 'dimension',
                  name: 'registrant_type_id',
                  type: {kind: 'number_type', subtype: 'integer'},
                },
                {
                  kind: 'dimension',
                  name: 'name',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'address1',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'address2',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'city',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'state',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'zip',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'region',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'county',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'country',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'certification',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'status_code',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'mode_s_code',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'fract_owner',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'last_action_date',
                  type: {kind: 'date_type', timeframe: undefined},
                },
                {
                  kind: 'dimension',
                  name: 'cert_issue_date',
                  type: {kind: 'date_type', timeframe: undefined},
                },
                {
                  kind: 'dimension',
                  name: 'air_worth_date',
                  type: {kind: 'date_type', timeframe: undefined},
                },
                {
                  kind: 'measure',
                  name: 'aircraft_count',
                  type: {kind: 'number_type', subtype: 'integer'},
                },
                {
                  kind: 'join',
                  name: 'aircraft_models',
                  schema: {
                    fields: [
                      {
                        kind: 'dimension',
                        name: 'aircraft_model_code',
                        type: {kind: 'string_type'},
                      },
                      {
                        kind: 'dimension',
                        name: 'manufacturer',
                        type: {kind: 'string_type'},
                      },
                      {
                        kind: 'dimension',
                        name: 'model',
                        type: {kind: 'string_type'},
                      },
                      {
                        kind: 'dimension',
                        name: 'aircraft_type_id',
                        type: {
                          kind: 'number_type',
                          subtype: 'integer',
                        },
                      },
                      {
                        kind: 'dimension',
                        name: 'aircraft_engine_type_id',
                        type: {
                          kind: 'number_type',
                          subtype: 'integer',
                        },
                      },
                      {
                        kind: 'dimension',
                        name: 'aircraft_category_id',
                        type: {
                          kind: 'number_type',
                          subtype: 'integer',
                        },
                      },
                      {
                        kind: 'dimension',
                        name: 'amateur',
                        type: {
                          kind: 'number_type',
                          subtype: 'integer',
                        },
                      },
                      {
                        kind: 'dimension',
                        name: 'engines',
                        type: {
                          kind: 'number_type',
                          subtype: 'integer',
                        },
                      },
                      {
                        kind: 'dimension',
                        name: 'seats',
                        type: {
                          kind: 'number_type',
                          subtype: 'integer',
                        },
                      },
                      {
                        kind: 'dimension',
                        name: 'weight',
                        type: {
                          kind: 'number_type',
                          subtype: 'integer',
                        },
                      },
                      {
                        kind: 'dimension',
                        name: 'speed',
                        type: {
                          kind: 'number_type',
                          subtype: 'integer',
                        },
                      },
                      {
                        kind: 'measure',
                        name: 'aircraft_model_count',
                        type: {
                          kind: 'number_type',
                          subtype: 'integer',
                        },
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
            schema: {
              fields: [
                {
                  kind: 'dimension',
                  name: 'nickname',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'flight_count',
                  type: {kind: 'number_type', subtype: 'integer'},
                },
                {
                  kind: 'dimension',
                  name: 'destination_count',
                  type: {kind: 'number_type', subtype: 'integer'},
                },
                {
                  kind: 'dimension',
                  name: 'percentage_of_flights',
                  type: {kind: 'number_type', subtype: undefined},
                },
              ],
            },
          },
          {
            kind: 'view',
            name: 'carriers_over_time',
            schema: {
              fields: [
                {
                  kind: 'dimension',
                  name: 'dep_month',
                  type: {
                    kind: 'timestamp_type',
                    timeframe: 'month',
                  },
                },
                {
                  kind: 'dimension',
                  name: 'flight_count',
                  type: {kind: 'number_type', subtype: 'integer'},
                },
                {
                  kind: 'dimension',
                  name: 'nickname',
                  type: {kind: 'string_type'},
                },
              ],
            },
          },
          {
            kind: 'view',
            name: 'top_origins',
            schema: {
              fields: [
                {
                  kind: 'dimension',
                  name: 'name',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'flight_count',
                  type: {kind: 'number_type', subtype: 'integer'},
                },
                {
                  kind: 'dimension',
                  name: 'destination_count',
                  type: {kind: 'number_type', subtype: 'integer'},
                },
                {
                  kind: 'dimension',
                  name: 'carrier_count',
                  type: {kind: 'number_type', subtype: 'integer'},
                },
                {
                  kind: 'dimension',
                  name: 'percent_of_flights',
                  type: {kind: 'number_type', subtype: undefined},
                },
              ],
            },
          },
          {
            kind: 'view',
            name: 'top_destinations',
            schema: {
              fields: [
                {
                  kind: 'dimension',
                  name: 'code',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'full_name',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'flight_count',
                  type: {kind: 'number_type', subtype: 'integer'},
                },
                {
                  kind: 'dimension',
                  name: 'percent_of_flights_to_destination',
                  type: {kind: 'number_type', subtype: undefined},
                },
              ],
            },
          },
          {
            kind: 'view',
            name: 'by_month',
            schema: {
              fields: [
                {
                  kind: 'dimension',
                  name: 'dep_month',
                  type: {
                    kind: 'timestamp_type',
                    timeframe: 'month',
                  },
                },
                {
                  kind: 'dimension',
                  name: 'flight_count',
                  type: {kind: 'number_type', subtype: 'integer'},
                },
              ],
            },
          },
          {
            kind: 'view',
            name: 'by_manufacturer',
            schema: {
              fields: [
                {
                  kind: 'dimension',
                  name: 'manufacturer',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'flight_count',
                  type: {kind: 'number_type', subtype: 'integer'},
                },
                {
                  kind: 'dimension',
                  name: 'aircraft_count',
                  type: {kind: 'number_type', subtype: 'integer'},
                },
              ],
            },
          },
          {
            kind: 'view',
            name: 'top_routes_map',
            schema: {
              fields: [
                {
                  kind: 'dimension',
                  name: 'latitude',
                  type: {kind: 'number_type', subtype: 'decimal'},
                },
                {
                  kind: 'dimension',
                  name: 'longitude',
                  type: {kind: 'number_type', subtype: 'decimal'},
                },
                {
                  kind: 'dimension',
                  name: 'latitude2',
                  type: {kind: 'number_type', subtype: 'decimal'},
                },
                {
                  kind: 'dimension',
                  name: 'longitude2',
                  type: {kind: 'number_type', subtype: 'decimal'},
                },
                {
                  kind: 'dimension',
                  name: 'flight_count',
                  type: {kind: 'number_type', subtype: 'integer'},
                },
              ],
            },
          },
          {
            kind: 'view',
            name: 'carrier_dashboard',
            schema: {
              fields: [
                {
                  kind: 'dimension',
                  name: 'destination_count',
                  type: {kind: 'number_type', subtype: 'integer'},
                },
                {
                  kind: 'dimension',
                  name: 'flight_count',
                  type: {kind: 'number_type', subtype: 'integer'},
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
                          type: {kind: 'string_type'},
                        },
                        {
                          name: 'flight_count',
                          type: {
                            kind: 'number_type',
                            subtype: 'integer',
                          },
                        },
                        {
                          name: 'aircraft_count',
                          type: {
                            kind: 'number_type',
                            subtype: 'integer',
                          },
                        },
                      ],
                    },
                  },
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
                          type: {
                            kind: 'timestamp_type',
                            timeframe: 'month',
                          },
                        },
                        {
                          name: 'flight_count',
                          type: {
                            kind: 'number_type',
                            subtype: 'integer',
                          },
                        },
                      ],
                    },
                  },
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
                          type: {kind: 'string_type'},
                        },
                        {
                          name: 'destination_count',
                          type: {
                            kind: 'number_type',
                            subtype: 'integer',
                          },
                        },
                        {
                          name: 'flight_count',
                          type: {
                            kind: 'number_type',
                            subtype: 'integer',
                          },
                        },
                      ],
                    },
                  },
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
                          type: {kind: 'string_type'},
                        },
                        {
                          name: 'origin',
                          type: {kind: 'string_type'},
                        },
                        {
                          name: 'city',
                          type: {kind: 'string_type'},
                        },
                        {
                          name: 'flight_count',
                          type: {
                            kind: 'number_type',
                            subtype: 'integer',
                          },
                        },
                        {
                          name: 'destinations_by_month',
                          type: {
                            kind: 'array_type',
                            element_type: {
                              kind: 'record_type',
                              fields: [
                                {
                                  name: 'dep_month',
                                  type: {
                                    kind: 'timestamp_type',
                                    timeframe: 'month',
                                  },
                                },
                                {
                                  name: 'flight_count',
                                  type: {
                                    kind: 'number_type',
                                    subtype: 'integer',
                                  },
                                },
                                {
                                  name: 'name',
                                  type: {kind: 'string_type'},
                                },
                              ],
                            },
                          },
                        },
                        {
                          name: 'top_routes_map',
                          type: {
                            kind: 'array_type',
                            element_type: {
                              kind: 'record_type',
                              fields: [
                                {
                                  name: 'latitude',
                                  type: {
                                    kind: 'number_type',
                                    subtype: 'decimal',
                                  },
                                },
                                {
                                  name: 'longitude',
                                  type: {
                                    kind: 'number_type',
                                    subtype: 'decimal',
                                  },
                                },
                                {
                                  name: 'latitude2',
                                  type: {
                                    kind: 'number_type',
                                    subtype: 'decimal',
                                  },
                                },
                                {
                                  name: 'longitude2',
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
                },
              ],
            },
          },
          {
            kind: 'view',
            name: 'search_index',
            schema: {
              fields: [
                {
                  kind: 'dimension',
                  name: 'fieldName',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'fieldPath',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'fieldValue',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'fieldType',
                  type: {kind: 'string_type'},
                },
                {
                  kind: 'dimension',
                  name: 'weight',
                  type: {kind: 'number_type', subtype: 'integer'},
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
    source_reference: {name: 'flights'},
    view: {
      kind: 'view_reference',
      name: 'by_carrier',
    },
  },
};

const query1: Malloy.Query = {
  definition: {
    kind: 'arrow',
    source_reference: {
      name: 'flights',
    },
    view: {
      kind: 'refinement',
      base: {
        kind: 'view_reference',
        name: 'by_carrier',
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
                name: 'origin.state',
              },
            },
          },
          {
            kind: 'order_by',
            field_reference: {
              name: 'origin.state',
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
    source_reference: {
      name: 'flights',
    },
    view: {
      kind: 'refinement',
      base: {
        kind: 'view_reference',
        name: 'by_carrier',
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
    source_reference: {name: 'flights'},
    view: {
      kind: 'refinement',
      base: {
        kind: 'view_reference',
        name: 'by_carrier',
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
    source_reference: {name: 'flights'},
    view: {
      kind: 'refinement',
      base: {
        kind: 'view_reference',
        name: 'by_carrier',
      },
      refinement: {
        kind: 'segment',
        operations: [
          {
            kind: 'nest',
            view: {
              definition: {
                kind: 'view_reference',
                name: 'by_state',
              },
            },
          },
        ],
      },
    },
  },
};

export const queries: Malloy.Query[] = [query0, query1, query2, query3, query4];
