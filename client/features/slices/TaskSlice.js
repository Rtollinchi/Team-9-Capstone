import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/*
  CONSTANT VARIABLES
*/

/*
  THUNKS
*/
export const fetchTasks = createAsyncThunk("fetchTasks", async () => {
  try {
    const { data } = await axios.get("/api/tasks");
    console.log(data);
    return data;
  } catch (err) {
    next(err);
  }
});

/*
  SLICE
*/
export const taskSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state, action) => {
        console.log("pending");
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export const selectTasks = (state) => state.tasks;

export default taskSlice.reducer;
