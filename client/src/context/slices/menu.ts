import { createSlice } from '@reduxjs/toolkit';

const menuSlice = createSlice({
	name: "menu",
	initialState: { isToggled: false },
	reducers: {
		toggle(state) { state.isToggled = !state.isToggled; },
	}
});

export default menuSlice;