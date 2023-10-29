import{ MOCK_DATA_ARRAY_LENGTH } from './constants.js';

const
  // MOCK_DATA_ARRAY_LENGTH = 10,
  AVATAR_PICTURES = {
    filesPath: 'img/avatar/',
    fileNameTemplate: 'user{{xx}}.png',
  },
  TITLES = [
    'Классическая загородная вилла',
    'Уютная квартира в самом серце города',
    'Квартира - романтическое гнездышко для влюбленных',
    'Прекрасные аппартаменты для отдыха друзей',
    'Уютное гнездышко для молодоженов'
  ],
  LOCATION_LIMITS = {
    latMin: 35.65,
    latMax: 35.7,
    logMin: 139.7,
    logMax: 139.8,
    precision: 5, //знаков после запятой
  },
  PRICE_LIMITS = {
    minPrice: 1000,
    maxPrice: 75000,
    zeroesCount: 3,
  },
  TYPES = [
    'palace',
    'flat',
    'house',
    'bungalow',
    'hotel'
  ],
  ROOM_MAX_AMOUNT = 7,
  GUESTS_PER_ROOM_MAX = 4,
  IN_OUT_TIMES = [
    '12:00',
    '13:00',
    '14:00'
  ],
  FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ],
  DESCRIPTIONS = [
    'Прекрасное место, шикарный вид из окон.',
    'Тихо, уютно.',
    'Всем-всем тут очень нравится.',
    'Очень близко до магазинов, вокзала, полицейского участка.',
    'Побывав тут единожды, определенно захотите вернуться сюда снова и снова.',
    'Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.'
  ],
  PHOTOS = {
    filesPath: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/',
    filesNames: [
      'duonguyen-8LrGtIxxa4w.jpg',
      'brandon-hoogenboom-SNxQGWxZQi0.jpg',
      'claire-rendall-b6kAwr1i0Iw.jpg',
    ],
  };

const mockDataArraySettings = {
  arrayLength: MOCK_DATA_ARRAY_LENGTH,
  avatarPictures: AVATAR_PICTURES,
  titles: TITLES,
  locationLimits: LOCATION_LIMITS,
  priceLimits: PRICE_LIMITS,
  types: TYPES,
  roomMaxAmount: ROOM_MAX_AMOUNT,
  guestsPerRoomMax: GUESTS_PER_ROOM_MAX,
  inOutTimes: IN_OUT_TIMES,
  features: FEATURES,
  descriptions: DESCRIPTIONS,
  photos: PHOTOS,
};

const getMockDataArraySettings = () => mockDataArraySettings;

export{ getMockDataArraySettings };
