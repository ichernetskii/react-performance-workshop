import {createAction} from "@reduxjs/toolkit";

export const toggleLoader = createAction("loader/toggle");
export const closeLoader = createAction("loader/close");

const initialState = { isVisible: false }

const loaderReducer = (state = initialState, action) => {
	switch (action.type) {
		case toggleLoader.type:
			return {
				...state,
				isVisible: !state.isVisible,
			};
		case closeLoader.type:
			return {
				...state,
				isVisible: false,
			};
		default:
			return state;
	}
}

export default loaderReducer;
