import { showAlert } from './utils.js';
import { ERROR_MESSAGE_SHOW_TIME } from './constants.js';

const BASE_URL = 'https://25.javascript.htmlacademy.pro/keksobooking';
const Route = {
  GET_DATA : '/data',
  SEND_DATA : '/'
};
const Method = {
  GET : 'GET',
  POST : 'POST'
};
const MAP_DATA_LOADING_ERROR_MESSAGE = 'Что-то пошло не так. Попробуйте перезагрузить страницу';

const load = (
  route = Route.GET_DATA,
  method = Method.GET,
  body = null
) => fetch(`${BASE_URL}${route}`, {method : method, body})
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    } else {
      return response.json();
    }
  })
  .catch(() => {
    throw new Error();
  });

const getDataArray = () => load();

const uploadData = (data) => load(Route.SEND_DATA, Method.POST, data);

const onGetDataError = (element) => showAlert(element, MAP_DATA_LOADING_ERROR_MESSAGE, ERROR_MESSAGE_SHOW_TIME);

export{
  getDataArray,
  uploadData,
  onGetDataError
};
