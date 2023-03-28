import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import surveyService from "./surveyService";

const initialState = {
  surveys: [],
  survey: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create a new survey
export const createSurvey = createAsyncThunk(
  "surveys/create",
  async (surveyData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await surveyService.createSurvey(surveyData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.string()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user surveys
export const getUserSurveys = createAsyncThunk(
  "surveys/getUserSurveys",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await surveyService.getUserSurveys(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.string()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get all surveys
export const getAllSurveys = createAsyncThunk(
  "surveys/getAllSurveys",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await surveyService.getAllSurveys(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.string()

      return thunkAPI.rejectWithValue(message)
    }
  }
)



export const surveySlice = createSlice({
  name: "survey",
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSurvey.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSurvey.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createSurvey.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(getUserSurveys.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserSurveys.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.surveys = payload;
      })
      .addCase(getUserSurveys.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(getAllSurveys.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSurveys.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.surveys = payload;
      })
      .addCase(getAllSurveys.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = payload;
      })

  }
});

export const { reset } = surveySlice.actions;
export default surveySlice.reducer;