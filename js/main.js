
const MOCK_DATA_ARRAY_LENGTH = 10;
const AVATAR_PICTURE_FILES_PATH = 'img/avatar/';
const AVATAR_FILE_NAME_TEMPLATE = 'user{{xx}}.png';
const TITLES = [
  'Классическая загородная вилла',
  'Уютная квартира в самом серце города',
  'Квартира - романтическое гнездышко для влюбленных',
  'Прекрасные аппартаменты для отдыха друзей'
];
const LOCATION_LIMITS = {
  latMin: 35.65,
  latMax: 35.7,
  logMin: 139.7,
  logMax: 139.8,
  precision: 5, //знаков после запятой
};
const PRICE_LIMITS = {
  minPrice: 1000,
  maxPrice: 75000,
  zeroesCount: 3,
};
const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];
const ROOM_MAX_AMOUNT = 7;
const GUESTS_PER_ROOM_MAX = 4;
const IN_OUT_TIMES = [
  '12:00',
  '13:00',
  '14:00'
];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
const DESCRIPTIONS = [
  'Прекрасное место, шикарный вид из окон.',
  'Тихо, уютно.',
  'Всем-всем тут очень нравится.',
  'Очень близко до магазинов, вокзала, полицейского участка.',
  'Побывав тут единожды, определенно захотите вернуться сюда снова и снова.',
];
const PHOTOS_LINKS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

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

const createLocation = ({latMin, latMax, logMin, logMax, precision}) => ({
  lat: getRandomFromRange(latMin, latMax, precision),
  log: getRandomFromRange(logMin, logMax, precision),
});

const avatarFiles = createAvatarFiles(MOCK_DATA_ARRAY_LENGTH, AVATAR_FILE_NAME_TEMPLATE);

const getRandomAvatarFile = extractRandomElements(avatarFiles);

const createMockDataAuthorObj = () => ({
  avatar: `${AVATAR_PICTURE_FILES_PATH}${getRandomAvatarFile()}`
});

const createAdress = (obj) => `${(obj.lat).toFixed(LOCATION_LIMITS.precision)}, ${(obj.log).toFixed(LOCATION_LIMITS.precision)}`;

const getRandomPrice = ({minPrice, maxPrice, zeroesCount}) => getRandomFromRange(minPrice / 10 ** zeroesCount, maxPrice / 10 ** zeroesCount) * 10 ** zeroesCount;

const getCheckinTime = (checoutTime) => {
  const checkoutTimeIndex = IN_OUT_TIMES.indexOf(checoutTime);
  return IN_OUT_TIMES[getRandomFromRange(checkoutTimeIndex, IN_OUT_TIMES.length - 1)];
};

const getSomeRandomElements = (arr) => {
  const someElementsArrLength = getRandomFromRange(0, arr.length);
  const processedArr = Array.from(arr);
  return Array.from({length: someElementsArrLength}, extractRandomElements(processedArr));
};

const filterSomeElements = (arr) => arr.filter(() => Math.random() > 0.5);

const runAndCleanAllMethodsOnce = (obj) => {
  for (const prop in obj) {
    if (typeof(obj[prop]) === 'function') {
      obj[prop]();
      delete obj[prop];
    }
  }
};

const createMockDataOfferObj = () => {
  const mockDataOffer = {
    title: getRandomElement(TITLES),
    location: createLocation(LOCATION_LIMITS),
    price: getRandomPrice(PRICE_LIMITS),
    type: getRandomElement(TYPES),
    rooms: getRandomFromRange(1, ROOM_MAX_AMOUNT),
    checkout: getRandomElement(IN_OUT_TIMES),
    features: filterSomeElements(FEATURES),
    description: getRandomElement(DESCRIPTIONS),
    photos: getSomeRandomElements(PHOTOS_LINKS),
    setAdress() {
      this.adress = createAdress(this.location);
    },
    setGuests() {
      this.guests = getRandomFromRange(this.rooms, this.rooms * GUESTS_PER_ROOM_MAX);
    },
    setCheckin() {
      this.checkin = getCheckinTime(this.checkout);
    },
  };

  runAndCleanAllMethodsOnce(mockDataOffer);

  return mockDataOffer;
};

const createMockDataObj = () => ({
  author: createMockDataAuthorObj(),
  offer: createMockDataOfferObj(),
});

const createDataArray = (arrayLength) => Array.from({length: arrayLength}, createMockDataObj);

console.log(createDataArray(MOCK_DATA_ARRAY_LENGTH));

generateSequenceArray();
