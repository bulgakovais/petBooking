import { REQUEST_STATUS } from "../storeConstants";

export const selectSearchResult = (state) => state.search.searchResult;
export const selectCities = (state) => state.search.cities;

export const selectSearchResultLoading = (state) =>
  state.search.statusRequestSearch === REQUEST_STATUS.PENDING;
export const selectCitiesLoading = (state) =>
  state.search.statusRequestCities === REQUEST_STATUS.PENDING;

export const selectCitiesError = (state) => state.search.errorCities;
export const selectSearchError = (state) => state.search.errorResearch;
