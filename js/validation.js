// import{ getForm } from './elements.js';
import{ numWord } from './utils.js';

const TITLE_MIN_LENGTH = 10;
const TITLE_MAX_LENGTH = 15;
const PRICE_MAX = 100000;
const MIN_PRICE_DEPENDECES = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const getExtremeRoomsValue = () => {
  const roomsNodeList = document.querySelectorAll('#room_number > option');
  const roomsValues = Array.from(roomsNodeList)
    .map((element) => element.value);
  return Math.max(...roomsValues);
};

const extremeRoomsValue = getExtremeRoomsValue();

const errorMessages = {
  REQUIRED_VALIDATION: 'Поле должно быть обязательно заполнено',
  MAX_LENGTH_VALIDATION: (element) =>
    `Длинна заголовка ${element.value.length} ${numWord(element.value.length, ['символ', 'символа', 'символов'])} из ${TITLE_MAX_LENGTH} допустимых`,
  MAX_PRICE_VALIDATION: `Превышена максимальная цена ${PRICE_MAX}`,
  CAPACITY_VALIDATION: (testElement) => {
    const testValue = +testElement.value;
    if (testValue === extremeRoomsValue) {
      return 'Вообще не для гостей';
    }
    return `Не более ${testValue} ${numWord(testValue, ['гостя', 'гостей', 'гостей'])}`;
  },
};

// const validateMaxLength = (validatedParam, maxLength) => validatedParam.length <= maxLength;

const validateForm = (form) => {

  const style = document.createElement('style');
  document.head.appendChild(style);
  style.sheet.insertRule('.text-help {color: red; position: absolute; transform: translateY(4px)}');

  const fieldTitle = form.querySelector('#title');

  const selectorType = form.querySelector('#type');
  const fieldPrice = form.querySelector('#price');

  const setPriceFieldPlaceholder = (value) => MIN_PRICE_DEPENDECES[value];
  const setPriceMin = (value) => MIN_PRICE_DEPENDECES[value];

  const setPriceAttr = (value) => {
    fieldPrice.min = setPriceMin(value);
    fieldPrice.placeholder = setPriceFieldPlaceholder(value);
  };

  const selectCapacity = form.querySelector('#capacity');
  const selectRooms = form.querySelector('#room_number');

  const selectorTimeIn = form.querySelector('#timein');
  const selectorTimeOut = form.querySelector('#timeout');

  fieldTitle.setAttribute('data-pristine-required-message', errorMessages.REQUIRED_VALIDATION);

  fieldPrice.setAttribute('data-pristine-required-message', errorMessages.REQUIRED_VALIDATION);
  fieldPrice.setAttribute('data-pristine-max-message', errorMessages.MAX_PRICE_VALIDATION);
  fieldPrice.removeAttribute('min');

  const pristine = new Pristine(
    form,
    {
      // class of the parent element where the error/success class is added
      classTo: 'ad-form__element',
      errorClass: 'has-danger',
      successClass: 'has-success',
      // class of the parent element where error text element is appended
      errorTextParent: 'ad-form__element',
      // type of element to create for the error text
      errorTextTag: 'div',
      // class of the error text element
      errorTextClass: 'text-help'
    }
  );

  const validateMinLength = (value) => value.length >= TITLE_MIN_LENGTH;
  const minLengthErrorMessage = () =>
    `Длинна заголовка ${fieldTitle.value.length} ${numWord(fieldTitle.value.length, ['символ', 'символа', 'символов'])} из ${TITLE_MIN_LENGTH} минимальных`;

  pristine.addValidator(
    fieldTitle,
    validateMinLength,
    minLengthErrorMessage
  );

  const validateMaxLength = (value) => value.length <= TITLE_MAX_LENGTH;
  const maxLengthErrorMessage = () =>
    `Длинна заголовка ${fieldTitle.value.length} ${numWord(fieldTitle.value.length, ['символ', 'символа', 'символов'])} из ${TITLE_MAX_LENGTH} допустимых`;

  pristine.addValidator(
    fieldTitle,
    validateMaxLength,
    maxLengthErrorMessage
  );

  setPriceAttr(selectorType.value);

  const onSelectorTypeChange = () => {
    setPriceAttr(selectorType.value);
    pristine.validate(fieldPrice);
  };

  selectorType.addEventListener('change', onSelectorTypeChange);

  const validateMinPrice = (value) => value >= MIN_PRICE_DEPENDECES[selectorType.value];
  const getMinPriceErrorMessage = () => `Цена не может быть меньше ${MIN_PRICE_DEPENDECES[selectorType.value]}`;

  pristine.addValidator(
    fieldPrice,
    validateMinPrice,
    getMinPriceErrorMessage
  );

  const validateCapacity = (value) => {
    value = +value;
    const selectRoomsNum = +selectRooms.value;
    if (value === 0 && selectRoomsNum === extremeRoomsValue) {
      return true;
    }
    if (value === 0 && selectRoomsNum !== extremeRoomsValue) {
      return false;
    }
    if (value > 0 && selectRoomsNum === extremeRoomsValue) {
      return false;
    }
    if (value > selectRoomsNum) {
      return false;
    }
    return true;
  };

  const getCapacityErrorMessage = () => {
    const testValue = +selectRooms.value;
    if (testValue === extremeRoomsValue) {
      return 'Вообще не для гостей';
    }
    return `Не более ${testValue} ${numWord(testValue, ['гостя', 'гостей', 'гостей'])}`;
  };

  pristine.addValidator(
    selectCapacity,
    validateCapacity,
    getCapacityErrorMessage
  );

  const onSelectRoomsChange = () => {
    pristine.validate(selectCapacity);
  };

  selectRooms.addEventListener('change', onSelectRoomsChange);

  const onSelectTimeInChange = () => {
    selectorTimeOut.value = selectorTimeIn.value;
  };

  selectorTimeIn.addEventListener('change', onSelectTimeInChange);

  const onSelectTimeOutChange = () => {
    selectorTimeIn.value = selectorTimeOut.value;
  };

  selectorTimeOut.addEventListener('change', onSelectTimeOutChange);

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (!isValid) {
      alert(isValid);
      return false;
    }
    alert(isValid);
    return true;
  });
};

export{ validateForm };
