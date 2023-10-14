
const mockDataArrayLength = 10;
const avatarPictureFilesPath = 'img/avatar/';
const avatarFileNameTemplate = 'user{{xx}}.png';

const getRandomFromRange = (lowLimit = 0, highLimit = 1, simbolsAfterComma = 0, areOnlyPositive = true) => {

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
  // else {
  //   throw new Error(`В диапазоне от ${lowLimit} до ${highLimit} нет ни одного числа, соответствующего заданному критерию — количество знаков после запятой: ${simbolsAfterComma}.`);
  // }

  return result;
};

const getRandomIndex = (arr) => getRandomFromRange(0, arr.length - 1);

const generateSequenceArray = (arrayLength, startNumber = 0) => Array.from({length: arrayLength}, (val, index) => index + startNumber);

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

const createAvatarFiles = (count, nameTemplate) => {
  const breakpoint = /{{.*}}/;
  const nameParts = nameTemplate.split(breakpoint);
  const countSymbols = nameTemplate.match(breakpoint)[0].length - 4;
  return Array.from({length: count}, (val, index) => `${nameParts[0]}${(++index).toString().padStart(countSymbols, '0')}${nameParts[1]}`);
};

const avatarFiles = createAvatarFiles(mockDataArrayLength, avatarFileNameTemplate);
const getRandomAvatarFile = extractRandomElements(avatarFiles);

const createMockDataAuthorObj = () => {
  const mockDataAuthorObj = {};
  mockDataAuthorObj.avatar = `${avatarPictureFilesPath}${getRandomAvatarFile()}`;
  return mockDataAuthorObj;
};

const createMockDataObj = () => {
  const mockDataObj = {};
  mockDataObj.author = createMockDataAuthorObj();
  // fill mocrDataObj with offer obj;
  return mockDataObj;

  /*    author, объект — описывает автора. Содержит одно поле:

    avatar, строка — адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} — это число от 1 до 10. Перед однозначными числами ставится 0. Например, 01, 02...10. Адреса изображений не повторяются.

    offer, объект — содержит информацию об объявлении. Состоит из полей:

    title, строка — заголовок предложения. Придумайте самостоятельно.

    address, строка — адрес предложения. Для простоты пусть пока составляется из географических координат по маске {{location.lat}}, {{location.lng}}.

    price, число — стоимость. Случайное целое положительное число.

    type, строка — одно из пяти фиксированных значений: palace, flat, house, bungalow или hotel.

    rooms, число — количество комнат. Случайное целое положительное число.

    guests, число — количество гостей, которое можно разместить. Случайное целое положительное число.

    checkin, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.

    checkout, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.

    features, массив строк — массив случайной длины из значений: wifi, dishwasher, parking, washer, elevator, conditioner. Значения не должны повторяться.

    description, строка — описание помещения. Придумайте самостоятельно.

    photos, массив строк — массив случайной длины из значений: https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg, https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg, https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg.

    location, объект — местоположение в виде географических координат. Состоит из двух полей:

    lat, число с плавающей точкой — широта, случайное значение от 35.65000 до 35.70000.

    lng, число с плавающей точкой — долгота, случайное значение от 139.70000 до 139.80000.
    */

};

const createDataArray = (arrayLength) => Array.from({length: arrayLength}, createMockDataObj);

const mockDataArray = createDataArray(mockDataArrayLength);

generateSequenceArray();
getRandomElement([1, 2]);

console.log(mockDataArray);
