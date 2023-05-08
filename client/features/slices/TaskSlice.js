import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/*
  CONSTANT VARIABLES
*/

/*
  THUNKS
*/
export const fetchTasks = createAsyncThunk("fetchTasks", async (id) => {
  try {
    console.log(id);
    const { data } = await axios.get("/api/tasks", { params: { userId: id } });
    console.log(data);
    return data;
  } catch (err) {
    next(err);
  }
});
export const addTasks = createAsyncThunk("addTasks", async (props) => {
  try {
    const response = await axios.post("/api/tasks", props);
    console.log(response.data);
    return response.data;
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
      .addCase(fetchTasks.pending, (state) => {
        console.log("pending");
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addTasks.pending, (state) => {
        console.log("pending");
      })
      .addCase(addTasks.fulfilled, (state, action) => {
        state.push(action.payload);
        return state;
      });
  },
});

export const selectTasks = (state) => state.tasks;

export default taskSlice.reducer;
