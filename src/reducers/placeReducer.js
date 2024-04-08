// placeReducer.js

import {
  FETCH_PLACE_DATA_REQUEST,
  FETCH_PLACE_DATA_SUCCESS,
  FETCH_PLACE_DATA_FAILURE,
} from '../actions/placeActions';

const initialState = {
  loading: false,
  placeData: [],
  error: '',
};

const placeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PLACE_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case FETCH_PLACE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        placeData: action.payload,
        error: '',
      };
    case FETCH_PLACE_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        placeData: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default placeReducer;
