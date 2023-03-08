import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
	name: "auth",
	initialState: { isSignedIn: false, id: null, role: null },
	reducers: {
		signIn(state, action) {
			state.isSignedIn = true;
			state.id = action.payload.id;
			state.role = action.payload.role;
		},
		signOut(state) {
			state.isSignedIn = false;
			state.id = null;
			state.role = null;
		},
	}
});

export default authSlice;