import { createSlice } from "@reduxjs/toolkit";

export const TriggerSlice = createSlice({
  name: "trigger",
  initialState: {
    trigger: [],
  },
  reducers: {
    setTrigger: (state, action) => {
      state.trigger = action.payload.trigger;
    },
  }
});

export const { setTrigger } = TriggerSlice.actions;

export const getTrigger = (state: any) => state.trigger.trigger;

export default TriggerSlice.reducer;