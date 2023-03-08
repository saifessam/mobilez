import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
	name: "search",
	initialState: { isToggled: false },
	reducers: {
		toggle(state) { state.isToggled = !state.isToggled; },
	}
});

export default searchSlice;