import { getDataArray } from './mock-offers.js';
import { getOffer } from './offer.js';

const mapCanvas = document.querySelector('#map-canvas');
const dataArray = getDataArray();
dataArray.splice(1); // урезает массив элементов до 1 - первого - элемента

const renderOffers = () => {
  dataArray.forEach((element) => {
    mapCanvas.append(getOffer(element));
  });
};

export{ renderOffers };
