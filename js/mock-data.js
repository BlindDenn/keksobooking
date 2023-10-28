import{ getMockDataArraySetting } from './mock-data-settings.js';
import{
  getRandomFromRange,
  getRandomElement,
  extractRandomElements,
  getSomeRandomElements
} from './utils.js';

const settingsObj = getMockDataArraySetting();

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

const avatarFiles = createAvatarFiles(settingsObj.arrayLength, settingsObj.avatarFileNameTemplate);

const getRandomAvatarFile = extractRandomElements(avatarFiles);

const createMockDataAuthorObj = () => ({
  avatar: `${settingsObj.avatarPictureFilesPath}${getRandomAvatarFile()}`
});

const createAdress = (obj) => `${(obj.lat).toFixed(settingsObj.locationLimits.precision)}, ${(obj.log).toFixed(settingsObj.locationLimits.precision)}`;

const getRandomPrice = ({minPrice, maxPrice, zeroesCount}) => getRandomFromRange(minPrice / 10 ** zeroesCount, maxPrice / 10 ** zeroesCount) * 10 ** zeroesCount;

const getCheckinTime = (checoutTime) => {
  const checkoutTimeIndex = settingsObj.inOutTimes.indexOf(checoutTime);
  return settingsObj.inOutTimes[getRandomFromRange(checkoutTimeIndex, settingsObj.inOutTimes.length - 1)];
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
    title: getRandomElement(settingsObj.titles),
    location: createLocation(settingsObj.locationLimits),
    price: getRandomPrice(settingsObj.priceLimits),
    type: getRandomElement(settingsObj.types),
    rooms: getRandomFromRange(1, settingsObj.roomMaxAmount),
    checkout: getRandomElement(settingsObj.inOutTimes),
    features: filterSomeElements(settingsObj.features),
    description: getRandomElement(settingsObj.descriptions),
    photos: getSomeRandomElements(settingsObj.photosLinks),
    setAdress() {
      this.adress = createAdress(this.location);
    },
    setGuests() {
      this.guests = getRandomFromRange(this.rooms, this.rooms * settingsObj.guestsPerRoomMax);
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

const getDataArray = () => createDataArray(settingsObj.arrayLength);

export{ getDataArray };


