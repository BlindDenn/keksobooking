import{
  START_LAT_LNG,
  LAT_LNG_PRECISSION,
  PRICE_DEPENDECES
} from './constants.js';
import{
  disableElements,
  enableElements
} from './utils.js';
import{ validateForm } from './validation.js';

const form = document.querySelector('.ad-form');
const formFieldsets = form.querySelectorAll('fieldset');
const addressField = form.querySelector('#address');
const priceField = form.querySelector('#price');
const priceSlider = form.querySelector('.ad-form__slider');

const getPriceSlider = () => priceSlider;

const setAddressFieldValue = ({lat, lng}) => {
  const fixedData = (val) => val.toFixed(LAT_LNG_PRECISSION);
  (addressField.value = `${fixedData(lat)}, ${fixedData(lng)}`);
};

const disableForm = () => {
  form.classList.add('ad-form--disabled');
  disableElements(formFieldsets);
};

const enableForm = () => {
  form.classList.remove('ad-form--disabled');
  enableElements(formFieldsets);
};

noUiSlider.create(priceSlider, {
  start: 50000,
  connect: 'lower',
  step: 1000,
  range: {
    'min': 1000,
    'max': PRICE_DEPENDECES.maxPrice,
  }
});

const forceInput = new Event('input');

priceSlider.noUiSlider.on('slide', (evt) => {
  priceField.value = +evt[0];
  priceField.dispatchEvent(forceInput);
});

const initForm = () => {
  enableForm();
  setAddressFieldValue(START_LAT_LNG);
  validateForm(form);
};

export{
  disableForm,
  initForm,
  setAddressFieldValue,
  getPriceSlider
};
