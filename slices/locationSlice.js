import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	location: [],
};

export const locationSlice = createSlice({
	name: 'location',
	initialState,
	reducers: {
		setLocat: (state, action) => {
			state.location = action.payload;
		},
	},
});

export const { setLocat } = locationSlice.actions;

export default locationSlice.reducer;
