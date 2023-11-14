import { PropertyFilterParams, PropertyType } from '@/@types/property';
import http from '@/utils/http';
import { AsyncThunk, PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

interface PropertyState {
  propertyList: PropertyType[];
  filterParams: PropertyFilterParams;
  loading: boolean;
  currentRequestId: undefined | string;
}

const initialState: PropertyState = {
  propertyList: [],
  filterParams: {
    PageIndex: 1,
    Type: undefined,
    City: undefined,
    CheckInDate: undefined,
    CheckOutDate: undefined,
    MinPrice: undefined,
    MaxPrice: undefined,
    AdultCount: undefined,
    ChildCount: undefined,
    Search: undefined,
    TotalPages: 7,
  },
  loading: false,
  currentRequestId: undefined,
};

// create Thunk
export const getPropertyList = createAsyncThunk(
  'property/getPropertyList',
  async (body: PropertyFilterParams, thunkAPI) => {
    const queryParams = [];
    for (const key in body) {
      if (body[key] !== undefined && !Array.isArray(body[key])) {
        queryParams.push(`${key}=${body[key]}`);
      }
    }
    const response = await http.get(`api/properties?${queryParams.join('&')}&PageSize=16`, {
      signal: thunkAPI.signal,
    });
    console.log(response.data);

    return [response.data.totalPages, response.data.data];
  },
);

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    setFilterParams: (state, action: PayloadAction<PropertyFilterParams>) => {
      state.filterParams.Type = action.payload.Type;
      state.filterParams.City = action.payload.City;
      state.filterParams.CheckInDate = action.payload.CheckInDate;
      state.filterParams.CheckOutDate = action.payload.CheckOutDate;
      state.filterParams.ChildCount = action.payload.ChildCount;
      state.filterParams.AdultCount = action.payload.AdultCount;
      state.filterParams.MaxPrice = action.payload.MaxPrice;
      state.filterParams.MinPrice = action.payload.MinPrice;
      state.filterParams.PageIndex = action.payload.PageIndex;
    },
    setPageIndexParamsType: (state, action: PayloadAction<number>) => {
      state.filterParams.PageIndex = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPropertyList.fulfilled, (state, action) => {
        state.propertyList = action.payload[1];
        state.filterParams.TotalPages = action.payload[0];
      })
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith('/pending'),
        (state, action) => {
          state.loading = true;
          state.currentRequestId = action.meta.requestId;
        },
      )
      .addMatcher<RejectedAction | FulfilledAction>(
        (action) => action.type.endsWith('/rejected') || action.type.endsWith('/fulfilled'),
        (state, action) => {
          if (state.loading && state.currentRequestId === action.meta.requestId) {
            state.loading = false;
            state.currentRequestId = undefined;
          }
        },
      );
  },
});
export const { setFilterParams, setPageIndexParamsType } = propertySlice.actions;
export default propertySlice.reducer;
