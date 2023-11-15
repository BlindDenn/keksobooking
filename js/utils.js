const getRandomFromRange = (lowLimit = 0, highLimit = 1, symbolsAfterComma = 0, areOnlyPositive = true) => {

  const getRandomIntegerFromRange = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
  const getRandomFloatFromRange = (min, max, digit) => +(Math.random() * (max - min) + min).toFixed(digit);
  const validateInput = (validatedData) => validatedData < 0 ? 0 : validatedData;

  let result;

  if (areOnlyPositive) {
    lowLimit = validateInput(lowLimit);
    highLimit = validateInput(highLimit);
  }

  if (!symbolsAfterComma) {
    const min = Math.ceil(Math.min(lowLimit, highLimit));
    const max = Math.floor(Math.max(lowLimit, highLimit));
    if (min > max) {
      result = null;
    } else {
      result = getRandomIntegerFromRange(min, max);
    }
  }

  if (symbolsAfterComma) {
    const min = Math.min(lowLimit, highLimit);
    const max = Math.max(lowLimit, highLimit);
    result = getRandomFloatFromRange (min, max, symbolsAfterComma);
  }

  return result;
};

const getRandomIndex = (arr) => getRandomFromRange(0, arr.length - 1);

const getRandomElement = (arr) => arr[getRandomIndex(arr)];

const extractRandomElement = (arr) => {
  const currentIndex = getRandomIndex(arr);
  const result = arr[currentIndex];
  arr.splice(currentIndex, 1);
  return result;
};

const extractRandomElements = (arr) => {
  const processedArr = Array.from(arr);
  return () => extractRandomElement(processedArr);
};

const getSomeRandomElements = (arr) => {
  const someElementsArrLength = getRandomFromRange(0, arr.length);
  const processedArr = Array.from(arr);
  return Array.from({length: someElementsArrLength}, extractRandomElements(processedArr));
};

const filterSomeElements = (arr) => arr.filter(() => Math.random() > 0.5);

const generateSequenceArray = (arrayLength, startNumber = 0) => Array.from({length: arrayLength}, (val, index) => index + startNumber);

const numWord = (value, words) => {
  value = Math.abs(value) % 100;
  const num = value % 10;
  if(value > 10 && value < 20) {
    return words[2];
  }
  if(num > 1 && num < 5) {
    return words[1];
  }
  if(num === 1) {
    return words[0];
  }
  return words[2];
};

export{
  getRandomFromRange,
  getRandomIndex,
  getRandomElement,
  extractRandomElement,
  extractRandomElements,
  getSomeRandomElements,
  filterSomeElements,
  generateSequenceArray,
  numWord
};
