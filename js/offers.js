import { getDataArray } from './mock-data.js';

const mapCanvas = document.querySelector('#map-canvas');
const offerTemplate = document.querySelector('#card').content.querySelector('.popup');
const dataArray = getDataArray();
const FEATURE_CLASS_MOD_SUBSTR = 'popup__feature--';
const FEATURE_CLASS_MOD_SUBSTR_INDEX = 1;

const generateOffersFeatures = (parent, sourceData) => {
  const featuresList = parent.querySelector('.popup__features');
  const featureItems = featuresList.querySelectorAll('.popup__feature');

  featureItems.forEach((item) => {
    const classUnicSubstring = item.classList[FEATURE_CLASS_MOD_SUBSTR_INDEX].slice(FEATURE_CLASS_MOD_SUBSTR.length);
    const isPresent = sourceData.some((element) => element === classUnicSubstring);
    if(isPresent) {
      item.remove();
    }
  }
  );
};

const generateOffer = ({offer:{title, features}}) => {

  const newOffer = offerTemplate.cloneNode(true);

  newOffer.querySelector('.popup__title').textContent = title;
  generateOffersFeatures(newOffer, features);

  mapCanvas.append(newOffer);
};

const generateOffers = () => {
  dataArray.forEach((data) => generateOffer(data));
};


export { generateOffers };
