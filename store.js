import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./slices/locationSlice";
import postReducer from "./slices/dataSlice";
import dataTodays from "./slices/dataTodaySlice";
import hourlyReducer from "./slices/hourlySlice";

export const store = configureStore({
  reducer: {
    location: locationReducer,
    post: postReducer,
    todays: dataTodays,
    hourly: hourlyReducer,
  },
});
