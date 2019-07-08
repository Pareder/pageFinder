import { findRepeatingSentences } from '../utils';

const TEST_VALUES = [
  {
    test: 'asd. asd. asd.',
    result: ['asd. asd. asd']
  },
  {
    test: 'asd. asd. asd. asd.',
    result: ['asd. asd. asd. asd']
  },
  {
    test: 'asd. asd. asd. qwe. qwe. qwe.',
    result: ['asd. asd. asd', 'qwe. qwe. qwe']
  },
  {
    test: 'asd. asd',
    result: []
  }
];

describe('utils', () => {
  describe('findRepeatingSentences method', () => {
    for (const value of TEST_VALUES) {
      it('Should return expected result', () => {
        expect(findRepeatingSentences(value.test)).toEqual(value.result);
      });
    }
  });
});
