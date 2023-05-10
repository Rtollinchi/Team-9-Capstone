import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/*
  CONSTANT VARIABLES
*/

/*
  THUNKS
*/
export const fetchTasks = createAsyncThunk("fetchTasks", async () => {
  axios.get("api/tasks", { headers: { Authorization: `Bearer ${token}` } });
  console.log("token", token);
  const { data } = await axios.get("/api/tasks");
  console.log("data", data);
  return data;
});

export const addTasks = createAsyncThunk("addTasks", async (props) => {
  const response = await axios.post("/api/tasks", props);
  console.log(response.data);
  return response.data;
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
      .addCase(fetchTasks.rejected, (state, action) => {
        console.log("state", state);
        console.log("rejected", action.payload);
      })
      .addCase(addTasks.pending, (state) => {
        console.log("pending");
      })
      .addCase(addTasks.fulfilled, (state, action) => {
        state.push(action.payload);
        return state;
      })
      .addCase(addTasks.rejected, (state, action) => {
        console.log("rejected", action.payload);
      });
  },
});

export const selectTasks = (state) => state.tasks;

export default taskSlice.reducer;
