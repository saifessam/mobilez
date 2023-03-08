import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/auth';
import menuSlice from './slices/menu';
import searchSlice from './slices/search';

const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		menu: menuSlice.reducer,
		search: searchSlice.reducer,
	}
});

export default store;