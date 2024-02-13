import{
  START_LAT_LNG,
  LAT_LNG_PRECISSION,
  PRICE_DEPENDECES,
  ALLOWED_IMAGE_FILE_TYPES
} from './constants.js';
import{
  disableElements,
  enableElements,
  isEscapeKey
} from './utils.js';
import{
  validateForm,
  resetValidation
} from './validation.js';
import { uploadData } from './api.js';
import{ resetMapView } from './map.js';

const form = document.querySelector('.ad-form');
const formFieldsets = form.querySelectorAll('fieldset');
const avatarUploadField = form.querySelector('#avatar');
const avatarPreview = form.querySelector('.ad-form-header__preview img');
const adImageUploadField = form.querySelector('#images');
const adImagesParent = form.querySelector('.ad-form__photo');
const addressField = form.querySelector('#address');
const typeSelector = form.querySelector('#type');
const priceField = form.querySelector('#price');
const priceSlider = form.querySelector('.ad-form__slider');
const successModalTemplate = document.querySelector('#success').content.querySelector('.success');
const errorModalTemplate = document.querySelector('#error').content.querySelector('.error');
const submitButton = form.querySelector('.ad-form__submit');
const resetButton = form.querySelector('.ad-form__reset');
const defaultPrice = PRICE_DEPENDECES[PRICE_DEPENDECES.defaultType];

const setAddressFieldValue = ({lat, lng}) => {
  const fixedData = (val) => val.toFixed(LAT_LNG_PRECISSION);
  (addressField.value = `${fixedData(lat)}, ${fixedData(lng)}`);
};

const sliderOptions = {
  start: defaultPrice,
  connect: 'lower',
  padding: [defaultPrice, 0],
  step: 100,
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return value;
    }
  },
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

form.addEventListener('reset', () => priceSlider.noUiSlider.set(defaultPrice));

priceSlider.noUiSlider.on('slide', (arr) => {
  priceField.value = arr[0];
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
};

const addCloseOnClickAndEsc = (element) => {

  function removeListeners () {
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onDocumentKeydown);
  }

  function onDocumentClick () {
    element.remove();
    removeListeners();
  }

  function onDocumentKeydown (evt) {
    if (isEscapeKey(evt)) {
      element.remove();
    }
    removeListeners();
  }

  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const showSuccessModal = () => {
  const successModal = successModalTemplate.cloneNode(true);
  document.body.append(successModal);

  addCloseOnClickAndEsc(successModal);
  form.reset();
  resetMapView();
  submitButton.blur();
  setAddressFieldValue(START_LAT_LNG);
};

const showErrorModal = () => {
  const errorModal = errorModalTemplate.cloneNode(true);
  document.body.append(errorModal);
  const errorButton = errorModal.querySelector('.error__button');

  errorButton.addEventListener('click', () => {
    errorModal.remove();
  });
  addCloseOnClickAndEsc(errorModal);
  submitButton.blur();
};

const uploadForm = async (data) => {
  try {
    await uploadData(data);
    showSuccessModal();
  } catch (err) {
    showErrorModal();
  } finally {
    enableForm();
  }
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  const isValid = validateForm();
  if (isValid) {
    const formData = new FormData(form);
    disableForm();
    uploadForm(formData);
  }
};

const onFormReset = (evt) => {
  evt.preventDefault();
  form.reset();
  if (avatarPreview.src !== 'img/muffin-grey.svg') {
    avatarPreview.src = 'img/muffin-grey.svg';
  }
  if (adImagesParent.children.length) {
    adImagesParent.children[0].remove();
  }
  resetValidation();
  resetMapView();
};

const isImageFileValid = (testedFile) => ALLOWED_IMAGE_FILE_TYPES.some((it) => testedFile.name.toLowerCase().endsWith(it));

const onAvatarUploadField = () => {
  const file = avatarUploadField.files[0];
  if (isImageFileValid(file)) {
    avatarPreview.src = URL.createObjectURL(file);
  }
};

const onAdImageUploadFieldInput = () => {

  const adImage = document.createElement('img');
  adImage.setAttribute('alt', 'Фотография жилья.');
  adImage.setAttribute('width', '140');
  adImage.setAttribute('height', '140');

  const file = adImageUploadField.files[0];
  const currentAdImage = adImagesParent.querySelector('img');
  if (currentAdImage) {
    currentAdImage.remove();
  }
  if (isImageFileValid(file)) {
    adImage.src = URL.createObjectURL(file);
    adImagesParent.appendChild(adImage);
  }
};

form.addEventListener('submit', onUploadFormSubmit);
resetButton.addEventListener('click', onFormReset);
avatarUploadField.addEventListener('input', onAvatarUploadField);
adImageUploadField.addEventListener('input', onAdImageUploadFieldInput);

export{
  disableForm,
  initForm,
  setAddressFieldValue,
};
