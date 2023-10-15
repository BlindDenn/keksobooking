
const mockDataArrayLength = 10;
const avatarPictureFilesPath = 'img/avatar/';
const avatarFileNameTemplate = 'user{{xx}}.png';
const titles = [
  'Классическая загородная вилла',
  'Уютная квартира в самом серце города',
  'Квартира - романтическое гнездышко для влюбленных',
  'Прекрасные аппартаменты для отдыха друзей'
];
const locationLimits = {
  latMin: 35.65,
  latMax: 35.7,
  logMin: 139.7,
  logMax: 139.8,
  precision: 5, //знаков после запятой
};
const priceLimits = {
  minPrice: 1000,
  maxPrice: 75000,
  zeroesCount: 3,
};
const types = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];
const guestsPerRoomMax = 4;
const inOutTimes = [
  '12:00',
  '13:00',
  '14:00'
];
const features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
const descriptions = [
  'Прекрасное место, шикарный вид из окон.',
  'Тихо, уютно.',
  'Всем-всем тут очень нравится.',
  'Очень близко до магазинов, вокзала, полицейского участка.',
  'Побывав тут единожды, определенно захотите вернуться сюда снова и снова.',
];
const photosLinks = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];


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

const createLocation = ({latMin, latMax, logMin, logMax, precision}) => {
  const location = {};
  location.lat = getRandomFromRange(latMin, latMax, precision);
  location.log = getRandomFromRange(logMin, logMax, precision);
  return location;
};


const avatarFiles = createAvatarFiles(mockDataArrayLength, avatarFileNameTemplate);
const getRandomAvatarFile = extractRandomElements(avatarFiles);

const createMockDataAuthorObj = () => {
  const mockDataAuthor = {};
  mockDataAuthor.avatar = `${avatarPictureFilesPath}${getRandomAvatarFile()}`;
  return mockDataAuthor;
};

const createAdress = (obj) => `${(obj.lat).toFixed(locationLimits.precision)}, ${(obj.log).toFixed(locationLimits.precision)}`;

const getRandomPrice = ({minPrice, maxPrice, zeroesCount}) => getRandomFromRange(minPrice / 10 ** zeroesCount, maxPrice / 10 ** zeroesCount) * 10 ** zeroesCount;

const getCheckinTime = (checoutTime) => {
  const checkoutTimeIndex = inOutTimes.indexOf(checoutTime);
  return inOutTimes[getRandomFromRange(checkoutTimeIndex, inOutTimes.length - 1)];
};

const getSomeRandomElements = (arr) => {
  const someElementsArrLength = getRandomFromRange(0, arr.length);
  const processedArr = Array.from(arr);
  return Array.from({length: someElementsArrLength}, extractRandomElements(processedArr));
};

const createMockDataOfferObj = () => {
  const mockDataOffer = {};
  mockDataOffer.title = getRandomElement(titles);
  mockDataOffer.location = createLocation(locationLimits);
  mockDataOffer.adress = createAdress(mockDataOffer.location);
  mockDataOffer.price = getRandomPrice(priceLimits);
  mockDataOffer.type = getRandomElement(types);
  mockDataOffer.rooms = getRandomFromRange(1, 7);
  mockDataOffer.guests = getRandomFromRange(mockDataOffer.rooms, mockDataOffer.rooms * guestsPerRoomMax);
  mockDataOffer.checkout = inOutTimes[getRandomIndex(inOutTimes)];
  mockDataOffer.checkin = getCheckinTime(mockDataOffer.checkout);
  mockDataOffer.features = getSomeRandomElements(features);
  mockDataOffer.description = getRandomElement(descriptions);
  mockDataOffer.photos = getSomeRandomElements(photosLinks);
  return mockDataOffer;
};

const createMockDataObj = () => {
  const mockDataObj = {};
  mockDataObj.author = createMockDataAuthorObj();
  mockDataObj.offer = createMockDataOfferObj();
  return mockDataObj;
};

const createDataArray = (arrayLength) => Array.from({length: arrayLength}, createMockDataObj);

console.log(createDataArray(mockDataArrayLength));

generateSequenceArray();
