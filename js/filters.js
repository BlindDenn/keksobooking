import{
  disableElements,
  enableElements
} from './utils.js';

const map = document.querySelector('.map');
const mapFilters = map.querySelector('.map__filters');
const mapFiltersEltments = map.querySelectorAll('select, fieldset');

// ++++++++++++++++++++++++++++++++++++++++++++

// const filtersFormData = new FormData(mapFilters);
// const filtersFormNames = new Set(filtersFormData.keys());
// console.log(filtersFormNames);

// const rawFilterFormSettings = Object.fromEntries(filtersFormData);
// console.log(rawFilterFormSettings);
// for (const v of filtersFormNames) {
//   console.log(v + ': ' + (filtersFormData.getAll(v).length > 1 ? filtersFormData.getAll(v) : filtersFormData.get(v)));
// }

// const currentFilterFormSettings = Array.from(filtersFormNames).reduce((acc, filterName) => ({...acc, [filterName] : filtersFormData.getAll(filterName)}), {});

// console.log(currentFilterFormSettings);


// const aaa = Array.from(filtersFormData);
// console.log(aaa);
// const bbb = aaa.reduce((acc, input) => ({...acc, [input[0]]: input[1]}), {});
// console.log(bbb);

// +++++++++++++++++++++++++++++++++++++++++++++++++

// const filterSelects = Array.from(mapFilters.querySelectorAll('select, input'));
// filterSelects.forEach((item) => console.log(item.name));
// const filterSelectsSettings = filterSelects.reduce((acc, item) => ({...acc, [item.name] : item.value}), {});
// console.log(filterSelectsSettings);

// ++++++++++++++++++++++++++++++++++++++++++++

const disableFilters = () => {
  mapFilters.classList.add('map__filters--disabled');
  disableElements(mapFiltersEltments);
};

const enableFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');
  enableElements(mapFiltersEltments);
};

const normalizeName = (str) => {
  const answer = str.includes('housing-') ? str.slice(8) : str;
  return answer;
};

const filterOffers = (arr) => {

  let result = arr;

  mapFilters.addEventListener('input', () => {
    const rawfilterSettigs = (Array.from((new FormData(mapFilters)).entries()));
    for (const pair of rawfilterSettigs) {
      pair[0] = normalizeName(pair[0]);
      result = arr.filter((element) => element.offer[pair[0]] === pair[1]);
      console.log(result);
    }
  });

  return result;
};

// mapFilters.querySelector('.map__filter').addEventListener('input', () => console.log('changed'));

export{
  disableFilters,
  enableFilters,
  filterOffers,
};
