const getRandomIntegerFromRange = (lowLimit = 0, highLimit = 1, simbolsAfterComma = 0, areOnlyPositive = true) => {

  let result = null;
  const commaCoef = 10 ** simbolsAfterComma;
  const validateInput = (validatedData) => validatedData < 0 ? 0 : validatedData;

  if (areOnlyPositive) {
    lowLimit = validateInput(lowLimit);
    highLimit = validateInput(highLimit);
  }

  const min = Math.ceil(Math.min(lowLimit, highLimit) * commaCoef);
  const max = Math.floor(Math.max(lowLimit, highLimit) * commaCoef);

  if (min <= max) {
    result = Math.floor(Math.random() * (max - min + 1) + min) / commaCoef;
  }

  return result;
};

getRandomIntegerFromRange();
