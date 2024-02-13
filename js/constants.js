const START_LAT_LNG = {
  lat: 35.67612,
  lng: 139.76292,
};
const LAT_LNG_PRECISSION = 5;
const MAIN_PIN_ICON_HEIGHT = 52;
const PIN_ICON_HEIGHT = 40;
const PRICE_DEPENDECES = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
  maxPrice: 100000,
  defaultType: 'flat',
};
const ERROR_MESSAGE_SHOW_TIME = 5000;
const NUMBER_OFFERS_DISPLAYED_ON_MAP = 10;
const DEBOUNCER_TIMEOUT_MS = 500;
const ALLOWED_IMAGE_FILE_TYPES = ['.jpg', '.jpeg', '.png'];

export{
  START_LAT_LNG,
  LAT_LNG_PRECISSION,
  MAIN_PIN_ICON_HEIGHT,
  PIN_ICON_HEIGHT,
  PRICE_DEPENDECES,
  ERROR_MESSAGE_SHOW_TIME,
  NUMBER_OFFERS_DISPLAYED_ON_MAP,
  DEBOUNCER_TIMEOUT_MS,
  ALLOWED_IMAGE_FILE_TYPES
};
