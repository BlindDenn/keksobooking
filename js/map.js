import{
  START_LAT_LNG,
  MAIN_PIN_ICON_HEIGHT,
  PIN_ICON_HEIGHT,
  NUMBER_OFFERS_DISPLAYED_ON_MAP,
  DEBOUNCER_TIMEOUT_MS
} from './constants.js';
import{
  enableFilters,
  filterOffers,
} from './filters.js';
import{
  initForm,
  setAddressFieldValue
} from './form.js';
import{
  getDataArray,
  onGetDataError
} from './api.js';
import {
  getOffer
} from './offer.js';
import{ debounce } from'./utils.js';

const mapContainer = document.querySelector('#map-canvas');
const mapFiltersForm = document.querySelector('.map__filters');

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [MAIN_PIN_ICON_HEIGHT, MAIN_PIN_ICON_HEIGHT],
  iconAnchor: [MAIN_PIN_ICON_HEIGHT / 2, MAIN_PIN_ICON_HEIGHT],
});

const pinIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [PIN_ICON_HEIGHT, PIN_ICON_HEIGHT],
  iconAnchor: [PIN_ICON_HEIGHT / 2, PIN_ICON_HEIGHT],
});

const map = L.map('map-canvas');

const mainMarker = L.marker(
  START_LAT_LNG,
  {
    icon: mainPinIcon,
    draggable: true,
  }
);

const markerGroup = L.layerGroup();

const setOfferMarker = (obj) => {
  const offerMarker = L.marker(
    obj.location,
    {
      icon: pinIcon
    }
  )
    .bindPopup(getOffer(obj));

  return offerMarker;
};

const addOffersMarkers = (arr) => {
  markerGroup.clearLayers();
  arr.forEach((el) => {
    setOfferMarker(el).addTo(markerGroup);
  });
  markerGroup.addTo(map);
};

const initOfferMarkers = async() => {
  let rawDataArray;

  const onMapFiltersFormsInput = (arr) => {
    const filteredDataArray = filterOffers(arr);
    addOffersMarkers(filteredDataArray.toSpliced(NUMBER_OFFERS_DISPLAYED_ON_MAP));
  };

  try {
    rawDataArray = await getDataArray();
    addOffersMarkers(rawDataArray.toSpliced(NUMBER_OFFERS_DISPLAYED_ON_MAP));
    enableFilters();
  } catch(err) {
    onGetDataError(mapContainer);
  }

  mapFiltersForm.addEventListener('input', debounce(() => onMapFiltersFormsInput(rawDataArray), DEBOUNCER_TIMEOUT_MS));

};

const initMap = () => {

  map.on('load', () => {
    initForm();
  })
    .setView(START_LAT_LNG, 13);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  mainMarker
    .addTo(map)
    .on('drag', (evt) => setAddressFieldValue(evt.latlng));

  initOfferMarkers();
};

const resetMapView = () => {
  map.setView(START_LAT_LNG, 13);
  mainMarker.setLatLng(START_LAT_LNG);
  setAddressFieldValue(START_LAT_LNG);
};

export{
  initMap,
  resetMapView
};
