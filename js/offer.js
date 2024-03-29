import { numWord } from './utils.js';

const offerTemplate = document.querySelector('#card').content.querySelector('.popup');
const FEATURE_CLASS_MOD_SUBSTR = 'popup__feature--';
const FEATURE_CLASS_MOD_SUBSTR_INDEX = 1;
const TYPE_MAP = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const setText = (item, sourceData) => {
  item.textContent = sourceData;
};

const setPrice = (item, sourceData) => {
  item.textContent = `${sourceData} ₽/ночь`;
};

const setType = (item, sourceData) => {
  item.textContent = TYPE_MAP[sourceData];
};

const setRoomsGuests = (item, sourceData) => {
  const [rooms, guests] = sourceData;
  const setGuestsMessage = (number) => (number === 0 ? 'не для гостей' : `для ${number} ${numWord(number, ['гостя', 'гостей', 'гостей'])}`);
  item.textContent = `${rooms} ${numWord(rooms, ['комната', 'комнаты', 'комнат'])} ${setGuestsMessage(guests)}`;
};

const setCheckinCheckout = (item, sourceData) => {
  const [checkin, checkout] = sourceData;
  item.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
};

const getOffersFeatures = (item, sourceData) => {
  const featureItems = item.querySelectorAll('.popup__feature');

  featureItems.forEach((listItem) => {
    const classUnicSubstring = listItem.classList[FEATURE_CLASS_MOD_SUBSTR_INDEX].slice(FEATURE_CLASS_MOD_SUBSTR.length);
    const isPresent = sourceData.some((element) => element === classUnicSubstring);
    if(!isPresent) {
      listItem.remove();
    }
  }
  );
};

const setPhotos = (item, sourceData) => {
  const imageTemplate = item.querySelector('.popup__photo');
  item.children[0].remove();
  sourceData.forEach((element) => {
    const newImage = imageTemplate.cloneNode(true);
    newImage.src = element;
    item.append(newImage);
  });
};

const setAvatarImg = (item, sourceData) => {
  item.src = sourceData;
};

const getOffer = ({author:{avatar}, offer:{title, address, price, type, rooms, guests, checkin, checkout, features, description, photos}}) => {

  const newOffer = offerTemplate.cloneNode(true);

  const generateOfferItem = (itemSelector, sourceData, cb) => {
    const item = newOffer.querySelector(itemSelector);

    if (typeof(sourceData) === 'object' && sourceData.length === 0) {
      sourceData = false;
    }

    if (!sourceData) {
      item.remove();
      return;
    }

    cb(item, sourceData);
  };

  generateOfferItem('.popup__title', title, setText);
  generateOfferItem('.popup__text--address', address, setText);
  generateOfferItem('.popup__text--price', price, setPrice);
  generateOfferItem('.popup__type', type, setType);
  generateOfferItem('.popup__features', features, getOffersFeatures);
  generateOfferItem('.popup__text--capacity', [rooms, guests], setRoomsGuests);
  generateOfferItem('.popup__text--time', [checkin, checkout], setCheckinCheckout);
  generateOfferItem('.popup__description', description, setText);
  generateOfferItem('.popup__photos', photos, setPhotos);
  generateOfferItem('.popup__avatar', avatar, setAvatarImg);

  return newOffer;
};

// --- Генерация одной случайной карточки из массива объектов

// const generateOffers = () => {
//   const index = getRandomIndex(dataArray);
//   generateOffer(dataArray[index]);
// };

// --- Генерация всех карточек по числу объектов

// const generateOffers = () => {
//   dataArray.forEach((data) => generateOffer(data));
// };

export { getOffer };
