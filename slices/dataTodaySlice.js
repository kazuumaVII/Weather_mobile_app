import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { KEY_WEATHER_CITY } from '../other/KeyApi';

export const fetchTodays = createAsyncThunk('/fetchTodays', async (city) => {
	try {
		const { data } = await axios.get(
			`https://api.weatherapi.com/v1/forecast.json?key=${KEY_WEATHER_CITY}&q=${city}&days=10&aqi=no&alerts=no&lang=fr`,
		);
		return data;
	} catch (err) {
		console.error(err.response);
	}
});

const dataTodays = createSlice({
	name: 'todays',
	initialState: {},

	extraReducers: {
		[fetchTodays.pending]: (state, action) => {
			state.loading = true;
		},
		[fetchTodays.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.loading = false;
		},
		[fetchTodays.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export default dataTodays.reducer;
