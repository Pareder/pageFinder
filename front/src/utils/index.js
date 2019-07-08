const findRepeatingSentences = (text) => {
  let firstWord = '';
  let repeatCounter = 0;
  const sentences = [];
  const result = [];
  const splittedByDots = text.split('.');

  for (let i = 0; i < splittedByDots.length; i++) {
    splittedByDots[i] = splittedByDots[i].replace(/^\s+|\s+$/g, '');
    const sentenceFirstWord = splittedByDots[i].replace(/ .*/g, '');

    if (sentenceFirstWord.toLowerCase() !== firstWord) {
      if (repeatCounter >= 2) {
        result.push(sentences.join('. '));
      }

      firstWord = sentenceFirstWord.toLowerCase();
      repeatCounter = 0;
      sentences.length = 0;
    } else {
      repeatCounter++;
    }

    sentences.push(splittedByDots[i]);
  }

  if (repeatCounter >= 2) {
    result.push(sentences.join('. '));
  }

  return result;
}

export { findRepeatingSentences };
