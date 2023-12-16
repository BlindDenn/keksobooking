import{
  START_LAT_LNG,
  MAIN_PIN_ICON_HEIGHT,
  PIN_ICON_HEIGHT
} from './constants.js';
import{ enableFilters } from './filters.js';
import{
  initForm,
  setAddressFieldValue
} from './form.js';
import{ getDataArray } from './mock-offers.js';

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

const initMap = () => {

  const map = L.map('map-canvas')
    .on('load', () => {
      enableFilters();
      initForm();
    })
    .setView(START_LAT_LNG, 12);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  const mainMarker = L.marker(
    START_LAT_LNG,
    {
      icon: mainPinIcon,
      draggable: true,
    }
  );

  const setOfferMarker = (obj) => {
    L.marker(
      obj.offer.location,
      { icon: pinIcon }
    ).addTo(map)
      .bindPopup('Попап, панимаиш!');
  };

  mainMarker.addTo(map);

  getDataArray().forEach((el) => {
    setOfferMarker(el);
  });

  mainMarker.on('drag', (evt) => setAddressFieldValue(evt.latlng));

};

export{ initMap };
