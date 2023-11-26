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
const errorMessages = {
  REQUIRED_VALIDATION: 'Поле должно быть обязательно заполнено',
  MIN_LENGTH_VALIDATION: (element) =>
    `Длинна заголовка ${element.value.length} ${numWord(element.value.length, ['символ', 'символа', 'символов'])} из ${TITLE_MIN_LENGTH} минимальных.`,
  MAX_LENGTH_VALIDATION: (element) =>
    `Длинна заголовка ${element.value.length} ${numWord(element.value.length, ['символ', 'символа', 'символов'])}, допустимо ${TITLE_MAX_LENGTH}. `,
  MAX_PRICE_VALIDATION: `Превышена максимальная цена ${PRICE_MAX}`,
  MIN_PRICE_VALIDATION: (minValue) =>
    `Цена не может быть меньше ${minValue}`,
  CAPACITY_VALIDATION: (testElement) => {
    const testValue = +testElement.value;
    if (testValue === 100) {
      return 'Вообще не для гостей';
    }
    return `Для не более ${testValue} ${numWord(testValue, ['гостя', 'гостей', 'гостей'])}`;
  },
};

const validateMinLength = (validatedParam, minLength) => validatedParam.length >= minLength;

const validateMaxLength = (validatedParam, maxLength) => validatedParam.length <= maxLength;

const validateMinNumber = (validatedParam, minNumber) => validatedParam >= minNumber;

const validateCapacity = (validatedParam, testElement) => {
  validatedParam = +validatedParam;
  const testValue = +testElement.value;
  if (validatedParam === 0 && testValue === 100) {
    return true;
  }
  if (validatedParam === 0 && testValue !== 100) {
    return false;
  }
  if (validatedParam > 0 && testValue === 100) {
    return false;
  }
  if (validatedParam > testValue) {
    return false;
  }
  return true;
};

const validateForm = (form) => {

  const style = document.createElement('style');
  document.head.appendChild(style);
  style.sheet.insertRule('.text-help {color: red}');

  const fieldTitle = form.querySelector('#title');

  const fieldPrice = form.querySelector('#price');
  const selectorType = form.querySelector('#type');
  let selectorTypeValue = selectorType.value;
  const setPriceFieldPlaceholder = (value) => MIN_PRICE_DEPENDECES[value];
  const setPriceMin = (value) => MIN_PRICE_DEPENDECES[value];

  const selectCapacity = form.querySelector('#capacity');
  const selectRooms = form.querySelector('#room_number');

  const selectorTimeIn = form.querySelector('#timein');
  const selectorTimeOut = form.querySelector('#timeout');

  fieldTitle.setAttribute('data-pristine-required-message', errorMessages.REQUIRED_VALIDATION);

  const setPriceAttr = (value) => {
    fieldPrice.min = setPriceMin(value);
    fieldPrice.setAttribute('data-pristine-min-message', errorMessages.MIN_PRICE_VALIDATION(MIN_PRICE_DEPENDECES[value]));
    fieldPrice.placeholder = setPriceFieldPlaceholder(value);
  };

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

  setPriceAttr(selectorTypeValue);

  const onSelectorTypeChange = () => {
    selectorTypeValue = selectorType.value;
    setPriceAttr(selectorTypeValue);
    pristine.validate(fieldPrice);
  };

  selectorType.addEventListener('change', () => onSelectorTypeChange());

  pristine.addValidator(
    fieldTitle,
    (value) => validateMinLength(value, TITLE_MIN_LENGTH),
    () => errorMessages.MIN_LENGTH_VALIDATION(fieldTitle)
  );

  pristine.addValidator(
    fieldTitle,
    (value) => validateMaxLength(value, TITLE_MAX_LENGTH),
    () => errorMessages.MAX_LENGTH_VALIDATION(fieldTitle)
  );

  pristine.addValidator(
    fieldPrice,
    (value) => validateMinNumber(value, MIN_PRICE_DEPENDECES[selectorTypeValue]),
    () => errorMessages.MIN_PRICE_VALIDATION(MIN_PRICE_DEPENDECES[selectorTypeValue])
  );

  pristine.addValidator(
    selectCapacity,
    (value) => validateCapacity(value, selectRooms),
    () => errorMessages.CAPACITY_VALIDATION(selectRooms)
  );

  pristine.validate(selectCapacity);

  selectRooms.addEventListener('change', () => {
    pristine.validate(selectCapacity);
  });

  selectorTimeIn.addEventListener('change', () => {
    selectorTimeOut.value = selectorTimeIn.value;
  });

  selectorTimeOut.addEventListener('change', () => {
    selectorTimeIn.value = selectorTimeOut.value;
  });

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (!isValid) {
      alert('Форма невалидна');
      return;
    }
    alert('Форма валидна');
  });
};

export{ validateForm };
