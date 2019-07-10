import API from '../api';

describe('API', () => {
  describe('constructor', () => {
    it('Should be an instance of API class', () => {
      expect(API.createFrom()).toBeInstanceOf(API);
    });
  });

  describe('getPages method', () => {
    it('Should return expected result', async () => {
      const axiosMock = {
        post: jest.fn(() => ({
          data: {
            data: ['qwe']
          }
        }))
      };
      const configMock = {};
      const api = new API(axiosMock, configMock);
      const pages = await api.getPages();

      expect(pages).toEqual(['qwe']);
    });
  });
});
