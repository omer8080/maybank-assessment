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
      const proxyUrl = 'https://api.allorigins.win/get?url=';
      const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=GOOGLE_MAP_API_KEY`;
      const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      // Extract JSON from the response
      const jsonData = JSON.parse(data.contents);
      dispatch(fetchPlaceDataSuccess(jsonData.predictions));
    } catch (error) {
      dispatch(fetchPlaceDataFailure(error.message));
    }
  };
};
