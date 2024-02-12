import{
  disableElements,
  enableElements
} from './utils.js';

const map = document.querySelector('.map');
const mapFilters = map.querySelector('.map__filters');
const mapFiltersEltments = map.querySelectorAll('select, fieldset');

const disableFilters = () => {
  mapFilters.classList.add('map__filters--disabled');
  disableElements(mapFiltersEltments);
};

const enableFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');
  enableElements(mapFiltersEltments);
};

const normalizeName = (str) => (str.includes('-') ? str.slice(str.indexOf('-') + 1) : str);

const filterType = (criteriaValue, element) => element.offer.type === criteriaValue;

const filterPrice = (criteriaValue, element) => {
  const isMiddle = (val) => val.offer.price >= 10000 && element.offer.price < 50000;
  const isLow = (val) => val.offer.price < 10000;
  const isHigh = (val) => val.offer.price >= 50000;
  switch (criteriaValue) {
    case 'middle' :
      return isMiddle(element);
    case 'low' :
      return isLow(element);
    case 'high' :
      return isHigh(element);
  }
};

const filterRooms = (criteriaValue, element) => element.offer.rooms === +criteriaValue;

const filterGuests = (criteriaValue, element) => element.offer.guests === +criteriaValue;

const filterFeatures = (criteriaValue, element) => element.offer.features ? element.offer.features.includes(criteriaValue) : false ;

const isFilterPassed = (criteria, parametr) => {
  switch(criteria[0]) {
    case 'type' :
      return filterType(criteria[1], parametr);
    case 'price' :
      return filterPrice(criteria[1], parametr);
    case 'rooms' :
      return filterRooms(criteria[1], parametr);
    case 'guests' :
      return filterGuests(criteria[1], parametr);
    case 'features' :
      return filterFeatures(criteria[1], parametr);
  }
};

const filterOffers = (arr) => {

  let result = arr.slice();

  const rawfilterSettigs = (Array.from((new FormData(mapFilters)).entries()));
  rawfilterSettigs.forEach((pair) => {
    pair[0] = normalizeName(pair[0]);
    if (pair[1] !== 'any') {
      result = result.filter((element) => isFilterPassed(pair, element));
    }
  });
  return result;
};

export{
  disableFilters,
  enableFilters,
  filterOffers,
};
