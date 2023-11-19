const form = document.querySelector('.ad-form');
const formFieldsets = form.querySelectorAll('fieldset');
const map = document.querySelector('.map');
const mapFilters = map.querySelector('.map__filters');
const mapFiltersEltments = map.querySelectorAll('select, fieldset');

const disableElements = (elements) => {
  elements.forEach((element) => {
    element.disabled = true;
  });
};

const enableElements = (elements) => {
  elements.forEach((element) => {
    element.disabled = false;
  });
};

const disableInteractiveElements = () => {
  form.classList.add('ad-form--disabled');
  disableElements(formFieldsets);
  mapFilters.classList.add('map__filters--disabled');
  disableElements(mapFiltersEltments);
};

const enableInteractiveElements = () => {
  form.classList.remove('ad-form--disabled');
  enableElements(formFieldsets);
  mapFilters.classList.remove('map__filters--disabled');
  enableElements(mapFiltersEltments);
};

export{
  disableInteractiveElements,
  enableInteractiveElements,
};
