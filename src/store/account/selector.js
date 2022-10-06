import { REQUEST_STATUS } from "../storeConstants";

export const selectAccount = (state) => state.account.account;
export const selectAccountError = (state) => state.account.errorAccount;

export const selectAccountLoading = (state) =>
  state.account.statuRequest === REQUEST_STATUS.PENDING;

export const selectAvatar = (state) => state.account.account.img;

export const selectAllCities = (state) => state.account.allCities;
export const selectAllCitiesError = (state) => state.account.errorCities;
export const selectAllCitiesLoading = (state) =>
  state.account.statusRequestCities === REQUEST_STATUS.PENDING;

export const selectEditSuccess = (state) =>
  state.account.statusEdit === REQUEST_STATUS.SUCCESS;
export const selectEditLoading = (state) =>
  state.account.statusEdit === REQUEST_STATUS.PENDING;
export const selectEditError = (state) =>
  state.account.statusEdit === REQUEST_STATUS.ERROR;
