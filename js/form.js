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
const typeSelector = form.querySelector('#type');
const priceField = form.querySelector('#price');
const priceSlider = form.querySelector('.ad-form__slider');

const setAddressFieldValue = ({lat, lng}) => {
  const fixedData = (val) => val.toFixed(LAT_LNG_PRECISSION);
  (addressField.value = `${fixedData(lat)}, ${fixedData(lng)}`);
};

const sliderOptions = {
  start: PRICE_DEPENDECES.flat,
  connect: 'lower',
  padding: [PRICE_DEPENDECES.flat, 0],
  step: 100,
  animation: false,
  range: {
    'min': 0,
    'max': PRICE_DEPENDECES.maxPrice,
  }
};

noUiSlider.create(priceSlider, sliderOptions);

const forceInput = new Event('input');

typeSelector.addEventListener('change', () => {
  priceSlider.noUiSlider.updateOptions({
    padding: [PRICE_DEPENDECES[typeSelector.value], 0]
  });
});

priceField.addEventListener('change', () => priceSlider.noUiSlider.set(priceField.value));

priceSlider.noUiSlider.on('slide', (evt) => {
  priceField.value = +evt[0];
  priceField.dispatchEvent(forceInput);
});

const disableForm = () => {
  form.classList.add('ad-form--disabled');
  disableElements(formFieldsets);
};

const enableForm = () => {
  form.classList.remove('ad-form--disabled');
  enableElements(formFieldsets);
};

const initForm = () => {
  enableForm();
  setAddressFieldValue(START_LAT_LNG);
  validateForm(form);
};

export{
  disableForm,
  initForm,
  setAddressFieldValue,
};
