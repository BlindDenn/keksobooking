import { getDataArray } from './mock-data.js';

const offerTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');

const dataArray = getDataArray();

const generateOffer = ({offer:{title}}) => {
  const offer = offerTemplate.cloneNode(true);
  offer.querySelector('.popup__title').textContent = title;
  // offer.querySelector('.popup__title').textContent = data.offer.title;
  mapCanvas.append(offer);
};

const generateOffers = () => {
  dataArray.forEach((data) => generateOffer(data));
};

getDataArray();

export { generateOffers };
