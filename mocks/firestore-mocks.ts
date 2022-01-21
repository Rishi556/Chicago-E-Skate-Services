const fs = {};

jest.mock('@google-cloud/firestore', () => {
  return {
    Firestore: jest.fn().mockImplementation(() => {
      return {
        collection: (collection: string) => {
          return {
            get: () => {
              return [];
            },
          };
        },
      };
    }),
  };
});
