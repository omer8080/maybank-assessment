// placeActions.js

export const FETCH_PLACE_DATA_REQUEST = 'FETCH_PLACE_DATA_REQUEST';
export const FETCH_PLACE_DATA_SUCCESS = 'FETCH_PLACE_DATA_SUCCESS';
export const FETCH_PLACE_DATA_FAILURE = 'FETCH_PLACE_DATA_FAILURE';

export const fetchPlaceDataRequest = () => ({
  type: FETCH_PLACE_DATA_REQUEST,
});

export const fetchPlaceDataSuccess = (data) => ({
  type: FETCH_PLACE_DATA_SUCCESS,
  payload: data,
});

export const fetchPlaceDataFailure = (error) => ({
  type: FETCH_PLACE_DATA_FAILURE,
  payload: error,
});

export const fetchPlaceData = (query) => {
  return async (dispatch) => {
    dispatch(fetchPlaceDataRequest());
    try {
      const response = await fetch(`/api/api/api/place/autocomplete/json?input=${query}&key=GOOGLE_MAP_API_KEY`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      dispatch(fetchPlaceDataSuccess(data.predictions));
    } catch (error) {
      dispatch(fetchPlaceDataFailure(error.message));
    }
  };
};
