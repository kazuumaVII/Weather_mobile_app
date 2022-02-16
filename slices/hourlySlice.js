import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	hourly: [],
	isDataHourly: false,
};

export const hourlySlice = createSlice({
	name: 'hourly',
	initialState,
	reducers: {
		setHourly: (state, action) => {
			state.hourly = action.payload;
		},
		isHourly: (state, action) => {
			state.isDataHourly = action.payload;
		},
	},
});

export const { setHourly, isHourly, setHourlyOther, isHourlyOther } = hourlySlice.actions;
export default hourlySlice.reducer;
