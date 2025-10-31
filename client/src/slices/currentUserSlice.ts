import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface CurrentUserState {
  user: UserModel;
}

// Define the initial state using that type
const initialState: CurrentUserState = {
  user: {} as UserModel,
};

export const currentUserSlice = createSlice({
  name: 'currentuser',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    loaduser: (state, action: PayloadAction<UserModel>) => {
      state.user = action.payload;
    },
  },
});

export const { loaduser } = currentUserSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default currentUserSlice.reducer;
