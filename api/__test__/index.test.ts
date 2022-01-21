import { v4 } from 'uuid';
import {
  ChargeSpot,
  ChargeType as mock_ChargeType,
  ChargeType,
} from '../../bot/utils/types';
import * as functions from '../index';

jest.mock('@google-cloud/firestore', () => {
  return {
    Firestore: jest.fn().mockImplementation(() => {
      return {
        collection: () => {
          return {
            get: () => {
              const ret: Array<any> = [
                {
                  data: (): ChargeSpot => {
                    return {
                      chargeType: mock_ChargeType.INDOOR,
                      id: '123',
                      lat: 0,
                      lon: 0,
                      timeAdded: 0,
                      userAdded: -1,
                      description: '',
                    };
                  },
                },
              ];

              return ret;
            },
          };
        },
      };
    }),
  };
});

describe('Unit tests for index.ts of API', () => {
  test('should create a correct HTML entry for a given chargeSpot', () => {
    const cs: ChargeSpot = {
      chargeType: ChargeType.INDOOR,
      id: '123',
      lat: 0,
      lon: 0,
      timeAdded: 123,
      userAdded: -1,
      description: 'Hello',
    };
    const result = functions.createSpotEntry(cs);
    expect(result).toBe(
      `[{ lat: ${cs.lat}, lng: ${cs.lon} }, "${cs.description}"]`,
    );
  });

  test('should check length of getChargeSpots()', async () => {
    process.env.FIRESTORE_TOKEN =
      'IntjbGllbnRfZW1haWw6IFwiaGVsbG9cIixwcml2YXRlX2tleTogXCJ5b3UgdGhvdWdodFwifSI=';
    const res = await functions.getChargeSpots();
    expect(res).toHaveLength(1);
  });

  test('charging handler should return html containing our one charge spot', () => {
    process.env.FIRESTORE_TOKEN =
      'IntjbGllbnRfZW1haWw6IFwiaGVsbG9cIixwcml2YXRlX2tleTogXCJ5b3UgdGhvdWdodFwifSI=';
    const resMock = {
      status: jest.fn((stat: number) => {
        return {
          send: jest.fn((str: string) => {}),
        };
      }),
    };

    const req = {};

    functions.chargingHandler(req as unknown as Express.Request, resMock);
  });
});
