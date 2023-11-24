import{
  disableElements,
  enableElements
} from './utils.js';

const map = document.querySelector('.map');
const mapFilters = map.querySelector('.map__filters');
const mapFiltersEltments = map.querySelectorAll('select, fieldset');

const disableFilter = () => {
  mapFilters.classList.add('map__filters--disabled');
  disableElements(mapFiltersEltments);
};

const enableFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');
  enableElements(mapFiltersEltments);
};

const initnFilters = () => {
  disableFilter();
  enableFilters();
};

export{
  initnFilters,
};
