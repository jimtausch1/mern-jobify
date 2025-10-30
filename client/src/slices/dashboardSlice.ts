import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
interface DashboardState {
  isDarkTheme: boolean;
  showSidebar: boolean;
}

// Define the initial state using that type
const initialState: DashboardState = {
  isDarkTheme: localStorage.getItem('darkTheme') === 'true',
  showSidebar: true,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.showSidebar = !state.showSidebar;
    },
    toggleTheme: (state) => {
      state.isDarkTheme = !state.isDarkTheme;
    },
  },
});

export const { toggleSidebar, toggleTheme } = dashboardSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value;

export default dashboardSlice.reducer;
