import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { KEY_WEATHER_ONE_CALL } from '../other/KeyApi';

export const fetchPost = createAsyncThunk('/fetchOneCall', async (coords) => {
	try {
		const { data } = await axios.get(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${coords.latitude}&lon=${coords.longitude}&exclude=minutely&lang=fr&units=metric&appid=${KEY_WEATHER_ONE_CALL}`,
		);

		return data;
	} catch (err) {
		console.error(err.response);
	}
});

const initialState = {
	location: [],
	isChoiceData: false,
};

const dataSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {
		setLocat: (state, action) => {
			state.location = action.payload;
		},
		setIsChoiceData: (state, action) => {
			state.isChoiceData = action.payload;
		},
	},
	extraReducers: {
		[fetchPost.pending]: (state, action) => {
			state.loading = true;
		},
		[fetchPost.fulfilled]: (state, action) => {
			state.data = action.payload;
			state.loading = false;
		},
		[fetchPost.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const { setLocat, setIndexBloc, setIsChoiceData } = dataSlice.actions;

// export const selectLocation = (state) => state.post.location;

export default dataSlice.reducer;
