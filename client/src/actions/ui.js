import { types } from "../types/types"

export const uiOpenModal = () => ({ type: types.uiOpenModal });
export const uiCloseModal = () => ({ type: types.uiCloseModal });
export const uiOpenSnackBar = (snackBar) => ({ type: types.uiOpenSnackBar, payload: snackBar});
export const uiCloseSnackBar = () => ({ type: types.uiCloseSnackBar });