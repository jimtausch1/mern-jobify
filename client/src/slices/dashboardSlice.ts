import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface DashboardState {
  currentUser: UserModel;
  isDarkTheme: boolean;
  showSidebar: boolean;
  searchParams: SearchParams;
}

// Define the initial state using that type
const initialState: DashboardState = {
  currentUser: {} as UserModel,
  isDarkTheme: localStorage.getItem('darkTheme') === 'true',
  showSidebar: true,
  searchParams: {
    search: '',
    jobStatus: 'all',
    jobType: 'all',
    sort: 'newest',
    page: 1,
  } as SearchParams,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.showSidebar = !state.showSidebar;
    },
    toggleTheme: (state) => {
      state.isDarkTheme = !state.isDarkTheme;
    },
    loadSearch: (state, action: PayloadAction<string>) => {
      state.searchParams.search = action.payload;
    },
    loadJobStatus: (state, action: PayloadAction<string>) => {
      state.searchParams.jobStatus = action.payload;
    },
    loadJobType: (state, action: PayloadAction<string>) => {
      state.searchParams.jobType = action.payload;
    },
    loadSort: (state, action: PayloadAction<string>) => {
      state.searchParams.sort = action.payload;
    },
    loadPage: (state, action: PayloadAction<number>) => {
      state.searchParams.page = action.payload;
    },
    loadUser: (state, action: PayloadAction<UserModel>) => {
      state.currentUser = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  toggleTheme,
  loadSearch,
  loadJobStatus,
  loadJobType,
  loadSort,
  loadPage,
  loadUser,
} = dashboardSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default dashboardSlice.reducer;
