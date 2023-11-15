import{ getMockDataArraySettings } from './mock-data-settings.js';
import{
  getRandomFromRange,
  getRandomElement,
  extractRandomElements,
  getSomeRandomElements,
  filterSomeElements
} from './utils.js';

const settings = getMockDataArraySettings();

const createAvatarFiles = ({arrayLength, avatarPictures: {fileNameTemplate: template}}) => {
  const breakpoint = /{{.*}}/;
  const nameParts = template.split(breakpoint);
  const countSymbols = template.match(breakpoint)[0].length - 4;
  return Array.from({length: arrayLength}, (val, index) => `${nameParts[0]}${(++index).toString().padStart(countSymbols, '0')}${nameParts[1]}`);
};

const avatarFiles = createAvatarFiles(settings);

const createLocation = ({locationLimits: {latMin, latMax, logMin, logMax, precision}}) => ({
  lat: getRandomFromRange(latMin, latMax, precision),
  log: getRandomFromRange(logMin, logMax, precision),
});

const getRandomAvatarFile = extractRandomElements(avatarFiles);

const createMockDataAuthorObj = ({avatarPictures: {filesPath}}) => ({
  avatar: `${filesPath}${getRandomAvatarFile()}`
});

const createAddress = (obj, {locationLimits: {precision}}) => `${(obj.lat).toFixed(precision)}, ${(obj.log).toFixed(precision)}`;

const getRandomPrice = ({priceLimits: {minPrice, maxPrice, zeroesCount}}) => getRandomFromRange(minPrice / 10 ** zeroesCount, maxPrice / 10 ** zeroesCount) * 10 ** zeroesCount;

const getCheckinTime = (checoutTime, {inOutTimes}) => {
  const checkoutTimeIndex = inOutTimes.indexOf(checoutTime);
  return inOutTimes[getRandomFromRange(checkoutTimeIndex, inOutTimes.length - 1)];
};

const createPhotoLink = (index, {photos: {filesPath, filesNames}}) => `${filesPath}${filesNames[index]}`;

const createPhotosArr = ({photos: {filesNames}}) => Array.from({length: filesNames.length}, (val, index) => createPhotoLink(index, settings));

const photos = createPhotosArr(settings);

const runAndCleanAllMethodsOnce = (obj) => {
  for (const prop in obj) {
    if (typeof(obj[prop]) === 'function') {
      obj[prop]();
      delete obj[prop];
    }
  }
};

const createMockDataOfferObj = ({titles, types, roomMaxAmount, inOutTimes, features, descriptions, guestsPerRoomMax}) => {
  const mockDataOffer = {
    title: getRandomElement(titles),
    location: createLocation(settings),
    price: getRandomPrice(settings),
    type: getRandomElement(types),
    rooms: getRandomFromRange(1, roomMaxAmount),
    checkout: getRandomElement(inOutTimes),
    features: filterSomeElements(features),
    description: getRandomElement(descriptions),
    photos: getSomeRandomElements(photos),
    setAddress() {
      this.address = createAddress(this.location, settings);
    },
    setGuests() {
      this.guests = getRandomFromRange(this.rooms, this.rooms * guestsPerRoomMax);
    },
    setCheckin() {
      this.checkin = getCheckinTime(this.checkout, settings);
    },
  };

  runAndCleanAllMethodsOnce(mockDataOffer);

  return mockDataOffer;
};

const createMockDataObj = () => ({
  author: createMockDataAuthorObj(settings),
  offer: createMockDataOfferObj(settings),
});

const createDataArray = ({arrayLength}) => Array.from({length: arrayLength}, createMockDataObj);

const getDataArray = () => createDataArray(settings);

export{ getDataArray };
